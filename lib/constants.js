
export const MOOD_EMOJIS = [
    { name: 'Struggling', emoji: '😩', value: 1 },
    { name: 'Down', emoji: '😔', value: 2 },
    { name: 'Okay', emoji: '😐', value: 3 },
    { name: 'Content', emoji: '😌', value: 4 },
    { name: 'Great', emoji: '😄', value: 5 },
];

const moodColorMap = {
    'Struggling': '#ef4444', // red-500
    'Down': '#f97316', // orange-500
    'Okay': '#eab308', // yellow-500
    'Content': '#84cc16', // lime-500
    'Great': '#22c55e', // green-500
};
export const MOOD_COLORS = MOOD_EMOJIS.map(({ name, value }) => ({ name, value, color: moodColorMap[name] }));


const screeningOptions = [
    { text: 'Not at all', value: 0 },
    { text: 'Several days', value: 1 },
    { text: 'More than half the days', value: 2 },
    { text: 'Nearly every day', value: 3 },
];

export const selfHelpRecs = {
    general: "Consider exploring some self-care strategies, like practicing gratitude or trying a new hobby to boost your mood.",
    mild: "It may be helpful to monitor your mood. Simple practices like deep breathing, journaling your thoughts, or talking to a trusted friend can make a difference.",
    moderate: "It is recommended that you discuss your symptoms with a doctor or mental health professional. In the meantime, focusing on 'what you can control' can be helpful, such as maintaining a regular sleep schedule.",
    severe: "It is strongly recommended that you seek help from a doctor or mental health professional. Remember, you are not alone, and help is available. For immediate support, please visit our 'Support' page.",
    immediate: "Please seek professional help immediately. Effective treatments are available and can help you feel better."
};

export const DEPRESSION_SCREENING = {
    id: 'depression-phq9',
    title: "Depression",
    timeToComplete: "Approx. 3-5 minutes",
    imageUrl: "https://placehold.co/600x400/14532d/fde047?text=Depression",
    description: "Reflect on your mood and feelings over the last 2 weeks.",
    questions: [
        { text: 'Little interest or pleasure in doing things', options: screeningOptions },
        { text: 'Feeling down, depressed, or hopeless', options: screeningOptions },
        { text: 'Trouble falling or staying asleep, or sleeping too much', options: screeningOptions },
        { text: 'Feeling tired or having little energy', options: screeningOptions },
        { text: 'Poor appetite or overeating', options: screeningOptions },
        { text: 'Feeling bad about yourself — or that you are a failure or have let yourself or your family down', options: screeningOptions },
        { text: 'Trouble concentrating on things, such as reading the newspaper or watching television', options: screeningOptions },
        { text: 'Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual', options: screeningOptions },
        { text: 'Thoughts that you would be better off dead or of hurting yourself in some way', options: screeningOptions }
    ],
    scoring: [
        { level: 'No to Minimal Depression', range: [0, 4], interpretation: "Your responses suggest you may be experiencing no to minimal symptoms of depression. It's great to check in with yourself.", recommendation: selfHelpRecs.general },
        { level: 'Mild Depression', range: [5, 9], interpretation: "Your score suggests you may be experiencing mild symptoms of depression. This can affect your daily life but is often manageable.", recommendation: selfHelpRecs.mild },
        { level: 'Moderate Depression', range: [10, 14], interpretation: "Your score suggests you may be experiencing moderate symptoms of depression. These symptoms are likely impacting your daily functioning.", recommendation: selfHelpRecs.moderate },
        { level: 'Moderately Severe Depression', range: [15, 19], interpretation: "Your score indicates that you may be experiencing moderately severe symptoms of depression, which can significantly interfere with your life.", recommendation: selfHelpRecs.severe },
        { level: 'Severe Depression', range: [20, 27], interpretation: "Your responses suggest you may be experiencing severe symptoms of depression. It is highly recommended to seek professional help.", recommendation: selfHelpRecs.immediate },
    ],
    category: 'clinical',
    source: 'Based on the PHQ-9'
};

export const ANXIETY_SCREENING = {
    id: 'anxiety-gad7',
    title: "Anxiety",
    timeToComplete: "Approx. 2-4 minutes",
    imageUrl: "https://placehold.co/600x400/14532d/fde047?text=Anxiety",
    description: "Reflect on your anxiety levels over the last 2 weeks.",
    questions: [
        { text: 'Feeling nervous, anxious, or on edge', options: screeningOptions },
        { text: 'Not being able to stop or control worrying', options: screeningOptions },
        { text: 'Worrying too much about different things', options: screeningOptions },
        { text: 'Trouble relaxing', options: screeningOptions },
        { text: 'Being so restless that it is hard to sit still', options: screeningOptions },
        { text: 'Becoming easily annoyed or irritable', options: screeningOptions },
        { text: 'Feeling afraid as if something awful might happen', options: screeningOptions },
    ],
    scoring: [
        { level: 'Minimal Anxiety', range: [0, 4], interpretation: "Your responses suggest you are likely in the minimal anxiety range.", recommendation: selfHelpRecs.general },
        { level: 'Mild Anxiety', range: [5, 9], interpretation: "Your score suggests you may be experiencing mild anxiety.", recommendation: selfHelpRecs.mild },
        { level: 'Moderate Anxiety', range: [10, 14], interpretation: "Your score suggests you may be experiencing moderate anxiety. It may be helpful to talk to a professional.", recommendation: selfHelpRecs.moderate },
        { level: 'Severe Anxiety', range: [15, 21], interpretation: "Your score indicates severe anxiety. It's highly recommended that you seek support from a mental health professional.", recommendation: selfHelpRecs.severe },
    ],
    category: 'clinical',
    source: 'Based on the GAD-7'
};

