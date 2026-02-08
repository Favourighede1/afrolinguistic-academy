export interface VocabItem {
  yoruba: string;
  english: string;
}

export interface YorubaLesson {
  id: string;
  chapterNumber: number;
  chapterTitle: string;
  lessonNumber?: number;
  lessonTitle: string;
  pageStart?: number;
  pageEnd?: number;
  objectives: string[];
  sections: {
    vocabulary?: {
      nouns?: VocabItem[];
      verbs?: VocabItem[];
      phrases?: VocabItem[];
      expressions?: VocabItem[];
      interrogatives?: VocabItem[];
    };
    grammarTopics?: string[];
    dialogues?: { title: string; summary: string }[];
    exercises?: { title: string; notes?: string }[];
  };
  summaries: string[];
  tags: string[];
}

export const yorubaYeMiData: YorubaLesson[] = [
  // ── Introduction ──
  {
    id: 'intro-alphabets',
    chapterNumber: 0,
    chapterTitle: 'Introduction',
    lessonTitle: 'Yorùbá Alphabets, Vowels & Consonants',
    pageStart: 13,
    pageEnd: 16,
    objectives: [
      'Learn the 7 oral vowels and 5 nasal vowels',
      'Recognise 18 consonants including gb and kp',
      'Understand syllabic nasals m and n',
    ],
    sections: {
      vocabulary: {
        nouns: [
          { yoruba: 'àga', english: 'chair' },
          { yoruba: 'bàtà', english: 'shoe' },
          { yoruba: 'igi', english: 'tree' },
          { yoruba: 'ehoro', english: 'rabbit' },
          { yoruba: 'fìlà', english: 'hat' },
          { yoruba: 'kọ́kọ́rọ́', english: 'key' },
          { yoruba: 'máṅgòrò', english: 'mango' },
          { yoruba: 'ológbò', english: 'cat' },
        ],
      },
      grammarTopics: [
        'Oral vowels: a, e, ẹ, i, o, ọ, u',
        'Nasal vowels: an, ẹn, in, ọn, un',
        '18 consonants including digraphs gb and kp',
        'Syllabic nasals [m] and [n] can carry tones',
      ],
    },
    summaries: [
      'Covers the Yorùbá sound system: seven oral vowels, five nasal vowels, and eighteen consonants.',
      'Unique sounds gb and kp have no English equivalent and require special practice.',
    ],
    tags: ['phonetics', 'alphabet', 'vowels', 'consonants', 'introduction'],
  },
  {
    id: 'intro-tones',
    chapterNumber: 0,
    chapterTitle: 'Introduction',
    lessonTitle: 'Tones & Titles in Yorùbá Culture',
    pageStart: 17,
    pageEnd: 22,
    objectives: [
      'Distinguish high, mid, and low tones',
      'Understand how tones change word meaning',
      'Learn common Yorùbá titles and naming conventions',
    ],
    sections: {
      vocabulary: {
        expressions: [
          { yoruba: 'Ọba', english: 'King' },
          { yoruba: 'Olorì', english: 'Queen' },
          { yoruba: 'Olóyè', english: 'Chief' },
          { yoruba: 'Dókítà', english: 'Doctor' },
          { yoruba: 'Ọ̀jọ́gbọ́n', english: 'Professor' },
          { yoruba: 'Ọ̀gbẹ́ni', english: 'Mr.' },
          { yoruba: 'Arábìnrin', english: 'Mrs.' },
        ],
      },
      grammarTopics: [
        'Three tones: high (´), mid (unmarked), low (`)',
        'Down-stepped tone in compound words',
        'Tones on nasal consonants',
        'Tonal minimal pairs (e.g., eré = play, èrè = gain)',
      ],
    },
    summaries: [
      'Yorùbá uses three contrastive tones that can change word meaning entirely.',
      'Titles precede names as a mark of respect; some names are gender-neutral.',
    ],
    tags: ['tones', 'titles', 'names', 'culture', 'introduction'],
  },

  // ── Chapter 1: Greetings ──
  {
    id: 'ch1-vocab',
    chapterNumber: 1,
    chapterTitle: 'Orí Kìíní – Greetings',
    lessonTitle: 'Chapter Vocabulary',
    pageStart: 24,
    pageEnd: 25,
    objectives: [
      'Learn nouns, verbs, and expressions for greetings',
      'Understand noun phrases with possessive forms',
    ],
    sections: {
      vocabulary: {
        nouns: [
          { yoruba: 'àgbàdo', english: 'corn' },
          { yoruba: 'aṣọ', english: 'clothing' },
          { yoruba: 'bàbá', english: 'father' },
          { yoruba: 'ilé', english: 'house' },
          { yoruba: 'ìrẹ̀sì', english: 'rice' },
          { yoruba: 'olùkọ́', english: 'teacher' },
          { yoruba: 'ọmọ', english: 'child' },
          { yoruba: 'orúkọ', english: 'name' },
          { yoruba: 'owó', english: 'money' },
          { yoruba: 'ọbẹ̀', english: 'stew' },
        ],
        verbs: [
          { yoruba: 'gbá', english: 'to kick' },
          { yoruba: 'fẹ́', english: 'to want' },
          { yoruba: 'gbé', english: 'to live' },
          { yoruba: 'jẹun', english: 'to eat' },
          { yoruba: 'kàwé', english: 'to read' },
          { yoruba: 'mu', english: 'to drink' },
          { yoruba: 'ní', english: 'to have' },
        ],
        phrases: [
          { yoruba: 'a dúpẹ́', english: 'thank you' },
          { yoruba: 'ọjọ́ ìbí', english: 'birthday' },
          { yoruba: 'báwo ni?', english: 'how are you?' },
        ],
        interrogatives: [
          { yoruba: 'kí ni?', english: 'what?' },
          { yoruba: 'ṣé àlàáfíà ni?', english: 'how are you?' },
          { yoruba: 'ṣé dáadáa ni?', english: 'how are things?' },
        ],
        expressions: [
          { yoruba: 'àlàáfíà ni', english: 'I am fine / peace' },
          { yoruba: 'dáadáa ni', english: 'I am fine' },
          { yoruba: 'káàbọ̀ o', english: 'you are welcome' },
        ],
      },
    },
    summaries: [
      'Core vocabulary for everyday greetings, including nouns, verbs, and polite expressions.',
    ],
    tags: ['vocabulary', 'greetings', 'nouns', 'verbs'],
  },
  {
    id: 'ch1-lesson1',
    chapterNumber: 1,
    chapterTitle: 'Orí Kìíní – Greetings',
    lessonNumber: 1,
    lessonTitle: 'Ìkíni (Greetings)',
    pageStart: 26,
    pageEnd: 32,
    objectives: [
      'Greet people at different times of day using "Kú"',
      'Use greetings for weather and special occasions',
      'Apply the honorific pronoun "ẹ" for elders',
    ],
    sections: {
      vocabulary: {
        phrases: [
          { yoruba: 'káàárọ̀', english: 'good morning' },
          { yoruba: 'káàsán', english: 'good afternoon' },
          { yoruba: 'kúùrọ̀lẹ́', english: 'good early evening' },
          { yoruba: 'káalẹ́', english: 'good evening' },
          { yoruba: 'kú òtútù', english: 'greeting for cold weather' },
          { yoruba: 'kúuṣẹ́', english: 'greeting for someone working' },
          { yoruba: 'kú ọdún', english: 'festive greeting' },
        ],
      },
      grammarTopics: [
        '"Kú" + time of day forms standard greetings',
        '"Kú" + weather/occasion for situational greetings',
        'Honorific pronoun "ẹ" shows respect to elders',
        'Girls kneel, boys prostrate when greeting elders',
      ],
      dialogues: [
        { title: 'Father-son morning greeting', summary: 'Tádé greets his father Wálé in the morning using respectful forms.' },
        { title: 'Daughter greeting mother', summary: 'A daughter welcomes her mother and asks about family members.' },
        { title: 'Friends at school', summary: 'Ṣadé and Fúnmi exchange afternoon greetings at school.' },
        { title: 'Teacher and student', summary: 'Mr. Adébólú and Olúfẹ́mi introduce themselves on the first day.' },
      ],
      exercises: [
        { title: 'Ìṣẹ́ Ṣíṣe 1', notes: 'Provide appropriate responses to greetings' },
        { title: 'Ìṣẹ́ Ṣíṣe 2', notes: 'Provide appropriate greetings to responses' },
        { title: 'Ìṣẹ́ Ṣíṣe 3', notes: 'Pair greeting practice at different times of day' },
        { title: 'Ìṣẹ́ Ṣíṣe 4', notes: 'Provide questions for given answers' },
        { title: 'Ìṣẹ́ Ṣíṣe 5', notes: 'Word search puzzle with tonal words' },
      ],
    },
    summaries: [
      'Yorùbá greetings use "Kú" combined with time, weather, or occasion.',
      'Respect is shown through the honorific "ẹ" and physical gestures when greeting elders.',
    ],
    tags: ['greetings', 'culture', 'respect', 'time-of-day'],
  },
  {
    id: 'ch1-lesson2',
    chapterNumber: 1,
    chapterTitle: 'Orí Kìíní – Greetings',
    lessonNumber: 2,
    lessonTitle: 'Verbs',
    pageStart: 33,
    pageEnd: 36,
    objectives: [
      'Learn monosyllabic Yorùbá verbs',
      'Understand splittable and non-splittable verb-nominals',
      'Use the verb "fẹ́" (to want) in sentences',
      'Negate verbs using "kò"',
    ],
    sections: {
      vocabulary: {
        verbs: [
          { yoruba: 'jẹ', english: 'to eat' },
          { yoruba: 'kà', english: 'to read' },
          { yoruba: 'ṣe', english: 'to do' },
          { yoruba: 'wá', english: 'to come' },
          { yoruba: 'lọ', english: 'to go' },
          { yoruba: 'sùn', english: 'to sleep' },
          { yoruba: 'jó', english: 'to dance' },
          { yoruba: 'rà', english: 'to buy' },
          { yoruba: 'tà', english: 'to sell' },
          { yoruba: 'sè', english: 'to cook' },
          { yoruba: 'rìn', english: 'to walk' },
          { yoruba: 'fẹ́ràn', english: 'to like / to love' },
        ],
      },
      grammarTopics: [
        'Monosyllabic verb structure (jẹ, kà, lọ, etc.)',
        'Splittable verb-nominals (e.g., sáré → sá eré)',
        'Non-splittable verb-nominals (e.g., dìde, dúró)',
        'Verb chaining with "fẹ́" (to want)',
        'Negation with "kò" placed before the verb',
      ],
      exercises: [
        { title: 'Ìṣẹ́ Ṣíṣe 1', notes: 'Turn sentences into negative form' },
        { title: 'Ìṣẹ́ Ṣíṣe 2', notes: 'Respond to questions in the negative' },
      ],
    },
    summaries: [
      'Yorùbá verbs are mostly monosyllabic; some form compounds with nouns.',
      'The negator "kò" precedes the verb to create negative sentences.',
    ],
    tags: ['verbs', 'negation', 'grammar', 'sentence-structure'],
  },
  {
    id: 'ch1-lesson3',
    chapterNumber: 1,
    chapterTitle: 'Orí Kìíní – Greetings',
    lessonNumber: 3,
    lessonTitle: 'Subject Pronouns',
    pageStart: 37,
    pageEnd: 40,
    objectives: [
      'Learn regular and emphatic subject pronouns',
      'Use the honorific pronoun "ẹ" and "wọn"',
      'Understand the progressive marker "ń"',
    ],
    sections: {
      vocabulary: {
        phrases: [
          { yoruba: 'Mo / Èmi', english: 'I' },
          { yoruba: 'O / Ìwọ', english: 'You (sg.)' },
          { yoruba: 'Ó / Òun', english: 'He/She/It' },
          { yoruba: 'A / Àwa', english: 'We' },
          { yoruba: 'Ẹ / Ẹyin', english: 'You (pl.)' },
          { yoruba: 'Wọ́n / Àwọn', english: 'They' },
        ],
      },
      grammarTopics: [
        'Regular pronouns: Mo, O, Ó, A, Ẹ, Wọ́n',
        'Emphatic pronouns: Èmi, Ìwọ, Òun, Àwa, Ẹyin, Àwọn',
        'Honorific "ẹ" for addressing elders',
        'Honorific "wọn" used singularly for respect',
        'Progressive marker "ń" for ongoing actions (-ing)',
        'Omitting "ń" changes meaning to past tense',
      ],
      exercises: [
        { title: 'Ìṣẹ́ Ṣíṣe 1', notes: 'Answer questions in complete sentences' },
        { title: 'Ìṣẹ́ Ṣíṣe 2', notes: 'Replace words with regular pronouns' },
        { title: 'Ìṣẹ́ Ṣíṣe 3', notes: 'Replace words with emphatic pronouns' },
        { title: 'Ìṣẹ́ Ṣíṣe 4', notes: 'Replace regular pronouns with emphatic ones' },
      ],
    },
    summaries: [
      'Yorùbá has two pronoun sets: regular (short) and emphatic (stressed).',
      'The progressive marker "ń" before a verb signals an ongoing action.',
    ],
    tags: ['pronouns', 'grammar', 'progressive', 'honorifics'],
  },
  {
    id: 'ch1-lesson4',
    chapterNumber: 1,
    chapterTitle: 'Orí Kìíní – Greetings',
    lessonNumber: 4,
    lessonTitle: 'Interrogatives "Kí ni?" and "Ṣé?"',
    pageStart: 41,
    pageEnd: 46,
    objectives: [
      'Ask questions using "Kí ni" (what)',
      'Ask yes/no questions using "Ṣé" (do/does)',
      'Answer interrogatives in complete sentences',
    ],
    sections: {
      vocabulary: {
        interrogatives: [
          { yoruba: 'Kí ni o fẹ́?', english: 'What do you want?' },
          { yoruba: 'Kí ni orúkọ ẹ rẹ?', english: 'What is your name?' },
          { yoruba: 'Ṣé wọn fẹ́ owó?', english: 'Do they want money?' },
          { yoruba: 'Ṣé o fẹ́ jẹun?', english: 'Do you want to eat?' },
        ],
      },
      grammarTopics: [
        '"Kí ni" introduces what-questions',
        '"Ṣé" introduces yes/no questions',
        'Affirmative answers begin with "Bẹ́ẹ̀ ni"',
        'Questions and answers in conversational context',
      ],
      exercises: [
        { title: 'Ìṣẹ́ Ṣíṣe 1', notes: 'Answer questions in complete sentences' },
        { title: 'Ìṣẹ́ Ṣíṣe 2', notes: 'Respond using regular subject pronouns' },
        { title: 'Ìṣẹ́ Ṣíṣe 3', notes: 'Pair practice with questions' },
        { title: 'Ìṣẹ́ Ṣíṣe 4', notes: 'Complete sentences with correct verbs' },
        { title: 'Ìṣẹ́ Ṣíṣe 5–7', notes: 'Oral practice and dialogue creation' },
      ],
    },
    summaries: [
      'Two interrogative forms: "Kí ni" for what-questions and "Ṣé" for yes/no questions.',
      'Answers to "Ṣé" questions start with "Bẹ́ẹ̀ ni" (yes) or "Rárá" (no).',
    ],
    tags: ['interrogatives', 'questions', 'grammar', 'conversation'],
  },

  // ── Chapter 2: My Classroom ──
  {
    id: 'ch2-vocab',
    chapterNumber: 2,
    chapterTitle: 'Orí Kejì – My Classroom',
    lessonTitle: 'Chapter Vocabulary',
    pageStart: 48,
    pageEnd: 50,
    objectives: [
      'Learn classroom objects and academic vocabulary',
      'Understand noun phrases and verb phrases for school context',
    ],
    sections: {
      vocabulary: {
        nouns: [
          { yoruba: 'àga', english: 'chair' },
          { yoruba: 'tábìlì', english: 'table' },
          { yoruba: 'pátákó-ìkọ́wé', english: 'chalkboard' },
          { yoruba: 'pẹẹ́nì', english: 'pen' },
          { yoruba: 'pẹ́ńsùlù', english: 'pencil' },
          { yoruba: 'kọ̀ǹpútà', english: 'computer' },
          { yoruba: 'fèrèsé', english: 'window' },
          { yoruba: 'ilẹ̀kùn', english: 'door' },
          { yoruba: 'ìwé-ìkọ́wé', english: 'notebook' },
          { yoruba: 'ìwé-ìtumọ̀', english: 'dictionary' },
          { yoruba: 'yàrá-ìkẹ́kọ̀ọ́', english: 'classroom' },
          { yoruba: 'ìdánwò', english: 'exam' },
          { yoruba: 'rúlà', english: 'ruler' },
          { yoruba: 'ìrésà', english: 'eraser' },
        ],
        verbs: [
          { yoruba: 'túwò', english: 'to examine / check' },
          { yoruba: 'yangàn', english: 'to boast of' },
        ],
        phrases: [
          { yoruba: 'akẹ́kọ̀ọ́ obìnrin', english: 'female student' },
          { yoruba: 'akẹ́kọ̀ọ́ ọkùnrin', english: 'male student' },
          { yoruba: 'máàpù àgbáyé', english: 'world map' },
        ],
        expressions: [
          { yoruba: 'ẹ dákẹ́ ariwo', english: 'be quiet!' },
          { yoruba: 'o kárẹ!', english: 'good job!' },
          { yoruba: 'ọ́la ni ọjọ́ ìdánwò', english: 'tomorrow is exam day' },
        ],
      },
    },
    summaries: [
      'Classroom vocabulary covers objects, technology, and school-related expressions.',
    ],
    tags: ['vocabulary', 'classroom', 'school', 'objects'],
  },
  {
    id: 'ch2-lesson1',
    chapterNumber: 2,
    chapterTitle: 'Orí Kejì – My Classroom',
    lessonNumber: 1,
    lessonTitle: 'Possessive Pronouns',
    pageStart: 51,
    pageEnd: 54,
    objectives: [
      'Learn singular and plural possessive pronouns',
      'Form possessive constructions with nouns',
      'Use possessives honorifically for respect',
    ],
    sections: {
      vocabulary: {
        phrases: [
          { yoruba: 'ìwéè mi', english: 'my book' },
          { yoruba: 'ilée wọn', english: 'their house' },
          { yoruba: 'ojúu wa', english: 'our eyes' },
          { yoruba: 'màmáà rẹ', english: 'your mother' },
        ],
      },
      grammarTopics: [
        'Singular possessives: mi (my), rẹ/ẹ (your), rẹ̀/ẹ̀ (his/her)',
        'Plural possessives: wa (our), yín (your pl.), wọn (their)',
        '"Wọn" and "yín" double as honorific possessives',
        'Possessive formed by dropping initial vowel of emphatic pronoun',
      ],
      exercises: [
        { title: 'Ìṣẹ́ Ṣíṣe 1', notes: 'Replace words in bold with possessive pronouns' },
        { title: 'Ìṣẹ́ Ṣíṣe 2', notes: 'Use correct possessive pronouns' },
        { title: 'Ìṣẹ́ Ṣíṣe 3', notes: 'Fill blanks with possessives matching the subject' },
      ],
    },
    summaries: [
      'Possessive pronouns follow the noun and are derived from emphatic pronouns.',
      'The same forms "wọn" and "yín" serve both plural and honorific purposes.',
    ],
    tags: ['possessives', 'pronouns', 'grammar'],
  },
  {
    id: 'ch2-lesson2',
    chapterNumber: 2,
    chapterTitle: 'Orí Kejì – My Classroom',
    lessonNumber: 2,
    lessonTitle: 'The Plural Marker "àwọn"',
    pageStart: 55,
    pageEnd: 56,
    objectives: [
      'Use "àwọn" to mark plural nouns',
      'Understand when "àwọn" is optional',
      'Recognise honorific singular use of "àwọn"',
    ],
    sections: {
      vocabulary: {
        phrases: [
          { yoruba: 'àwọn ilé', english: 'houses' },
          { yoruba: 'àwọn òbí', english: 'parents' },
          { yoruba: 'àwọn ọmọdé', english: 'children' },
          { yoruba: 'àwọn aráà mi', english: 'my people / relatives' },
        ],
      },
      grammarTopics: [
        '"Àwọn" placed before noun marks plurality',
        'Can be omitted in generic/universal statements',
        'Singular honorific use: "àwọn bàbáà mi" (my father, respectfully)',
        'Nested plurals: "àwọn ilé àwọn òbíì mi"',
      ],
      exercises: [
        { title: 'Ìṣẹ́ Ṣíṣe 1', notes: 'Write sentences in Yorùbá using the plural marker' },
        { title: 'Ìṣẹ́ Ṣíṣe 2', notes: 'Fill blanks with appropriate pronouns' },
      ],
    },
    summaries: [
      '"Àwọn" before a noun signals plurality but is sometimes optional.',
      'It can also be used honorifically to refer to a single respected person.',
    ],
    tags: ['plural', 'grammar', 'àwọn'],
  },
  {
    id: 'ch2-lesson3',
    chapterNumber: 2,
    chapterTitle: 'Orí Kejì – My Classroom',
    lessonNumber: 3,
    lessonTitle: 'Nínú Kíláàsì (In the Classroom)',
    pageStart: 57,
    pageEnd: 65,
    objectives: [
      'Describe classroom objects and their locations',
      'Understand monologue reading about a classroom',
      'Use prepositions in Yorùbá context',
    ],
    sections: {
      grammarTopics: [
        'Classroom object descriptions using vocabulary',
        'Prepositions of location (nínú = inside)',
        'Monologue comprehension (Kíláàsì mi)',
        'True/false comprehension exercises',
      ],
      dialogues: [
        { title: 'Kíláàsì mi (My Classroom)', summary: 'Wálé describes his classroom at the University of Texas in Austin.' },
      ],
      exercises: [
        { title: 'Ìṣẹ́ Ṣíṣe 1', notes: 'True/false comprehension questions' },
      ],
    },
    summaries: [
      'A monologue about a student\'s classroom introduces prepositions and descriptions.',
      'Students practise comprehension through true/false exercises.',
    ],
    tags: ['classroom', 'prepositions', 'reading', 'comprehension'],
  },
  {
    id: 'ch2-lesson4',
    chapterNumber: 2,
    chapterTitle: 'Orí Kejì – My Classroom',
    lessonNumber: 4,
    lessonTitle: 'Nọ́ńbà (Numbers 0–40)',
    pageStart: 66,
    pageEnd: 70,
    objectives: [
      'Count from 0 to 40 in Yorùbá',
      'Understand the vigesimal (base-20) counting system',
      'Use numbers in mathematical expressions',
    ],
    sections: {
      vocabulary: {
        nouns: [
          { yoruba: 'oódo / oónà', english: 'zero' },
          { yoruba: 'ọ̀kan / ení', english: 'one' },
          { yoruba: 'èjì / méjì', english: 'two' },
          { yoruba: 'ẹ̀ta / mẹ́ta', english: 'three' },
          { yoruba: 'ẹ̀rin / mẹ́rin', english: 'four' },
          { yoruba: 'àrún / márùn', english: 'five' },
          { yoruba: 'ẹ̀fà / mẹ́fà', english: 'six' },
          { yoruba: 'èje / méje', english: 'seven' },
          { yoruba: 'ẹ̀jọ / mẹ́jọ', english: 'eight' },
          { yoruba: 'ẹ̀sán / mẹ́sàn', english: 'nine' },
          { yoruba: 'ẹ̀wá / mẹ́wàá', english: 'ten' },
          { yoruba: 'ogún', english: 'twenty' },
          { yoruba: 'ọgbọ̀n', english: 'thirty' },
          { yoruba: 'ogójì', english: 'forty' },
        ],
      },
      grammarTopics: [
        'Vigesimal (base-20) number system',
        'Numbers 11–14 add to 10; 15–19 subtract from 20',
        'Mathematical operations in Yorùbá',
        'Cardinal vs ordinal usage of number forms',
      ],
      exercises: [
        { title: 'Ìṣẹ́ Ṣíṣe 1', notes: 'Arithmetic problems in Yorùbá' },
        { title: 'Ìṣẹ́ Ṣíṣe 2', notes: 'Number dictation and writing' },
      ],
    },
    summaries: [
      'Yorùbá uses a base-20 (vigesimal) number system unique among world languages.',
      'Numbers 15–19 are formed by subtracting from 20, a distinctive mathematical logic.',
    ],
    tags: ['numbers', 'counting', 'mathematics', 'vigesimal'],
  },

  // ── Chapter 3: Mark the Date ──
  {
    id: 'ch3-lesson1',
    chapterNumber: 3,
    chapterTitle: 'Orí Kẹta – Mark the Date',
    lessonNumber: 1,
    lessonTitle: 'Nọ́ńbà (Numbers 40–100) Continued',
    pageStart: 73,
    pageEnd: 75,
    objectives: [
      'Count from 40 to 100 in Yorùbá',
      'Apply the vigesimal system to larger numbers',
    ],
    sections: {
      vocabulary: {
        nouns: [
          { yoruba: 'ogójì', english: 'forty' },
          { yoruba: 'àádọ́ta', english: 'fifty' },
          { yoruba: 'ọgọ́ta', english: 'sixty' },
          { yoruba: 'àádọ́rin', english: 'seventy' },
          { yoruba: 'ọgọ́rin', english: 'eighty' },
          { yoruba: 'àádọ́rùn', english: 'ninety' },
          { yoruba: 'ọgọ́rùn', english: 'one hundred' },
        ],
      },
      grammarTopics: [
        'Higher numbers built on multiples of 20',
        'Subtraction-based names (e.g., 50 = "ten removed from sixty")',
        'Using numbers in everyday contexts',
      ],
      exercises: [
        { title: 'Ìṣẹ́ Ṣíṣe 1', notes: 'Write numbers in Yorùbá' },
        { title: 'Ìṣẹ́ Ṣíṣe 2', notes: 'Number arithmetic practice' },
      ],
    },
    summaries: [
      'Numbers 40–100 follow the vigesimal pattern with addition and subtraction.',
      'Fifty is literally "ten removed from sixty," showcasing the subtractive logic.',
    ],
    tags: ['numbers', 'counting', 'arithmetic'],
  },
  {
    id: 'ch3-lesson2',
    chapterNumber: 3,
    chapterTitle: 'Orí Kẹta – Mark the Date',
    lessonNumber: 2,
    lessonTitle: 'Future Tense "Máa"',
    pageStart: 76,
    pageEnd: 78,
    objectives: [
      'Express future actions using "máa"',
      'Construct future tense sentences',
      'Contrast present progressive with future tense',
    ],
    sections: {
      grammarTopics: [
        '"Máa" placed before verb for future tense',
        'Distinction from progressive "ń" (present continuous)',
        'Negative future with "kò ní" or "kì yóò"',
        'Future tense in questions and answers',
      ],
      exercises: [
        { title: 'Ìṣẹ́ Ṣíṣe 1', notes: 'Convert present sentences to future tense' },
        { title: 'Ìṣẹ́ Ṣíṣe 2', notes: 'Answer future-tense questions' },
      ],
    },
    summaries: [
      '"Máa" before a verb signals future action, equivalent to English "will."',
      'Negative future uses "kò ní" or "kì yóò" before the verb.',
    ],
    tags: ['future-tense', 'grammar', 'máa', 'tense'],
  },
  {
    id: 'ch3-lesson3',
    chapterNumber: 3,
    chapterTitle: 'Orí Kẹta – Mark the Date',
    lessonNumber: 3,
    lessonTitle: 'The Yorùbá Calendar (Days of the Week)',
    pageStart: 79,
    pageEnd: 81,
    objectives: [
      'Name all seven days of the week in Yorùbá',
      'Use day names in sentences about schedules',
    ],
    sections: {
      vocabulary: {
        nouns: [
          { yoruba: 'Ọjọ́ Àìkú', english: 'Sunday' },
          { yoruba: 'Ọjọ́ Ajé', english: 'Monday' },
          { yoruba: 'Ọjọ́ Ìṣẹ́gun', english: 'Tuesday' },
          { yoruba: 'Ọjọ́rú', english: 'Wednesday' },
          { yoruba: 'Ọjọ́bọ̀', english: 'Thursday' },
          { yoruba: 'Ọjọ́ Ẹtì', english: 'Friday' },
          { yoruba: 'Ọjọ́ Àbámẹ́ta', english: 'Saturday' },
        ],
      },
      grammarTopics: [
        'Day names reflect Yorùbá cultural meanings',
        'Using days in scheduling sentences',
        'Traditional 4-day Yorùbá market week vs 7-day adopted week',
      ],
      exercises: [
        { title: 'Ìṣẹ́ Ṣíṣe 1', notes: 'Match days to their meanings' },
        { title: 'Ìṣẹ́ Ṣíṣe 2', notes: 'Create sentences using day names' },
      ],
    },
    summaries: [
      'Each day name in Yorùbá carries cultural meaning (e.g., Àìkú = immortality for Sunday).',
      'The traditional Yorùbá calendar had a 4-day market cycle before adopting the 7-day week.',
    ],
    tags: ['calendar', 'days', 'week', 'culture'],
  },
  {
    id: 'ch3-lesson4',
    chapterNumber: 3,
    chapterTitle: 'Orí Kẹta – Mark the Date',
    lessonNumber: 4,
    lessonTitle: 'Kàlẹ́ńdà Yorùbá (Months of the Year)',
    pageStart: 82,
    pageEnd: 86,
    objectives: [
      'Name the twelve months in Yorùbá',
      'State dates using month and number',
      'Discuss cultural festivals by month',
    ],
    sections: {
      vocabulary: {
        nouns: [
          { yoruba: 'Oṣù Ṣẹ́rẹ́', english: 'January' },
          { yoruba: 'Oṣù Èrèlé', english: 'February' },
          { yoruba: 'Oṣù Ẹrẹ̀nà', english: 'March' },
          { yoruba: 'Oṣù Ìgbé', english: 'April' },
          { yoruba: 'Oṣù Ẹ̀bìbí', english: 'May' },
          { yoruba: 'Oṣù Òkúdu', english: 'June' },
          { yoruba: 'Oṣù Agẹmọ', english: 'July' },
          { yoruba: 'Oṣù Ògún', english: 'August' },
          { yoruba: 'Oṣù Owewe', english: 'September' },
          { yoruba: 'Oṣù Ọ̀wàrà', english: 'October' },
          { yoruba: 'Oṣù Bélú', english: 'November' },
          { yoruba: 'Oṣù Ọ̀pẹ̀', english: 'December' },
        ],
      },
      grammarTopics: [
        'Month names and their cultural associations',
        'Expressing dates: "Ọjọ́ + number + oṣù + month"',
        'Seasonal and festival vocabulary',
      ],
      exercises: [
        { title: 'Ìṣẹ́ Ṣíṣe 1', notes: 'Write important dates in Yorùbá' },
        { title: 'Ìṣẹ́ Ṣíṣe 2', notes: 'Answer questions about months and festivals' },
      ],
    },
    summaries: [
      'Yorùbá month names are rooted in agricultural seasons and traditional festivals.',
      'Dates combine day number, month name, and year in a distinct word order.',
    ],
    tags: ['calendar', 'months', 'dates', 'festivals'],
  },

  // ── Chapter 4: What Time Do We Meet? ──
  {
    id: 'ch4-lesson1',
    chapterNumber: 4,
    chapterTitle: 'Orí Kẹrin – What Time Do We Meet?',
    lessonNumber: 1,
    lessonTitle: 'The Interrogative "Mélòó"',
    pageStart: 90,
    pageEnd: 94,
    objectives: [
      'Ask "how many" questions using "mélòó"',
      'Use "mélòó" with nouns for quantity',
    ],
    sections: {
      vocabulary: {
        interrogatives: [
          { yoruba: 'Mélòó?', english: 'How many?' },
          { yoruba: 'Mélòó ni?', english: 'How many is it?' },
        ],
      },
      grammarTopics: [
        '"Mélòó" as a quantity interrogative',
        'Answers use cardinal numbers after the noun',
        'Combining "mélòó" with various nouns',
      ],
      exercises: [
        { title: 'Ìṣẹ́ Ṣíṣe 1', notes: 'Ask and answer "how many" questions' },
        { title: 'Ìṣẹ́ Ṣíṣe 2', notes: 'Quantity-based conversation practice' },
      ],
    },
    summaries: [
      '"Mélòó" is the Yorùbá word for "how many," used to ask about quantities.',
      'Responses place the number after the noun being counted.',
    ],
    tags: ['interrogatives', 'quantity', 'mélòó', 'grammar'],
  },
  {
    id: 'ch4-lesson2',
    chapterNumber: 4,
    chapterTitle: 'Orí Kẹrin – What Time Do We Meet?',
    lessonNumber: 2,
    lessonTitle: 'Aago mélòó ni ó lù? (What Time Is It?)',
    pageStart: 95,
    pageEnd: 103,
    objectives: [
      'Tell and ask for the time in Yorùbá',
      'Use "aago" (clock/time) in sentences',
      'Express half-hours and quarter-hours',
    ],
    sections: {
      vocabulary: {
        phrases: [
          { yoruba: 'Aago mélòó ni ó lù?', english: 'What time is it?' },
          { yoruba: 'Aago kan ni ó lù', english: 'It is one o\'clock' },
          { yoruba: 'Aago méjì àbò', english: 'half past two' },
        ],
      },
      grammarTopics: [
        '"Aago" (clock) + number for telling time',
        'Half-hour expressions with "àbò"',
        'Quarter-hour expressions',
        'Scheduling: "Ní aago mélòó?"',
      ],
      exercises: [
        { title: 'Ìṣẹ́ Ṣíṣe 1', notes: 'Tell the time shown on clock faces' },
        { title: 'Ìṣẹ́ Ṣíṣe 2', notes: 'Create scheduling dialogues' },
      ],
    },
    summaries: [
      'Time-telling uses "aago" followed by the number and "ni ó lù" (it struck).',
      'Half-hours use "àbò" and schedules combine time with future tense "máa."',
    ],
    tags: ['time', 'clock', 'scheduling', 'conversation'],
  },
  {
    id: 'ch4-lesson3',
    chapterNumber: 4,
    chapterTitle: 'Orí Kẹrin – What Time Do We Meet?',
    lessonNumber: 3,
    lessonTitle: 'Asking for Age',
    pageStart: 104,
    pageEnd: 107,
    objectives: [
      'Ask and state someone\'s age in Yorùbá',
      'Use "ọmọ ọdún mélòó" (how old)',
    ],
    sections: {
      vocabulary: {
        phrases: [
          { yoruba: 'Ọmọ ọdún mélòó ni ẹ?', english: 'How old are you?' },
          { yoruba: 'Ọmọ ọdún mẹ́wàá ni mi', english: 'I am ten years old' },
        ],
      },
      grammarTopics: [
        '"Ọmọ ọdún" (child of years) as age expression',
        'Combining age questions with "mélòó"',
        'Discussing ages of family members',
      ],
      exercises: [
        { title: 'Ìṣẹ́ Ṣíṣe 1', notes: 'Ask and answer age questions' },
        { title: 'Ìṣẹ́ Ṣíṣe 2', notes: 'Family age descriptions' },
      ],
    },
    summaries: [
      'Age uses the expression "ọmọ ọdún" (child of years) plus the number.',
      'Asking someone\'s age is common and considered polite in Yorùbá culture.',
    ],
    tags: ['age', 'numbers', 'family', 'conversation'],
  },
  {
    id: 'ch4-lesson4',
    chapterNumber: 4,
    chapterTitle: 'Orí Kẹrin – What Time Do We Meet?',
    lessonNumber: 4,
    lessonTitle: 'Àwọn Àwọ̀ (Colors)',
    pageStart: 108,
    pageEnd: 110,
    objectives: [
      'Name common colors in Yorùbá',
      'Describe objects using color adjectives',
    ],
    sections: {
      vocabulary: {
        nouns: [
          { yoruba: 'funfun', english: 'white' },
          { yoruba: 'dúdú', english: 'black' },
          { yoruba: 'pupa', english: 'red' },
          { yoruba: 'aró', english: 'blue/indigo' },
          { yoruba: 'àlùkò', english: 'brown' },
          { yoruba: 'ewé', english: 'green' },
          { yoruba: 'iyèyè', english: 'yellow' },
          { yoruba: 'sanmọ́', english: 'orange' },
          { yoruba: 'àwọ̀ elésè-ọ̀sán', english: 'purple' },
        ],
      },
      grammarTopics: [
        'Color adjectives follow the noun they describe',
        'Only three traditional colors in Yorùbá: funfun, dúdú, pupa',
        'Modern color terms borrowed or coined from descriptions',
      ],
      exercises: [
        { title: 'Ìṣẹ́ Ṣíṣe 1', notes: 'Describe objects using colors' },
        { title: 'Ìṣẹ́ Ṣíṣe 2', notes: 'Color identification activity' },
      ],
    },
    summaries: [
      'Yorùbá traditionally has three core colors: white, black, and red.',
      'Modern colors are expressed through descriptive compounds and borrowed terms.',
    ],
    tags: ['colors', 'adjectives', 'vocabulary', 'description'],
  },

  // ── Chapter 5: My Family Tree ──
  {
    id: 'ch5-lesson1',
    chapterNumber: 5,
    chapterTitle: 'Orí Karùnún – My Family Tree',
    lessonNumber: 1,
    lessonTitle: 'The Verbs "jẹ́" and "ni" (to be)',
    pageStart: 115,
    pageEnd: 118,
    objectives: [
      'Use "jẹ́" and "ni" as copular verbs (to be)',
      'Distinguish between the two forms of "to be"',
    ],
    sections: {
      grammarTopics: [
        '"Jẹ́" used with nouns: "Mo jẹ́ akẹ́kọ̀ọ́" (I am a student)',
        '"Ni" used for identification: "Adé ni ọ̀gá" (Adé is the boss)',
        'Difference between "jẹ́" (inherent quality) and "ni" (identification)',
        'Negation of "jẹ́" with "kì í ṣe"',
      ],
      exercises: [
        { title: 'Ìṣẹ́ Ṣíṣe 1', notes: 'Use "jẹ́" or "ni" appropriately' },
        { title: 'Ìṣẹ́ Ṣíṣe 2', notes: 'Negate sentences using "kì í ṣe"' },
      ],
    },
    summaries: [
      'Yorùbá has two verbs for "to be": "jẹ́" for inherent roles and "ni" for identification.',
      '"Kì í ṣe" negates "jẹ́," meaning "is not" in Yorùbá.',
    ],
    tags: ['verbs', 'to-be', 'grammar', 'identity'],
  },
  {
    id: 'ch5-lesson2',
    chapterNumber: 5,
    chapterTitle: 'Orí Karùnún – My Family Tree',
    lessonNumber: 2,
    lessonTitle: 'The Interrogative "Ta ni" (Who)',
    pageStart: 119,
    pageEnd: 120,
    objectives: [
      'Ask "who" questions using "Ta ni"',
      'Identify family members using "Ta ni"',
    ],
    sections: {
      vocabulary: {
        interrogatives: [
          { yoruba: 'Ta ni?', english: 'Who is it?' },
          { yoruba: 'Ta ni ìyẹn?', english: 'Who is that?' },
        ],
      },
      grammarTopics: [
        '"Ta ni" introduces who-questions',
        'Answering with family relationship terms',
        'Combining "Ta ni" with possessives',
      ],
      exercises: [
        { title: 'Ìṣẹ́ Ṣíṣe 1', notes: 'Ask and answer "who" questions about family' },
      ],
    },
    summaries: [
      '"Ta ni" is the Yorùbá interrogative for "who," commonly used with family terms.',
      'Answers identify people by name and relationship to the speaker.',
    ],
    tags: ['interrogatives', 'who', 'family', 'grammar'],
  },
  {
    id: 'ch5-lesson3',
    chapterNumber: 5,
    chapterTitle: 'Orí Karùnún – My Family Tree',
    lessonNumber: 3,
    lessonTitle: 'Ẹbí ní ìdílé Mẹ́ta (Three Generations)',
    pageStart: 121,
    pageEnd: 134,
    objectives: [
      'Name three generations of family members',
      'Describe family relationships in Yorùbá',
      'Use family tree vocabulary in conversations',
    ],
    sections: {
      vocabulary: {
        nouns: [
          { yoruba: 'bàbá', english: 'father' },
          { yoruba: 'ìyá / màmá', english: 'mother' },
          { yoruba: 'ẹ̀gbọ́n', english: 'older sibling' },
          { yoruba: 'àbúrò', english: 'younger sibling' },
          { yoruba: 'ọmọ', english: 'child' },
          { yoruba: 'ọmọ ọmọ', english: 'grandchild' },
          { yoruba: 'bàbá àgbà / bàbá ńlá', english: 'grandfather' },
          { yoruba: 'ìyá àgbà / ìyá ńlá', english: 'grandmother' },
          { yoruba: 'ọkọ', english: 'husband' },
          { yoruba: 'ìyàwó', english: 'wife' },
          { yoruba: 'àná', english: 'in-law' },
          { yoruba: 'ẹ̀gbọ́n obìnrin', english: 'older sister' },
          { yoruba: 'ẹ̀gbọ́n ọkùnrin', english: 'older brother' },
        ],
      },
      grammarTopics: [
        'Extended family terminology spans three generations',
        'Yorùbá kinship system differentiates by seniority',
        'Gender-specific sibling terms using "obìnrin/ọkùnrin"',
        'In-law relationships and naming conventions',
      ],
      exercises: [
        { title: 'Ìṣẹ́ Ṣíṣe 1', notes: 'Label a family tree in Yorùbá' },
        { title: 'Ìṣẹ́ Ṣíṣe 2', notes: 'Describe your own family in Yorùbá' },
        { title: 'Ìṣẹ́ Ṣíṣe 3', notes: 'Identify relationships from descriptions' },
      ],
    },
    summaries: [
      'Yorùbá family vocabulary distinguishes siblings by relative age, not just gender.',
      'Three generations of kinship terms reflect the importance of extended family.',
    ],
    tags: ['family', 'kinship', 'generations', 'vocabulary'],
  },
  {
    id: 'ch5-lesson4',
    chapterNumber: 5,
    chapterTitle: 'Orí Karùnún – My Family Tree',
    lessonNumber: 4,
    lessonTitle: 'Describing People',
    pageStart: 135,
    pageEnd: 140,
    objectives: [
      'Describe physical appearance in Yorùbá',
      'Use adjectives for height, size, and features',
      'Compare people using descriptive phrases',
    ],
    sections: {
      vocabulary: {
        nouns: [
          { yoruba: 'gíga', english: 'tall' },
          { yoruba: 'kúkurú', english: 'short' },
          { yoruba: 'sanra', english: 'fat / plump' },
          { yoruba: 'tínrín', english: 'slim / thin' },
          { yoruba: 'arẹwà', english: 'beautiful / handsome' },
          { yoruba: 'irun', english: 'hair' },
          { yoruba: 'ojú', english: 'face / eyes' },
        ],
      },
      grammarTopics: [
        'Adjectives follow nouns in Yorùbá',
        'Descriptive phrases for physical appearance',
        'Comparison structures in Yorùbá',
        'Using "jù" for comparatives (more than)',
      ],
      exercises: [
        { title: 'Ìṣẹ́ Ṣíṣe 1', notes: 'Describe classmates using Yorùbá adjectives' },
        { title: 'Ìṣẹ́ Ṣíṣe 2', notes: 'Compare family members' },
      ],
    },
    summaries: [
      'Physical descriptions place adjectives after nouns in Yorùbá word order.',
      'Comparisons use "jù" (more than) to express relative qualities.',
    ],
    tags: ['descriptions', 'adjectives', 'appearance', 'comparisons'],
  },
];

