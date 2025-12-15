export interface VocabularyItem {
  id: string;
  word: string;
  translation: string;
  pronunciation: string;
  audioUrl?: string;
  example?: string;
  exampleTranslation?: string;
}

export interface DialogLine {
  id: string;
  speaker: string;
  text: string;
  translation: string;
  audioUrl?: string;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'typing' | 'listening';
  question: string;
  options?: string[];
  correctAnswer: string;
  audioUrl?: string;
}

export interface Lesson {
  id: string;
  languageId: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  topic: string;
  skills: string[];
  estimatedMinutes: number;
  objectives: string[];
  vocabulary: VocabularyItem[];
  grammarNotes: string[];
  dialog: DialogLine[];
  quiz: QuizQuestion[];
  order: number;
}

export const lessons: Lesson[] = [
  {
    id: 'edo-greetings',
    languageId: 'edo',
    title: 'Greetings in Edo',
    description: 'Learn essential greetings and how to be polite in Edo culture.',
    level: 'beginner',
    topic: 'greetings',
    skills: ['listening', 'speaking'],
    estimatedMinutes: 15,
    objectives: [
      'Greet people at different times of day',
      'Ask and respond to "How are you?"',
      'Use respectful greetings for elders'
    ],
    order: 1,
    vocabulary: [
      { id: 'v1', word: 'Ọbọkhian', translation: 'Good morning', pronunciation: 'oh-BOH-khee-ahn' },
      { id: 'v2', word: 'Ọsanọbua', translation: 'God / Good afternoon', pronunciation: 'oh-sah-NOH-boo-ah' },
      { id: 'v3', word: 'Kóyo', translation: 'Hello / Hi', pronunciation: 'KOH-yoh' },
      { id: 'v4', word: 'Vbẹẹ', translation: 'Yes', pronunciation: 'vbeh' },
      { id: 'v5', word: 'Ẹ̀hẹ̀n', translation: 'No', pronunciation: 'eh-hen' },
      { id: 'v6', word: 'Ọse', translation: 'Thank you', pronunciation: 'oh-seh' },
      { id: 'v7', word: 'Ẹvbare', translation: 'Please', pronunciation: 'eh-vbah-reh' },
      { id: 'v8', word: 'Ọ khian?', translation: 'How are you?', pronunciation: 'oh khee-ahn' }
    ],
    grammarNotes: [
      'In Edo culture, greetings are very important. Always greet elders first.',
      'The tone of words matters in Edo. High and low tones change meaning.',
      '"Ọbọkhian" is used for morning greetings until around noon.',
      'Add "rẹ" (your) to make greetings more personal: "Ọbọkhian rẹ" (Your morning/Good morning to you)'
    ],
    dialog: [
      { id: 'd1', speaker: 'Osaze', text: 'Ọbọkhian!', translation: 'Good morning!' },
      { id: 'd2', speaker: 'Ivie', text: 'Ọbọkhian! Ọ khian?', translation: 'Good morning! How are you?' },
      { id: 'd3', speaker: 'Osaze', text: 'I ghẹ. Wẹ na khian?', translation: "I'm fine. And you?" },
      { id: 'd4', speaker: 'Ivie', text: 'I ghẹ, ọse.', translation: "I'm fine, thank you." }
    ],
    quiz: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'How do you say "Good morning" in Edo?',
        options: ['Ọsanọbua', 'Ọbọkhian', 'Kóyo', 'Ọse'],
        correctAnswer: 'Ọbọkhian'
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'What does "Ọse" mean?',
        options: ['Hello', 'Please', 'Thank you', 'Goodbye'],
        correctAnswer: 'Thank you'
      },
      {
        id: 'q3',
        type: 'typing',
        question: 'Type the Edo word for "Yes"',
        correctAnswer: 'Vbẹẹ'
      }
    ]
  },
  {
    id: 'edo-introductions',
    languageId: 'edo',
    title: 'Introducing Yourself',
    description: 'Learn to introduce yourself and ask others about themselves.',
    level: 'beginner',
    topic: 'greetings',
    skills: ['listening', 'speaking', 'grammar'],
    estimatedMinutes: 20,
    objectives: [
      'State your name',
      'Ask someone their name',
      'Say where you are from',
      'Use basic pronouns'
    ],
    order: 2,
    vocabulary: [
      { id: 'v1', word: 'Mẹ', translation: 'I / Me', pronunciation: 'meh' },
      { id: 'v2', word: 'Wẹ', translation: 'You', pronunciation: 'weh' },
      { id: 'v3', word: 'Ọre', translation: 'He/She', pronunciation: 'oh-reh' },
      { id: 'v4', word: 'Ẹvbo', translation: 'Place / Town', pronunciation: 'eh-vboh' },
      { id: 'v5', word: 'Enọ', translation: 'Name', pronunciation: 'eh-noh' },
      { id: 'v6', word: 'Vbe', translation: 'From / In', pronunciation: 'vbeh' },
      { id: 'v7', word: 'Dẹ', translation: 'To be', pronunciation: 'deh' },
      { id: 'v8', word: 'Ghẹ', translation: 'To know', pronunciation: 'gheh' }
    ],
    grammarNotes: [
      'To say "My name is...", use: "Enọ mẹ dẹ..." (Name my is...)',
      'To ask "What is your name?", say: "De enọ wẹ?" (What name your?)',
      'To say where you are from: "I rre vbe..." (I come from...)',
      'Word order in Edo is often Subject-Object-Verb, different from English.'
    ],
    dialog: [
      { id: 'd1', speaker: 'Ehi', text: 'Kóyo! De enọ wẹ?', translation: 'Hello! What is your name?' },
      { id: 'd2', speaker: 'Osagie', text: 'Enọ mẹ dẹ Osagie. De enọ wẹ?', translation: 'My name is Osagie. What is your name?' },
      { id: 'd3', speaker: 'Ehi', text: 'Enọ mẹ dẹ Ehi. Vbe evbo na wẹ rre?', translation: 'My name is Ehi. Where are you from?' },
      { id: 'd4', speaker: 'Osagie', text: 'I rre vbe Bini. Wẹ na?', translation: 'I am from Benin. And you?' },
      { id: 'd5', speaker: 'Ehi', text: 'I rre vbe Ekpoma.', translation: 'I am from Ekpoma.' }
    ],
    quiz: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'How do you ask "What is your name?" in Edo?',
        options: ['Enọ mẹ dẹ?', 'De enọ wẹ?', 'Vbe evbo na?', 'Ọ khian?'],
        correctAnswer: 'De enọ wẹ?'
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'What does "Mẹ" mean?',
        options: ['You', 'He/She', 'I/Me', 'We'],
        correctAnswer: 'I/Me'
      },
      {
        id: 'q3',
        type: 'typing',
        question: 'Type the Edo word for "Name"',
        correctAnswer: 'Enọ'
      }
    ]
  },
  {
    id: 'edo-numbers',
    languageId: 'edo',
    title: 'Numbers 1-20',
    description: 'Learn to count from 1 to 20 in Edo.',
    level: 'beginner',
    topic: 'numbers',
    skills: ['listening', 'speaking'],
    estimatedMinutes: 20,
    objectives: [
      'Count from 1 to 10',
      'Count from 11 to 20',
      'Use numbers in simple sentences'
    ],
    order: 3,
    vocabulary: [
      { id: 'v1', word: 'Ọkpa', translation: 'One', pronunciation: 'oh-kpah' },
      { id: 'v2', word: 'Èvá', translation: 'Two', pronunciation: 'eh-vah' },
      { id: 'v3', word: 'Èhá', translation: 'Three', pronunciation: 'eh-hah' },
      { id: 'v4', word: 'Ènè', translation: 'Four', pronunciation: 'eh-neh' },
      { id: 'v5', word: 'Ísẹ̀n', translation: 'Five', pronunciation: 'ee-sehn' },
      { id: 'v6', word: 'Èhán', translation: 'Six', pronunciation: 'eh-hahn' },
      { id: 'v7', word: 'Ìhínrọ́n', translation: 'Seven', pronunciation: 'ee-heen-rohn' },
      { id: 'v8', word: 'Ìnẹ́nẹ́', translation: 'Eight', pronunciation: 'ee-neh-neh' },
      { id: 'v9', word: 'Ìsẹ́nísẹ̀n', translation: 'Nine', pronunciation: 'ee-seh-nee-sehn' },
      { id: 'v10', word: 'Ìghán', translation: 'Ten', pronunciation: 'ee-ghahn' },
      { id: 'v11', word: 'Ọ̀wọ́nrọ́n', translation: 'Eleven', pronunciation: 'oh-won-rohn' },
      { id: 'v12', word: 'Ìghàn-nè-vá', translation: 'Twelve', pronunciation: 'ee-ghahn-neh-vah' }
    ],
    grammarNotes: [
      'Numbers 1-10 are the foundation. Learn these first.',
      'Numbers 11-19 are formed by adding to 10 (Ìghán).',
      'Twenty is "Úgie" - a new base number.',
      'When counting objects, the number usually comes after the noun.'
    ],
    dialog: [
      { id: 'd1', speaker: 'Teacher', text: 'Emwin iran nèhí dẹ?', translation: 'How many things are these?' },
      { id: 'd2', speaker: 'Student', text: 'Iran dẹ ísẹ̀n.', translation: 'They are five.' },
      { id: 'd3', speaker: 'Teacher', text: 'Ọ dẹ ẹre! Nè èvá na vbe iran?', translation: "That's correct! And two more?" },
      { id: 'd4', speaker: 'Student', text: 'Ọ dẹ ìhínrọ́n.', translation: 'It is seven.' }
    ],
    quiz: [
      {
        id: 'q1',
        type: 'multiple-choice',
        question: 'What is "Five" in Edo?',
        options: ['Ènè', 'Ísẹ̀n', 'Èhán', 'Ìghán'],
        correctAnswer: 'Ísẹ̀n'
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        question: 'What number is "Ìghán"?',
        options: ['Five', 'Eight', 'Ten', 'Twelve'],
        correctAnswer: 'Ten'
      },
      {
        id: 'q3',
        type: 'typing',
        question: 'Type the Edo word for "One"',
        correctAnswer: 'Ọkpa'
      }
    ]
  }
];

export const getLessonsByLanguage = (languageId: string): Lesson[] => {
  return lessons.filter(lesson => lesson.languageId === languageId).sort((a, b) => a.order - b.order);
};

export const getLessonById = (id: string): Lesson | undefined => {
  return lessons.find(lesson => lesson.id === id);
};

export const getLessonsByLevel = (languageId: string, level: string): Lesson[] => {
  return lessons.filter(lesson => lesson.languageId === languageId && lesson.level === level);
};

export const getLessonsByTopic = (languageId: string, topic: string): Lesson[] => {
  return lessons.filter(lesson => lesson.languageId === languageId && lesson.topic === topic);
};