export const PTSD_SCREENING = {
    id: 'ptsd-pcl5',
    title: "Trauma & PTSD",
    timeToComplete: "Approx. 3-5 minutes",
    imageUrl: "https://placehold.co/600x400/14532d/fde047?text=PTSD",
    description: "Screening for Post-Traumatic Stress Disorder based on experiences in the past month.",
    questions: [
        { text: 'Repeated, disturbing, and unwanted memories of the stressful experience?', options: screeningOptions },
        { text: 'Having very upsetting dreams about the stressful experience?', options: screeningOptions },
        { text: 'Suddenly feeling or acting as if the stressful experience were actually happening again?', options: screeningOptions },
        { text: 'Feeling very upset when something reminded you of the stressful experience?', options: screeningOptions },
        { text: 'Avoiding memories, thoughts, or feelings related to the stressful experience?', options: screeningOptions },
    ],
    scoring: [
        { level: 'Low Symptoms', range: [0, 4], interpretation: "Your responses suggest a low level of PTSD symptoms.", recommendation: selfHelpRecs.general },
        { level: 'Mild Symptoms', range: [5, 8], interpretation: "Your score suggests you may be experiencing mild symptoms. These are worth monitoring.", recommendation: selfHelpRecs.mild },
        { level: 'Moderate to Severe Symptoms', range: [9, 15], interpretation: "Your score suggests you may be experiencing moderate to severe symptoms of PTSD. Speaking with a professional is recommended.", recommendation: selfHelpRecs.moderate },
    ],
    category: 'clinical',
    source: 'Based on the PCL-5'
};

export const ADHD_SCREENING = {
    id: 'adhd-asrs',
    title: "ADHD",
    timeToComplete: "Approx. 4-6 minutes",
    imageUrl: "https://placehold.co/600x400/14532d/fde047?text=ADHD",
    description: "Identify experiences common in adults with ADHD.",
    questions: [
        { text: 'How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?', options: screeningOptions },
        { text: 'How often do you have difficulty getting things in order when you have to do a task that requires organization?', options: screeningOptions },
        { text: 'How often do you have problems remembering appointments or obligations?', options: screeningOptions },
        { text: 'When you have a task that requires a lot of thought, how often do you avoid or delay getting started?', options: screeningOptions },
        { text: 'How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?', options: screeningOptions },
        { text: 'How often do you feel overly active and compelled to do things, like you were driven by a motor?', options: screeningOptions },
    ],
    scoring: [
        { level: 'Unlikely ADHD', range: [0, 7], interpretation: "Your responses suggest it is unlikely you are experiencing significant symptoms of adult ADHD.", recommendation: selfHelpRecs.general },
        { level: 'Possible ADHD', range: [8, 13], interpretation: "Your score suggests you may be experiencing some symptoms associated with adult ADHD. It could be beneficial to explore these further.", recommendation: selfHelpRecs.mild },
        { level: 'Likely ADHD', range: [14, 18], interpretation: "Your score suggests you may be experiencing symptoms highly consistent with adult ADHD. A professional evaluation is recommended.", recommendation: selfHelpRecs.moderate },
    ],
    category: 'clinical',
    source: 'Based on the ASRS'
};

export const BIPOLAR_SCREENING = {
    id: 'bipolar-mdq',
    title: "Bipolar",
    timeToComplete: "Approx. 3-5 minutes",
    imageUrl: "https://placehold.co/600x400/14532d/fde047?text=Bipolar",
    description: "Reflect on your mood experiences and energy levels.",
    questions: [
        { text: "...you felt so good or so hyper that other people thought you were not your normal self or you were so hyper you got into trouble?", options: [{ text: 'Yes', value: 1 }, { text: 'No', value: 0 }] },
        { text: "...you were so irritable that you shouted at people or started fights or arguments?", options: [{ text: 'Yes', value: 1 }, { text: 'No', value: 0 }] },
        { text: "...you felt much more self-confident than usual?", options: [{ text: 'Yes', value: 1 }, { text: 'No', value: 0 }] },
        { text: "...you got much less sleep than usual and found you didn’t really miss it?", options: [{ text: 'Yes', value: 1 }, { text: 'No', value: 0 }] },
        { text: "...you were much more talkative or spoke much faster than usual?", options: [{ text: 'Yes', value: 1 }, { text: 'No', value: 0 }] },
        { text: "...thoughts raced through your head or you couldn’t slow your mind down?", options: [{ text: 'Yes', value: 1 }, { text: 'No', value: 0 }] },
        { text: "...you were so easily distracted by things around you that you had trouble concentrating or staying on track?", options: [{ text: 'Yes', value: 1 }, { text: 'No', value: 0 }] },
    ],
    scoring: [
        { level: 'Negative Screen', range: [0, 3], interpretation: "Your responses suggest it's unlikely you have experienced a major manic or hypomanic episode.", recommendation: selfHelpRecs.general },
        { level: 'Positive Screen', range: [4, 7], interpretation: "Your responses suggest that you may have experienced a manic or hypomanic episode. It is highly recommended to discuss these results with a healthcare provider.", recommendation: selfHelpRecs.moderate },
    ],
    category: 'clinical',
    source: 'Based on the MDQ'
};