// ── Helper functions ──

export function getChapters(): { number: number; title: string; lessons: YorubaLesson[] }[] {
  const chapters = new Map<number, { title: string; lessons: YorubaLesson[] }>();

  for (const lesson of yorubaYeMiData) {
    if (!chapters.has(lesson.chapterNumber)) {
      chapters.set(lesson.chapterNumber, {
        title: lesson.chapterTitle,
        lessons: [],
      });
    }
    chapters.get(lesson.chapterNumber)!.lessons.push(lesson);
  }

  return Array.from(chapters.entries())
    .sort(([a], [b]) => a - b)
    .map(([number, data]) => ({ number, ...data }));
}

export function getLessonById(id: string): YorubaLesson | undefined {
  return yorubaYeMiData.find((l) => l.id === id);
}

export function searchLessons(query: string): YorubaLesson[] {
  const q = query.toLowerCase();
  return yorubaYeMiData.filter((lesson) => {
    const fields = [
      lesson.chapterTitle,
      lesson.lessonTitle,
      ...lesson.objectives,
      ...lesson.tags,
      ...lesson.summaries,
      ...(lesson.sections.grammarTopics ?? []),
      ...(lesson.sections.vocabulary?.nouns?.map((v) => `${v.yoruba} ${v.english}`) ?? []),
      ...(lesson.sections.vocabulary?.verbs?.map((v) => `${v.yoruba} ${v.english}`) ?? []),
      ...(lesson.sections.vocabulary?.phrases?.map((v) => `${v.yoruba} ${v.english}`) ?? []),
      ...(lesson.sections.vocabulary?.expressions?.map((v) => `${v.yoruba} ${v.english}`) ?? []),
      ...(lesson.sections.vocabulary?.interrogatives?.map((v) => `${v.yoruba} ${v.english}`) ?? []),
    ];
    return fields.some((f) => f.toLowerCase().includes(q));
  });
}
