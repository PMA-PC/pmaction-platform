import json

def parse_quiz(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    sql_statements = []
    
    # Header
    sql_statements.append("-- Insert Neurodiversity Traits Assessment")
    sql_statements.append("INSERT INTO assessments (slug, name, description, category, total_questions, scoring_method, interpretation_ranges) VALUES")
    sql_statements.append("('neurodiversity-traits', 'Neurodiversity Traits Profile', 'A comprehensive self-assessment of neurodivergent traits across 8 categories. Rate each trait from 1 (Does not apply) to 5 (Core part of my experience).', 'custom', 0, 'sum', ")
    sql_statements.append("'{")
    sql_statements.append('  "ranges": [')
    sql_statements.append('    {"min": 0, "max": 1000, "label": "Completed", "interpretation": "This profile helps identify your unique neurodivergent traits. Review your highest scored categories to understand your strengths and challenges."}')
    sql_statements.append('  ]')
    sql_statements.append("}'::jsonb)")
    sql_statements.append("ON CONFLICT (slug) DO NOTHING;")
    sql_statements.append("")
    sql_statements.append("-- Insert Questions")
    sql_statements.append("DO $$")
    sql_statements.append("DECLARE")
    sql_statements.append("    assessment_id_var INTEGER;")
    sql_statements.append("BEGIN")
    sql_statements.append("    SELECT id INTO assessment_id_var FROM assessments WHERE slug = 'neurodiversity-traits';")
    sql_statements.append("    -- IMPORTANT: Ensure you have added the 'section' column to assessment_questions table before running this!")
    sql_statements.append("")

    current_section = "General"
    question_number = 1
    
    likert_options = json.dumps([
        {"value": 1, "label": "1 - Does not apply"},
        {"value": 2, "label": "2 - Applies sometimes"},
        {"value": 3, "label": "3 - Noticeable part of life"},
        {"value": 4, "label": "4 - Significant part of life"},
        {"value": 5, "label": "5 - Dominant/Core part"}
    ])

    questions = []
    current_q = None
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        # Detect Section Headers (I., II., etc.)
        if line.startswith(("I. ", "II. ", "III. ", "IV. ", "V. ", "VI. ", "VII. ", "VIII. ")):
            current_section = line
            # Reset current_q when section changes to prevent bleeding
            current_q = None
            # sql_statements.append(f"    -- {current_section}") 
            continue
            
        if line.startswith("Example:"):
            if current_q:
                current_q['example'] = line.replace("Example:", "").strip()
            continue
            
        # Assume it's a question if it has a colon and isn't an example
        if ":" in line and not line.startswith("Example:"):
            parts = line.split(":", 1)
            title = parts[0].strip()
            definition = parts[1].strip()
            
            current_q = {
                "section": current_section,
                "title": title,
                "definition": definition,
                "example": ""
            }
            questions.append(current_q)
        elif current_q and not line.startswith("Example:"):
             # Continuation of definition
             current_q['definition'] += " " + line

    # Generate SQL for questions
    for q in questions:
        # Escape single quotes
        q_text = f"**{q['title']}**: {q['definition']}"
        if q['example']:
            q_text += f" (Example: {q['example']})"
            
        q_text = q_text.replace("'", "''")
        section_text = q['section'].replace("'", "''")
        
        # Note: Added 'section' column to INSERT
        sql = f"    INSERT INTO assessment_questions (assessment_id, question_number, question_text, response_type, response_options, section) VALUES (assessment_id_var, {question_number}, '{q_text}', 'likert', '{likert_options}'::jsonb, '{section_text}') ON CONFLICT (assessment_id, question_number) DO NOTHING;"
        sql_statements.append(sql)
        question_number += 1

    sql_statements.append("    -- Update total questions count")
    sql_statements.append(f"    UPDATE assessments SET total_questions = {question_number - 1} WHERE id = assessment_id_var;")
    sql_statements.append("END $$;")

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(sql_statements))

if __name__ == "__main__":
    parse_quiz('raw_traits_quiz.txt', 'neurodiversity_traits_seed.sql')