export const EATING_DISORDER_SCREENING = {
    id: 'eating-scooff',
    title: "Eating Habits",
    timeToComplete: "Approx. 2 minutes",
    imageUrl: "https://placehold.co/600x400/14532d/fde047?text=Eating+Habits",
    description: "Reflect on attitudes and behaviors around eating.",
    questions: [
        { text: 'Do you make yourself Sick because you feel uncomfortably full?', options: [{ text: 'Yes', value: 1 }, { text: 'No', value: 0 }] },
        { text: 'Do you worry you have lost Control over how much you eat?', options: [{ text: 'Yes', value: 1 }, { text: 'No', value: 0 }] },
        { text: 'Have you recently lost more than One stone (14 lbs) in a 3 month period?', options: [{ text: 'Yes', value: 1 }, { text: 'No', value: 0 }] },
        { text: 'Do you believe yourself to be Fat when others say you are too thin?', options: [{ text: 'Yes', value: 1 }, { text: 'No', value: 0 }] },
        { text: 'Would you say that Food dominates your life?', options: [{ text: 'Yes', value: 1 }, { text: 'No', value: 0 }] },
    ],
    scoring: [
        { level: 'Low Likelihood', range: [0, 1], interpretation: "Your responses suggest a low likelihood of a current eating disorder.", recommendation: selfHelpRecs.general },
        { level: 'Possible Concern', range: [2, 5], interpretation: "A score of two or more 'Yes' answers indicates a possible concern. It is recommended to speak with a healthcare provider about your eating habits and feelings.", recommendation: selfHelpRecs.moderate },
    ],
    category: 'clinical',
    source: 'Based on the SCOFF Questionnaire'
};

export const OCD_SCREENING = {
    id: 'ocd-y-bocs',
    title: "OCD",
    timeToComplete: "Approx. 4-6 minutes",
    imageUrl: "https://placehold.co/600x400/14532d/fde047?text=OCD",
    description: "Reflect on unwanted thoughts or repetitive behaviors.",
    questions: [
        { text: "How much of your time is occupied by obsessive thoughts?", options: [{ text: 'None', value: 0 }, { text: 'Mild (less than 1 hr/day)', value: 1 }, { text: 'Moderate (1-3 hrs/day)', value: 2 }, { text: 'Severe (more than 3 hrs/day)', value: 3 }] },
        { text: "How much do these obsessive thoughts interfere with your work, school, social, or other important roles?", options: [{ text: 'None', value: 0 }, { text: 'Mild', value: 1 }, { text: 'Moderate', value: 2 }, { text: 'Severe', value: 3 }] },
        { text: "How much distress do your obsessive thoughts cause you?", options: [{ text: 'None', value: 0 }, { text: 'Mild', value: 1 }, { text: 'Moderate', value: 2 }, { text: 'Severe', value: 3 }] },
        { text: "How much of your time is spent performing compulsive behaviors?", options: [{ text: 'None', value: 0 }, { text: 'Mild (less than 1 hr/day)', value: 1 }, { text: 'Moderate (1-3 hrs/day)', value: 2 }, { text: 'Severe (more than 3 hrs/day)', value: 3 }] },
        { text: "How much do your compulsive behaviors interfere with your daily life?", options: [{ text: 'None', value: 0 }, { text: 'Mild', value: 1 }, { text: 'Moderate', value: 2 }, { text: 'Severe', value: 3 }] },
    ],
    scoring: [
        { level: 'Subclinical', range: [0, 7], interpretation: "Your score falls within the subclinical range.", recommendation: selfHelpRecs.general },
        { level: 'Mild', range: [8, 15], interpretation: "Your score suggests you may be experiencing mild symptoms of OCD.", recommendation: selfHelpRecs.mild },
        { level: 'Moderate', range: [16, 23], interpretation: "Your score suggests you may be experiencing moderate symptoms of OCD. A professional consultation is recommended.", recommendation: selfHelpRecs.moderate },
        { level: 'Severe', range: [24, 30], interpretation: "Your score indicates severe symptoms of OCD. Please seek support from a mental health professional.", recommendation: selfHelpRecs.severe },
    ],
    category: 'clinical',
    source: 'Based on the Y-BOCS'
};

export const BORDERLINE_SCREENING = {
    id: 'bpd-msi-bpd',
    title: "Borderline Traits",
    timeToComplete: "Approx. 4-6 minutes",
    imageUrl: "https://placehold.co/600x400/14532d/fde047?text=BPD+Traits",
    description: "Reflect on long-term patterns in relationships and self-image.",
    questions: [
        { text: 'Have you had a lot of unstable and intense relationships?', options: [{ text: 'Yes', value: 1 }, { text: 'No', value: 0 }] },
        { text: 'Have you often felt "empty" inside?', options: [{ text: 'Yes', value: 1 }, { text: 'No', value: 0 }] },
        { text: 'Have you made frantic efforts to avoid real or imagined abandonment?', options: [{ text: 'Yes', value: 1 }, { text: 'No', value: 0 }] },
        { text: 'Have you had repeated suicidal thoughts, gestures, or self-harming behaviors?', options: [{ text: 'Yes', value: 1 }, { text: 'No', value: 0 }] },
        { text: 'Do you have a pattern of chronic feelings of anger, often with a hard time controlling it?', options: [{ text: 'Yes', value: 1 }, { text: 'No', value: 0 }] },
        { text: 'Do you have a very unstable self-image or sense of who you are?', options: [{ text: 'Yes', value: 1 }, { text: 'No', value: 0 }] },
        { text: 'Have you been impulsive in ways that are potentially self-damaging (e.g., spending, substance use, reckless driving)?', options: [{ text: 'Yes', value: 1 }, { text: 'No', value: 0 }] },
    ],
    scoring: [
        { level: 'Low Likelihood', range: [0, 3], interpretation: "Your responses suggest a low likelihood of borderline personality traits being a primary concern.", recommendation: selfHelpRecs.general },
        { level: 'Possible Concern', range: [4, 7], interpretation: "Your score suggests you may experience several traits associated with BPD. It is recommended that you discuss these patterns with a mental health professional.", recommendation: selfHelpRecs.moderate },
    ],
    category: 'clinical',
    source: 'Based on the MSI-BPD'
};

