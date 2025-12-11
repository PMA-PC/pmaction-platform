-- Ensure section column exists (Migration)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'assessment_questions' AND column_name = 'section') THEN
        ALTER TABLE assessment_questions ADD COLUMN section TEXT;
    END IF;
END $$;

-- Insert Neurodiverse Partnership Quiz
INSERT INTO assessments (slug, name, abbreviation, description, category, total_questions, scoring_method, interpretation_ranges) VALUES
('neurodiverse-partnership', 'The Neurodiverse Partnership Quiz', 'ND Partnership', 'An Esther Perel-Inspired Guide to uncovering unspoken rules and dynamics in your relationship.', 'custom', 15, 'discussion', 
'{
  "ranges": [
    {"min": 0, "max": 100, "label": "Completed", "interpretation": "Thank you for completing this reflection. Use your answers to guide a discussion with your partner."}
  ]
}'::jsonb)
ON CONFLICT (slug) DO NOTHING;

-- Insert Questions
DO $$
DECLARE
    assessment_id_var INTEGER;
BEGIN
    SELECT id INTO assessment_id_var FROM assessments WHERE slug = 'neurodiverse-partnership';
    
    -- CLEAR EXISTING QUESTIONS to handle re-numbering without conflicts
    DELETE FROM assessment_questions WHERE assessment_id = assessment_id_var;
    
    -- Part 1: Security & Trust
    -- 1. Lesson Content
    INSERT INTO assessment_questions (assessment_id, question_number, section, question_text, response_type, response_options) VALUES
    (assessment_id_var, 1, 'Security & Trust', '### Understanding Security in Neurodiverse Relationships\n\nSecurity isn''t just about physical safety; it''s about **predictability** and **emotional reliability**.\n\nFor the ADHD partner, "security" might look like *freedom from shame*—knowing they won''t be scolded for forgetfulness.\n\nFor the Non-ADHD partner, "security" often looks like *consistency*—knowing shared responsibilities won''t be dropped.\n\n**Key Concept:**\n> "Trust is built in valid drops, but lost in buckets." - B. Brown', 'content', '[]'::jsonb),
    
    -- 2. Journal Activity
    (assessment_id_var, 2, 'Security & Trust', 'Reflect on a moment this week where you felt truly "safe" with your partner. What happened? (Write 1-2 sentences)', 'journal', '[]'::jsonb),

    -- 3. Quiz Questions (Shifted indices)
    (assessment_id_var, 3, 'Security & Trust', 'When it comes to our shared responsibilities, I feel most secure when: (Follow-up: For the partner with ADHD, what systems or reminders help you feel accountable?)', 'multiple_choice',
     '[
        {"value": "A", "label": "We have a clear, written plan that outlines who is responsible for what."},
        {"value": "B", "label": "We have a flexible system where we check in with each other daily."},
        {"value": "C", "label": "We can rely on each other to spontaneously step in when needed."},
        {"value": "D", "label": "I feel confident that my partner will follow through on their word, even if it requires extra effort."}
      ]'::jsonb),
    (assessment_id_var, 4, 'Security & Trust', 'I believe that true intimacy and connection are built on: (Follow-up: How do the needs for security and freedom manifest in our relationship?)', 'multiple_choice',
     '[
        {"value": "A", "label": "Consistency and a predictable routine."},
        {"value": "B", "label": "Spontaneity and new, exciting experiences."},
        {"value": "C", "label": "Open, honest conversations about our feelings, even when they''re difficult."},
        {"value": "D", "label": "The feeling of being \"seen\" and validated by my partner."}
      ]'::jsonb),
    (assessment_id_var, 5, 'Security & Trust', 'In our relationship, I feel most trusted when: (Follow-up: What behaviors make you feel like your partner is treating you like a child?)', 'multiple_choice',
     '[
        {"value": "A", "label": "You give me the freedom to pursue my own interests and friendships."},
        {"value": "B", "label": "You don''t \"parent\" me or remind me of my responsibilities."},
        {"value": "C", "label": "You share your feelings and vulnerabilities with me."},
        {"value": "D", "label": "You assume the best of me, even when my actions might be misunderstood."}
      ]'::jsonb),

    -- Part 2: Intimacy & Connection
    -- Lesson Content
    (assessment_id_var, 6, 'Intimacy & Connection', '### Reclaiming Intimacy: Desire vs. Duty\n\nIn long-term neurodiverse relationships, sex often becomes a "task" rather than a connection point. \n\n**The ADHD Brain:** Needs novelty, stimulation, and high emotion to feel arousal. "Scheduled sex" can feel like a chore.\n\n**The Non-ADHD Brain:** Needs safety, lower stress, and connection *before* the bedroom to feel arousal.\n\n**The Shift:** Move from "We should have sex" to "How can we play today?"', 'content', '[]'::jsonb),

    -- Journal Activity
    (assessment_id_var, 7, 'Intimacy & Connection', 'What is one "non-sexual" thing your partner does that makes you feel drawn to them? (e.g., a specific laugh, a skill they have, a way they look at you)', 'journal', '[]'::jsonb),

    -- Questions (Shifted indices)
    (assessment_id_var, 8, 'Intimacy & Connection', 'I feel most desired and attracted to you when: (Follow-up: What gives you space from each other to be your own person?)', 'multiple_choice',
     '[
        {"value": "A", "label": "We are doing something new and exciting together."},
        {"value": "B", "label": "We are having a deep, intimate conversation."},
        {"value": "C", "label": "We are playfully teasing or bantering with each other."},
        {"value": "D", "label": "You take the lead and are confident in your own life and our relationship."}
      ]'::jsonb),
    (assessment_id_var, 9, 'Intimacy & Connection', 'When it comes to our sex life, a common pattern is: (Follow-up: What do we need to do to move from a place of "duty" to one of "desire"?)', 'multiple_choice',
     '[
        {"value": "A", "label": "We get stuck in a routine that feels predictable and a bit boring."},
        {"value": "B", "label": "We often struggle to find time for it due to distractions and fatigue."},
        {"value": "C", "label": "We have a great time when we make it a priority, but it''s hard to initiate."},
        {"value": "D", "label": "We have different expectations about what a satisfying sex life looks like."}
      ]'::jsonb),
    (assessment_id_var, 10, 'Intimacy & Connection', 'I feel most present and connected to you when: (Follow-up: What specific steps can we take to increase our mutual presence?)', 'multiple_choice',
     '[
        {"value": "A", "label": "We are away from our everyday distractions (e.g., phones, chores, kids)."},
        {"value": "B", "label": "We are doing a simple activity together, like cooking or walking."},
        {"value": "C", "label": "We are focused on a shared project or goal."},
        {"value": "D", "label": "We are physically close and focused on each other."}
      ]'::jsonb),

    -- Part 3: Understanding & Growth
    -- Lesson Content
    (assessment_id_var, 11, 'Understanding & Growth', '### The Story vs. The Truth\n\nResentment builds when we tell ourselves a story about *why* our partner did something.\n\n*   **The Action:** Partner didn''t load the dishwasher.\n*   **The Story (ADHD):** "They are controlling and don''t trust me to do it my way."\n*   **The Story (Non-ADHD):** "They don''t care about my workload and expect me to do everything."\n\nGrowth happens when we check the story before reacting.', 'content', '[]'::jsonb),

    -- Journal Activity
    (assessment_id_var, 12, 'Understanding & Growth', 'Identify one recurring fight you have. What is the "story" you tell yourself about your partner''s intentions during that fight?', 'journal', '[]'::jsonb),

    -- Questions (Shifted indices)
    (assessment_id_var, 13, 'Understanding & Growth', 'I believe our biggest source of lingering resentment comes from: (Follow-up: What is a "story" you tell yourself about our relationship?)', 'multiple_choice',
     '[
        {"value": "A", "label": "The imbalance of labor (emotional, domestic, or financial)."},
        {"value": "B", "label": "The feeling that one of us is always ''parenting'' the other."},
        {"value": "C", "label": "Unspoken expectations that have not been met over time."},
        {"value": "D", "label": "Our different approaches to communication and conflict."}
      ]'::jsonb),
    (assessment_id_var, 14, 'Understanding & Growth', 'I am most likely to feel misunderstood when: (Follow-up: How can we break the cycle of feeling unseen/misunderstood?)', 'multiple_choice',
     '[
        {"value": "A", "label": "My intentions are misinterpreted as carelessness or a lack of love."},
        {"value": "B", "label": "I feel like you are not listening to what I''m truly trying to say."},
        {"value": "C", "label": "I feel like you expect me to be a different person than I am."},
        {"value": "D", "label": "My emotional response is not validated or is dismissed."}
      ]'::jsonb),
    (assessment_id_var, 15, 'Understanding & Growth', 'When it comes to managing our ADHD, I believe: (Follow-up: What is one thing I can do to help you feel like we are a true team?)', 'multiple_choice',
     '[
        {"value": "A", "label": "It is a shared responsibility that we both need to work on."},
        {"value": "B", "label": "It is primarily a personal issue that each person must manage."},
        {"value": "C", "label": "It is a challenge that we have mostly overcome."},
        {"value": "D", "label": "We haven''t yet found a system that works for both of us."}
      ]'::jsonb)
    ON CONFLICT (assessment_id, question_number) 
    DO UPDATE SET 
        section = EXCLUDED.section,
        question_text = EXCLUDED.question_text,
        response_options = EXCLUDED.response_options;
END $$;