export const PSYCHOSIS_SCREENING = {
    id: 'psychosis-pq-b',
    title: "Unusual Experiences",
    timeToComplete: "Approx. 3-5 minutes",
    imageUrl: "https://placehold.co/600x400/14532d/fde047?text=Unusual+Experiences",
    description: "A brief screen for unusual experiences that may indicate a risk for psychosis.",
    questions: [
        { text: 'Have you had experiences with hearing voices that other people do not seem to hear?', options: [{ text: 'Yes', value: 1 }, { text: 'No', value: 0 }] },
        { text: 'Have you ever believed that people were spying on you or plotting against you?', options: [{ text: 'Yes', value: 1 }, { text: 'No', value: 0 }] },
        { text: 'Have you ever felt that you were being sent special messages through the TV or radio?', options: [{ text: 'Yes', value: 1 }, { text: 'No', value: 0 }] },
        { text: 'Have your thoughts ever felt jumbled or like you could not control them?', options: [{ text: 'Yes', value: 1 }, { text: 'No', value: 0 }] },
        { text: 'Have you ever felt that you have special powers that other people do not have?', options: [{ text: 'Yes', value: 1 }, { text: 'No', value: 0 }] },
    ],
    scoring: [
        { level: 'Low Risk', range: [0, 1], interpretation: "Your responses suggest a low likelihood of experiencing symptoms related to psychosis.", recommendation: selfHelpRecs.general },
        { level: 'Further Evaluation Recommended', range: [2, 5], interpretation: "Your responses indicate you may be having unusual experiences that warrant a discussion with a mental health professional.", recommendation: selfHelpRecs.moderate },
    ],
    category: 'clinical',
    source: 'Based on the PQ-B'
};

export const ADDICTION_SCREENING = {
    id: 'addiction-cage',
    title: "Substance Use",
    timeToComplete: "Approx. 2 minutes",
    imageUrl: "https://placehold.co/600x400/14532d/fde047?text=Substance+Use",
    description: "A brief screening tool for potential problems with substance use.",
    questions: [
        { text: 'Have you ever felt you should Cut down on your drinking or drug use?', options: [{ text: 'Yes', value: 1 }, { text: 'No', value: 0 }] },
        { text: 'Have people Annoyed you by criticizing your drinking or drug use?', options: [{ text: 'Yes', value: 1 }, { text: 'No', value: 0 }] },
        { text: 'Have you ever felt bad or Guilty about your drinking or drug use?', options: [{ text: 'Yes', value: 1 }, { text: 'No', value: 0 }] },
        { text: 'Have you ever had a drink or used drugs first thing in the morning to steady your nerves or get rid of a hangover (Eye-opener)?', options: [{ text: 'Yes', value: 1 }, { text: 'No', value: 0 }] },
    ],
    scoring: [
        { level: 'Low Risk', range: [0, 1], interpretation: "Your answers suggest a low likelihood of a current substance use problem.", recommendation: selfHelpRecs.general },
        { level: 'High Suspicion', range: [2, 4], interpretation: "Two or more 'Yes' answers is a strong indicator of a potential substance use problem. It is highly recommended to speak with a healthcare provider or a specialist.", recommendation: selfHelpRecs.moderate },
    ],
    category: 'clinical',
    source: 'Based on the CAGE Questionnaire'
};


const asdScreeningOptions = [
    { text: 'Definitely Agree', value: 3 },
    { text: 'Slightly Agree', value: 2 },
    { text: 'Slightly Disagree', value: 1 },
    { text: 'Definitely Disagree', value: 0 },
];

const asdQuestionsShort = [
    { text: "I find it difficult to imagine what it would be like to be someone else.", trait: 'Social', options: asdScreeningOptions },
    { text: "I often find it hard to judge if someone is rude or polite.", trait: 'Social', options: asdScreeningOptions },
    { text: "I find it hard to 'read between the lines' when someone is talking to me.", trait: 'Communication', options: asdScreeningOptions },
    { text: "When I'm talking, other people may find it hard to get a word in edgewise.", trait: 'Communication', options: asdScreeningOptions },
    { text: "I tend to have very strong interests, which I get upset about if I can't pursue.", trait: 'Patterns', options: asdScreeningOptions },
    { text: "I notice patterns in things all the time.", trait: 'Patterns', options: asdScreeningOptions },
    { text: "I am sensitive to the sound of a light buzzing or humming.", trait: 'Sensory', options: asdScreeningOptions },
    { text: "I dislike the texture of certain clothing on my skin.", trait: 'Sensory', options: asdScreeningOptions },
];

const asdQuestionsLong = [
    { text: "I find it difficult to imagine what it would be like to be someone else.", trait: 'Social', options: asdScreeningOptions },
    { text: "I find social situations easy.", trait: 'Social', options: [{ text: 'Definitely Agree', value: 0 }, { text: 'Slightly Agree', value: 1 }, { text: 'Slightly Disagree', value: 2 }, { text: 'Definitely Disagree', value: 3 }] },
    { text: "I often find it hard to judge if someone is rude or polite.", trait: 'Social', options: asdScreeningOptions },
    { text: "I find it easy to understand what others are thinking or feeling just by looking at their face.", trait: 'Social', options: [{ text: 'Definitely Agree', value: 0 }, { text: 'Slightly Agree', value: 1 }, { text: 'Slightly Disagree', value: 2 }, { text: 'Definitely Disagree', value: 3 }] },
    { text: "I enjoy meeting new people.", trait: 'Social', options: [{ text: 'Definitely Agree', value: 0 }, { text: 'Slightly Agree', value: 1 }, { text: 'Slightly Disagree', value: 2 }, { text: 'Definitely Disagree', value: 3 }] },
    { text: "I enjoy social chitchat.", trait: 'Communication', options: [{ text: 'Definitely Agree', value: 0 }, { text: 'Slightly Agree', value: 1 }, { text: 'Slightly Disagree', value: 2 }, { text: 'Definitely Disagree', value: 3 }] },
    { text: "I find it hard to 'read between the lines' when someone is talking to me.", trait: 'Communication', options: asdScreeningOptions },
    { text: "When I'm talking, other people may find it hard to get a word in edgewise.", trait: 'Communication', options: asdScreeningOptions },
    { text: "I am often the last to understand a joke.", trait: 'Communication', options: asdScreeningOptions },
    { text: "I find it easy to work out what someone is thinking or feeling from their tone of voice.", trait: 'Communication', options: [{ text: 'Definitely Agree', value: 0 }, { text: 'Slightly Agree', value: 1 }, { text: 'Slightly Disagree', value: 2 }, { text: 'Definitely Disagree', value: 3 }] },
    { text: "I am fascinated by dates.", trait: 'Patterns', options: asdScreeningOptions },
    { text: "I tend to have very strong interests, which I get upset about if I can't pursue.", trait: 'Patterns', options: asdScreeningOptions },
    { text: "I notice patterns in things all the time.", trait: 'Patterns', options: asdScreeningOptions },
    { text: "I prefer to do things the same way over and over again.", trait: 'Patterns', options: asdScreeningOptions },
    { text: "It does not upset me if my daily routine is disturbed.", trait: 'Patterns', options: [{ text: 'Definitely Agree', value: 0 }, { text: 'Slightly Agree', value: 1 }, { text: 'Slightly Disagree', value: 2 }, { text: 'Definitely Disagree', value: 3 }] },
    { text: "I am sensitive to the sound of a light buzzing or humming.", trait: 'Sensory', options: asdScreeningOptions },
    { text: "The smell of certain foods can be overwhelming for me.", trait: 'Sensory', options: asdScreeningOptions },
    { text: "I dislike the texture of certain clothing on my skin.", trait: 'Sensory', options: asdScreeningOptions },
    { text: "I enjoy the sensation of labels on clothes.", trait: 'Sensory', options: [{ text: 'Definitely Agree', value: 0 }, { text: 'Slightly Agree', value: 1 }, { text: 'Slightly Disagree', value: 2 }, { text: 'Definitely Disagree', value: 3 }] },
    { text: "I find bright lights to be uncomfortably intense.", trait: 'Sensory', options: asdScreeningOptions },
];


export const ASD_QUIZ_SHORT = {
    id: 'asd-short',
    title: 'Autism Traits (Short)',
    description: 'A brief, informal tool to explore traits sometimes associated with the autism spectrum.',
    timeToComplete: "Approx. 5-7 minutes",
    imageUrl: "https://placehold.co/600x400/14532d/fde047?text=Autism+Traits",
    questions: asdQuestionsShort,
    category: 'clinical',
    source: 'Based on the AQ-10'
};

export const ASD_QUIZ_LONG = {
    id: 'asd-long',
    title: 'Autism Traits (Comprehensive)',
    description: 'A detailed informal tool to explore traits associated with the autism spectrum.',
    timeToComplete: "Approx. 15-20 minutes",
    imageUrl: "https://placehold.co/600x400/14532d/fde047?text=Autism+Traits",
    questions: asdQuestionsLong,
    category: 'clinical',
    source: 'Based on the Autism-Spectrum Quotient'
};

export const ATTACHMENT_STYLE_QUIZ = {
    id: 'attachment-style',
    title: "Attachment Style",
    timeToComplete: "Approx. 5 minutes",
    imageUrl: "https://placehold.co/600x400/14532d/fde047?text=Attachment+Style",
    description: "Discover your primary attachment style in relationships.",
    category: 'personality',
    source: 'Inspired by work of Bowlby & Ainsworth',
    questions: [
        { text: "I find it relatively easy to get close to others and am comfortable depending on them.", options: [{ text: 'Agree', value: 1 }, { text: 'Disagree', value: 0 }] },
        { text: "I often worry that my partner doesn't really love me or won't want to stay with me.", options: [{ text: 'Agree', value: 2 }, { text: 'Disagree', value: 0 }] },
        { text: "I am somewhat uncomfortable being close to others; I find it difficult to trust them completely.", options: [{ text: 'Agree', value: 3 }, { text: 'Disagree', value: 0 }] },
        { text: "I want to get emotionally close to others, but I often find that others are reluctant to get as close as I would like.", options: [{ text: 'Agree', value: 2 }, { text: 'Disagree', value: 0 }] },
        { text: "I find it difficult to depend on others. I prefer it when people don't depend on me.", options: [{ text: 'Agree', value: 3 }, { text: 'Disagree', value: 0 }] },
        { text: "I don't worry about being alone or having others not accept me.", options: [{ text: 'Agree', value: 1 }, { text: 'Disagree', value: 0 }] },
    ],
    scoring: [
        { level: 'Secure', range: [2, 2], interpretation: "You likely have a secure attachment style. You are comfortable with intimacy, and you are not worried about being abandoned. You value relationships but also maintain a strong sense of self.", recommendation: "Nurture your relationships while continuing to build your independence and self-awareness." },
        { level: 'Anxious-Preoccupied', range: [4, 4], interpretation: "You may have an anxious-preoccupied attachment style. You desire a high level of intimacy, approval, and responsiveness from partners, becoming overly dependent. You may be less trusting and experience more emotional highs and lows in your relationships.", recommendation: "Practice self-soothing techniques and focus on building your self-esteem outside of your relationships." },
        { level: 'Dismissive-Avoidant', range: [6, 6], interpretation: "You might have a dismissive-avoidant attachment style. You tend to be emotionally distant in relationships and see yourself as self-sufficient and independent. You may suppress your feelings and avoid emotional closeness.", recommendation: "Gently explore your feelings and practice expressing them in a safe environment. Consider the benefits of emotional vulnerability." },
    ]
}

export const BURNOUT_SCREENING = {
    id: 'burnout-inventory',
    title: 'Burnout',
    timeToComplete: 'Approx. 4-6 minutes',
    imageUrl: 'https://placehold.co/600x400/14532d/fde047?text=Burnout',
    description: 'Assess your level of work-related burnout.',
    category: 'wellness',
    source: 'Based on the Maslach Burnout Inventory',
    questions: [
        { text: 'I feel emotionally drained from my work.', options: screeningOptions },
        { text: 'I feel used up at the end of the workday.', options: screeningOptions },
        { text: 'I feel fatigued when I get up in the morning and have to face another day on the job.', options: screeningOptions },
        { text: 'I have become more cynical or detached from my work.', options: screeningOptions },
        { text: 'I doubt the significance of my work.', options: screeningOptions },
    ],
    scoring: [
        { level: 'Low Burnout', range: [0, 4], interpretation: 'Your responses suggest a low level of burnout.', recommendation: 'Continue to practice self-care and maintain a healthy work-life balance.' },
        { level: 'Mild Burnout', range: [5, 8], interpretation: 'You may be experiencing mild symptoms of burnout. It is important to address these feelings.', recommendation: 'Consider setting boundaries at work and ensuring you have time for restorative activities.' },
        { level: 'High Risk of Burnout', range: [9, 15], interpretation: 'Your score indicates a high risk of burnout. It is strongly recommended to take action.', recommendation: 'Please consider speaking with a supervisor, mentor, or mental health professional about your work-related stress.' },
    ]
}

export const SELF_ESTEEM_SCREENING = {
    id: 'self-esteem-scale',
    title: 'Self-Esteem',
    timeToComplete: 'Approx. 3-5 minutes',
    imageUrl: 'https://placehold.co/600x400/14532d/fde047?text=Self-Esteem',
    description: 'Reflect on your feelings of self-worth.',
    category: 'wellness',
    source: 'Based on the Rosenberg Self-Esteem Scale',
    questions: [
        { text: 'I feel that I am a person of worth, at least on an equal plane with others.', options: screeningOptions },
        { text: 'I feel that I have a number of good qualities.', options: screeningOptions },
        { text: 'All in all, I am inclined to feel that I am a failure.', options: [{ text: 'Not at all', value: 3 }, { text: 'Several days', value: 2 }, { text: 'More than half the days', value: 1 }, { text: 'Nearly every day', value: 0 }] }, // reversed
        { text: 'I am able to do things as well as most other people.', options: screeningOptions },
        { text: 'I take a positive attitude toward myself.', options: screeningOptions },
        { text: 'On the whole, I am satisfied with myself.', options: screeningOptions },
    ],
    scoring: [
        { level: 'Healthy Self-Esteem', range: [15, 18], interpretation: 'Your responses suggest a healthy level of self-esteem.', recommendation: 'Continue to practice self-compassion and recognize your strengths.' },
        { level: 'Moderate Self-Esteem', range: [8, 14], interpretation: 'You may have some challenges with self-esteem.', recommendation: 'Try to focus on your positive qualities and practice self-affirmations.' },
        { level: 'Low Self-Esteem', range: [0, 7], interpretation: 'Your score suggests you may be struggling with low self-esteem.', recommendation: 'It can be very helpful to explore these feelings with a friend, family member, or mental health professional.' },
    ]
}

export const MENTAL_HEALTH_CONDITIONS = [
    'Depression', 'Anxiety', 'Addiction', 'Trauma & PTSD', 'Bipolar', 'Eating Habits', 'ADHD', 'Unusual Experiences', 'Borderline Traits', 'OCD', 'Autism', 'Attachment Style', 'Burnout', 'Self-Esteem'
];

export const SCREENINGS_MAP = {
    'Depression': DEPRESSION_SCREENING,
    'Anxiety': ANXIETY_SCREENING,
    'Addiction': ADDICTION_SCREENING,
    'Trauma & PTSD': PTSD_SCREENING,
    'Bipolar': BIPOLAR_SCREENING,
    'Eating Habits': EATING_DISORDER_SCREENING,
    'ADHD': ADHD_SCREENING,
    'Unusual Experiences': PSYCHOSIS_SCREENING,
    'Borderline Traits': BORDERLINE_SCREENING,
    'OCD': OCD_SCREENING,
    'Autism': { short: ASD_QUIZ_SHORT, long: ASD_QUIZ_LONG },
    'Attachment Style': ATTACHMENT_STYLE_QUIZ,
    'Burnout': BURNOUT_SCREENING,
    'Self-Esteem': SELF_ESTEEM_SCREENING,
};

export const BLOG_THEMES = [
    { value: 'mental_health_advocacy', label: 'Mental Health Advocacy' },
    { value: 'breaking_stigma', label: 'Breaking the Stigma' },
    { value: 'access_to_care', label: 'Access to Care' },
    { value: 'policy_change', label: 'Policy Change' },
    { value: 'community_support', label: 'Community Support' },
    { value: 'personal_stories', label: 'Personal Stories of Hope' },
    { value: 'anxiety_awareness', label: 'Anxiety Awareness' },
    { value: 'depression_support', label: 'Depression Support' },
    { value: 'neurodiversity_celebration', label: 'Celebrating Neurodiversity' }
];

export const INITIAL_BLOG_POSTS = [
    {
        id: 'welcome-1',
        title: 'Welcome to PMAction: Your Journey to Wellness Starts Here',
        content: 'Welcome to our community! We believe in the power of positive action to improve mental well-being. Explore our resources, take a self-assessment, and know that you are not alone. Every step you take, no matter how small, is a step forward.',
        author: 'The PMAction Team',
        date: 'October 26, 2023',
        tags: ['welcome', 'mentalhealth', 'community'],
        imageUrl: 'https://placehold.co/1200x600/14532d/fde047?text=Welcome',
        url: '#',
    },
    {
        id: 'mindfulness-2',
        title: '5 Simple Mindfulness Exercises for a Calmer Day',
        content: 'In a world that is always "on," finding moments of peace is crucial. Mindfulness is the practice of being present. Here are five simple exercises you can try today:\n1. Mindful Breathing: Focus on your breath for one minute.\n2. Body Scan: Notice sensations in your body without judgment.\n3. Mindful Walking: Pay attention to the feeling of your feet on the ground.\n4. The 5-4-3-2-1 Method: Notice 5 things you can see, 4 you can feel, 3 you can hear, 2 you can smell, and 1 you can taste.\n5. Mindful Listening: Listen to a piece of music, focusing only on the sounds.',
        author: 'Jane Doe, Mindfulness Coach',
        date: 'October 25, 2023',
        tags: ['mindfulness', 'anxiety', 'selfcare'],
        imageUrl: 'https://placehold.co/1200x600/14532d/fde047?text=Mindfulness',
        url: '#',
    },
];

export const GUIDED_EXERCISES = [
    { id: 'breathing-1', title: 'Mindful Breathing', description: 'A simple exercise to calm your nervous system.' },
    { id: 'body-scan-1', title: 'Body Scan', description: 'Bring awareness to your body and release tension.' },
    { id: 'gratitude-1', title: 'Gratitude Reflection', description: 'Focus on the positive aspects of your life.' },
];

export const WELLNESS_SKILLS = [
    {
        id: 'breath-1',
        title: 'Mindful Breathing',
        description: 'A simple, powerful way to calm your nervous system. Focus on the sensation of your breath entering and leaving your body.',
        category: 'Grounding',
        interactiveId: 'Mindful Breathing'
    },
    {
        id: 'breath-2',
        title: 'Box Breathing',
        description: 'A technique to regulate your breath and calm your body. Inhale for 4 seconds, hold for 4, exhale for 4, and hold for 4. Repeat several times.',
        category: 'Grounding'
    },
    {
        id: 'ground-1',
        title: '5-4-3-2-1 Grounding Technique',
        description: 'Anchor yourself in the present moment. Name 5 things you can see, 4 things you can feel, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.',
        category: 'Grounding'
    },
    {
        id: 'ground-2',
        title: 'Temperature Change',
        description: 'Hold a piece of ice in your hand or splash cold water on your face. The sudden change in temperature can help bring your focus back to the present moment.',
        category: 'Grounding'
    },
    {
        id: 'regulation-1',
        title: 'Opposite Action',
        description: 'Act opposite to your emotional urge. If you feel like isolating, reach out to a friend. This can help change the emotion itself.',
        category: 'Emotional Regulation'
    },
    {
        id: 'regulation-2',
        title: 'Labeling Emotions',
        description: 'Simply naming your emotion (e.g., "This is anxiety") can reduce its intensity and give you a sense of control.',
        category: 'Emotional Regulation'
    },
    {
        id: 'focus-1',
        title: 'Three Good Things',
        description: 'At the end of the day, write down three things that went well and their causes. This shifts focus to positive experiences.',
        category: 'Positive Focus'
    },
    {
        id: 'focus-2',
        title: 'Gratitude Journaling',
        description: 'Regularly write down what you\'re grateful for. This practice is strongly linked to greater happiness and well-being.',
        category: 'Positive Focus'
    },
    {
        id: 'mindful-1',
        title: 'Mindful Observation',
        description: 'Pick a natural object around you and observe it for a few minutes. Notice its colors, textures, and shape without judgment.',
        category: 'Mindfulness'
    },
    {
        id: 'mindful-2',
        title: 'Mindful Listening',
        description: 'Listen to the sounds around you for a few minutes. Try to identify each sound without labeling it as "good" or "bad".',
        category: 'Mindfulness'
    },
    {
        id: 'stress-1',
        title: 'Progressive Muscle Relaxation',
        description: 'Tense a group of muscles as you breathe in, and relax them as you breathe out. Work your way up your body from your feet to your head.',
        category: 'Stress Reduction'
    },
    {
        id: 'stress-2',
        title: 'Guided Visualization',
        description: 'Close your eyes and imagine a peaceful place. Engage all your senses: what do you see, hear, smell, and feel in this calm location?',
        category: 'Stress Reduction'
    }
];

export const WELLNESS_CATEGORY_DESCRIPTIONS = {
    'Grounding': 'Techniques to help you stay in the present moment and manage overwhelming feelings.',
    'Emotional Regulation': 'Skills to understand and manage your emotional responses in a healthy way.',
    'Positive Focus': 'Practices to help you notice and appreciate the good in your life, building resilience.',
    'Mindfulness': 'Practices to gently bring your attention to the present moment without judgment.',
    'Stress Reduction': 'Simple techniques to calm your body and mind when feeling stressed or tense.'
};


export const SHOP_PRODUCTS = [
    { id: 1, name: 'Weighted Blanket', description: 'A calming blanket to help reduce anxiety and improve sleep.', price: '$79.99', imageUrl: 'https://placehold.co/600x400/14532d/a3e635?text=Weighted+Blanket', storeUrl: '#', category: 'Sensory Tools', whyItHelps: "Provides deep pressure stimulation, which can be calming and help improve sleep quality.", rating: 4.5, reviewCount: 120 },
    { id: 2, name: 'Mindfulness Journal', description: 'A guided journal to help you practice gratitude and mindfulness daily.', price: '$19.99', imageUrl: 'https://placehold.co/600x400/14532d/fde047?text=Mindfulness+Journal', storeUrl: '#', category: 'Books & Journals', whyItHelps: "Encourages self-reflection and the development of a positive mindset through guided prompts.", rating: 4.8, reviewCount: 250 },
    { id: 3, name: 'Noise-Cancelling Headphones', description: 'Find your quiet space and reduce sensory overload with these headphones.', price: '$129.99', imageUrl: 'https://placehold.co/600x400/14532d/a3e635?text=Headphones', storeUrl: '#', category: 'Sensory Tools', whyItHelps: "Helps manage sensory sensitivity by reducing overwhelming environmental noise.", rating: 4.7, reviewCount: 310 },
    { id: 4, name: '"The Body Keeps the Score"', description: 'A groundbreaking book on trauma and healing by Bessel van der Kolk M.D.', price: '$15.99', imageUrl: 'https://placehold.co/600x400/14532d/fde047?text=Book', storeUrl: '#', category: 'Books & Journals', whyItHelps: "Provides a deep understanding of how trauma affects the body and mind, offering paths to healing.", rating: 4.9, reviewCount: 5500 },
];

export const SHOP_CATEGORIES = ['All', 'Books & Journals', 'Sensory Tools'];

export const SUPPORT_GROUPS = {
    'General': [
        { name: 'NAMI (National Alliance on Mental Illness)', url: 'https://www.nami.org' },
        { name: 'Mental Health America (MHA)', url: 'https://www.mhanational.org' },
        { name: 'The Trevor Project (for LGBTQ Youth)', url: 'https://www.thetrevorproject.org' },
    ],
    'Anxiety': [
        { name: 'Anxiety & Depression Association of America (ADAA)', url: 'https://adaa.org' },
        { name: 'The National Social Anxiety Center', url: 'https://nationalsocialanxietycenter.com' },
    ],
    'Depression': [
        { name: 'Depression and Bipolar Support Alliance (DBSA)', url: 'https://www.dbsalliance.org' },
        { name: 'Families for Depression Awareness', url: 'https://www.familyaware.org' },
    ],
    'Bipolar': [
        { name: 'Depression and Bipolar Support Alliance (DBSA)', url: 'https://www.dbsalliance.org' },
        { name: 'International Bipolar Foundation', url: 'https://ibpf.org' },
    ],
    'Trauma & PTSD': [
        { name: 'PTSD Alliance', url: 'https://www.ptsdalliance.org' },
        { name: 'RAINN (Rape, Abuse & Incest National Network)', url: 'https://www.rainn.org' },
    ],
    'Eating Disorder': [
        { name: 'National Eating Disorders Association (NEDA)', url: 'https://www.nationaleatingdisorders.org' },
        { name: 'Project HEAL', url: 'https://www.theprojectheal.org' },
    ],
    'OCD': [
        { name: 'International OCD Foundation (IOCDF)', url: 'https://iocdf.org' },
        { name: 'BeyondOCD.org', url: 'https://beyondocd.org' },
    ],
    'Borderline': [
        { name: 'National Education Alliance for Borderline Personality Disorder', url: 'https://www.borderlinepersonalitydisorder.com' },
    ],
    'ADHD': [
        { name: 'Children and Adults with Attention-Deficit/Hyperactivity Disorder (CHADD)', url: 'https://chadd.org' },
        { name: 'Attention Deficit Disorder Association (ADDA)', url: 'https://add.org' },
    ],
    'Autism': [
        { name: 'Autistic Self Advocacy Network (ASAN)', url: 'https://autisticadvocacy.org' },
        { name: 'Autism Society', url: 'https://autismsociety.org' },
    ],
};

export const FAQ_DATA = [
    {
        question: "What is the purpose of this application?",
        answer: "This application is a mental wellness resource hub designed to provide supportive tools and information. It includes educational content, self-assessments for reflection, coping skills, and links to community support. Our goal is to empower users to take positive, proactive steps in their mental health journey."
    },
    {
        question: "Are the self-assessments a medical diagnosis?",
        answer: "No. The self-assessments are for informational and self-reflection purposes only. They are not a substitute for a professional medical diagnosis. We strongly encourage you to discuss your results with a qualified healthcare provider who can provide an accurate diagnosis and treatment plan."
    },
    {
        question: "How is my data stored and is it private?",
        answer: "Your privacy is a top priority. All of your personal data, including assessment results, mood logs, and journal entries, is stored locally on your own device using your browser's local storage. This data is not sent to or stored on any external servers, ensuring your information remains private and under your control."
    },
    {
        question: "Who creates the educational content?",
        answer: "The content in our Library is based on established mental health resources and best practices. The AI-powered features, such as the 'Positive Education' articles and the blog post generator, use Google's Gemini API to create supportive, informative content based on the prompts provided. All content should be considered educational and not medical advice."
    }
];

export const TESTIMONIALS_DATA = [
    {
        quote: "Using the mood tracker and journal has been a game-changer for me. Seeing the patterns in my moods helped me have a much more productive conversation with my therapist.",
        author: "Alex P.",
        location: "California"
    },
    {
        quote: "I was feeling really overwhelmed and didn't know where to start. The 'Coping Skills' section gave me simple, actionable things to do right away. The 5-4-3-2-1 technique has helped me through several panic attacks.",
        author: "Jessica L.",
        location: "New York"
    },
    {
        quote: "As a parent, the 'For Supporters' section in the Library was incredibly helpful. It gave me a better understanding of what my child is going through and how I can be there for them in a meaningful way.",
        author: "David R.",
        location: "Texas"
    },
    {
        quote: "The self-assessments gave me the confidence to finally seek professional help. It was validating to see my feelings reflected in the results and understand what my next steps could be.",
        author: "Maria S.",
        location: "Florida"
    }
];
