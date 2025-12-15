export interface DictionaryEntry {
  id: string;
  languageId: string;
  word: string;
  pronunciation: string;
  partOfSpeech: string;
  meaning: string;
  example: string;
  exampleTranslation: string;
  relatedWords: string[];
  category: string;
  audioUrl?: string;
}

export const dictionaryEntries: DictionaryEntry[] = [
  // Greetings
  {
    id: 'dict-1',
    languageId: 'edo',
    word: 'Ọbọkhian',
    pronunciation: 'oh-BOH-khee-ahn',
    partOfSpeech: 'greeting',
    meaning: 'Good morning',
    example: 'Ọbọkhian, Erha!',
    exampleTranslation: 'Good morning, Father!',
    relatedWords: ['Ọsanọbua', 'Kóyo'],
    category: 'greetings'
  },
  {
    id: 'dict-2',
    languageId: 'edo',
    word: 'Ọsanọbua',
    pronunciation: 'oh-sah-NOH-boo-ah',
    partOfSpeech: 'greeting/noun',
    meaning: 'Good afternoon / God',
    example: 'Ọsanọbua na gha keghi wẹ.',
    exampleTranslation: 'May God bless you.',
    relatedWords: ['Ọbọkhian', 'Kóyo'],
    category: 'greetings'
  },
  {
    id: 'dict-3',
    languageId: 'edo',
    word: 'Kóyo',
    pronunciation: 'KOH-yoh',
    partOfSpeech: 'greeting',
    meaning: 'Hello / Hi',
    example: 'Kóyo! Ọ khian?',
    exampleTranslation: 'Hello! How are you?',
    relatedWords: ['Ọbọkhian', 'Ọsanọbua'],
    category: 'greetings'
  },
  {
    id: 'dict-4',
    languageId: 'edo',
    word: 'Ọse',
    pronunciation: 'oh-seh',
    partOfSpeech: 'expression',
    meaning: 'Thank you',
    example: 'Ọse gianẹ!',
    exampleTranslation: 'Thank you very much!',
    relatedWords: ['Ẹvbare'],
    category: 'greetings'
  },
  {
    id: 'dict-5',
    languageId: 'edo',
    word: 'Ẹvbare',
    pronunciation: 'eh-vbah-reh',
    partOfSpeech: 'expression',
    meaning: 'Please',
    example: 'Ẹvbare, rhiẹ mẹ ọre.',
    exampleTranslation: 'Please, give me that.',
    relatedWords: ['Ọse'],
    category: 'greetings'
  },
  // Family
  {
    id: 'dict-6',
    languageId: 'edo',
    word: 'Erha',
    pronunciation: 'eh-rah',
    partOfSpeech: 'noun',
    meaning: 'Father',
    example: 'Erha mẹ dẹ ọghẹ.',
    exampleTranslation: 'My father is kind.',
    relatedWords: ['Iye', 'Ọmọ'],
    category: 'family'
  },
  {
    id: 'dict-7',
    languageId: 'edo',
    word: 'Iye',
    pronunciation: 'ee-yeh',
    partOfSpeech: 'noun',
    meaning: 'Mother',
    example: 'Iye mẹ rre vbe owa.',
    exampleTranslation: 'My mother is at home.',
    relatedWords: ['Erha', 'Ọmọ'],
    category: 'family'
  },
  {
    id: 'dict-8',
    languageId: 'edo',
    word: 'Ọmọ',
    pronunciation: 'oh-moh',
    partOfSpeech: 'noun',
    meaning: 'Child',
    example: 'Ọmọ na dẹ oghe mẹ.',
    exampleTranslation: 'This child is mine.',
    relatedWords: ['Erha', 'Iye', 'Ẹkhuẹ'],
    category: 'family'
  },
  {
    id: 'dict-9',
    languageId: 'edo',
    word: 'Ẹkhuẹ',
    pronunciation: 'eh-khoo-eh',
    partOfSpeech: 'noun',
    meaning: 'Sibling',
    example: 'Ọre dẹ ẹkhuẹ mẹ.',
    exampleTranslation: 'He/She is my sibling.',
    relatedWords: ['Ọmọ', 'Erha', 'Iye'],
    category: 'family'
  },
  {
    id: 'dict-10',
    languageId: 'edo',
    word: 'Owa',
    pronunciation: 'oh-wah',
    partOfSpeech: 'noun',
    meaning: 'House / Home',
    example: 'I khian vbe owa.',
    exampleTranslation: 'I am going home.',
    relatedWords: ['Ẹvbo'],
    category: 'family'
  },
  // Food
  {
    id: 'dict-11',
    languageId: 'edo',
    word: 'Ẹvbarie',
    pronunciation: 'eh-vbah-ree-eh',
    partOfSpeech: 'noun',
    meaning: 'Food',
    example: 'Ẹvbarie na wọrọ.',
    exampleTranslation: 'This food is delicious.',
    relatedWords: ['Amẹ', 'Oka'],
    category: 'food'
  },
  {
    id: 'dict-12',
    languageId: 'edo',
    word: 'Amẹ',
    pronunciation: 'ah-meh',
    partOfSpeech: 'noun',
    meaning: 'Water',
    example: 'I hoo amẹ.',
    exampleTranslation: 'I am drinking water.',
    relatedWords: ['Ẹvbarie'],
    category: 'food'
  },
  {
    id: 'dict-13',
    languageId: 'edo',
    word: 'Oka',
    pronunciation: 'oh-kah',
    partOfSpeech: 'noun',
    meaning: 'Corn / Maize',
    example: 'I re oka.',
    exampleTranslation: 'I am eating corn.',
    relatedWords: ['Ẹvbarie', 'Ize'],
    category: 'food'
  },
  {
    id: 'dict-14',
    languageId: 'edo',
    word: 'Ize',
    pronunciation: 'ee-zeh',
    partOfSpeech: 'noun',
    meaning: 'Rice',
    example: 'Ize na wọrọ.',
    exampleTranslation: 'This rice is delicious.',
    relatedWords: ['Ẹvbarie', 'Oka'],
    category: 'food'
  },
  {
    id: 'dict-15',
    languageId: 'edo',
    word: 'Eran',
    pronunciation: 'eh-rahn',
    partOfSpeech: 'noun',
    meaning: 'Meat',
    example: 'I hoo eran.',
    exampleTranslation: 'I want meat.',
    relatedWords: ['Ẹvbarie', 'Ẹhẹn'],
    category: 'food'
  },
  {
    id: 'dict-16',
    languageId: 'edo',
    word: 'Ẹhẹn',
    pronunciation: 'eh-hehn',
    partOfSpeech: 'noun',
    meaning: 'Fish',
    example: 'Ẹhẹn na tan.',
    exampleTranslation: 'This fish is big.',
    relatedWords: ['Eran', 'Ẹvbarie'],
    category: 'food'
  },
  // Travel
  {
    id: 'dict-17',
    languageId: 'edo',
    word: 'Ẹvbo',
    pronunciation: 'eh-vboh',
    partOfSpeech: 'noun',
    meaning: 'Place / Town / Land',
    example: 'Ẹvbo na dẹ ọghẹ.',
    exampleTranslation: 'This place is beautiful.',
    relatedWords: ['Owa', 'Oto'],
    category: 'travel'
  },
  {
    id: 'dict-18',
    languageId: 'edo',
    word: 'Oto',
    pronunciation: 'oh-toh',
    partOfSpeech: 'noun',
    meaning: 'Ground / Road',
    example: 'Oto na dẹ ọzọzọ.',
    exampleTranslation: 'This road is long.',
    relatedWords: ['Ẹvbo'],
    category: 'travel'
  },
  {
    id: 'dict-19',
    languageId: 'edo',
    word: 'Ímọ́tọ́',
    pronunciation: 'ee-moh-toh',
    partOfSpeech: 'noun',
    meaning: 'Car / Vehicle',
    example: 'I rre vbe ímọ́tọ́.',
    exampleTranslation: 'I came by car.',
    relatedWords: ['Oto'],
    category: 'travel'
  },
  {
    id: 'dict-20',
    languageId: 'edo',
    word: 'Khian',
    pronunciation: 'khee-ahn',
    partOfSpeech: 'verb',
    meaning: 'To go',
    example: 'I khian vbe Ẹ̀dó.',
    exampleTranslation: 'I am going to Edo.',
    relatedWords: ['Rre', 'La'],
    category: 'travel'
  },
  {
    id: 'dict-21',
    languageId: 'edo',
    word: 'Rre',
    pronunciation: 'reh',
    partOfSpeech: 'verb',
    meaning: 'To come / To be from',
    example: 'I rre vbe Bini.',
    exampleTranslation: 'I am from Benin.',
    relatedWords: ['Khian'],
    category: 'travel'
  },
  {
    id: 'dict-22',
    languageId: 'edo',
    word: 'Gbe',
    pronunciation: 'gbeh',
    partOfSpeech: 'verb',
    meaning: 'To stay / To live',
    example: 'I gbe vbe Ẹ̀dó.',
    exampleTranslation: 'I live in Edo.',
    relatedWords: ['Owa', 'Ẹvbo'],
    category: 'travel'
  },
  {
    id: 'dict-23',
    languageId: 'edo',
    word: 'Vbe',
    pronunciation: 'vbeh',
    partOfSpeech: 'preposition',
    meaning: 'In / At / From',
    example: 'Ọre rre vbe owa.',
    exampleTranslation: 'He/She is at home.',
    relatedWords: ['Ne'],
    category: 'travel'
  },
  {
    id: 'dict-24',
    languageId: 'edo',
    word: 'Úwa',
    pronunciation: 'oo-wah',
    partOfSpeech: 'noun',
    meaning: 'Market',
    example: 'I khian vbe úwa.',
    exampleTranslation: 'I am going to the market.',
    relatedWords: ['Ẹvbo', 'Igho'],
    category: 'travel'
  },
  {
    id: 'dict-25',
    languageId: 'edo',
    word: 'Igho',
    pronunciation: 'ee-gho',
    partOfSpeech: 'noun',
    meaning: 'Money',
    example: 'I mwẹ igho.',
    exampleTranslation: 'I have money.',
    relatedWords: ['Úwa'],
    category: 'travel'
  }
];

export const searchDictionary = (languageId: string, query: string): DictionaryEntry[] => {
  const lowerQuery = query.toLowerCase();
  return dictionaryEntries.filter(
    entry =>
      entry.languageId === languageId &&
      (entry.word.toLowerCase().includes(lowerQuery) ||
        entry.meaning.toLowerCase().includes(lowerQuery) ||
        entry.example.toLowerCase().includes(lowerQuery))
  );
};

export const getDictionaryByCategory = (languageId: string, category: string): DictionaryEntry[] => {
  return dictionaryEntries.filter(
    entry => entry.languageId === languageId && entry.category === category
  );
};

export const getDictionaryEntry = (id: string): DictionaryEntry | undefined => {
  return dictionaryEntries.find(entry => entry.id === id);
};

export const getAllDictionaryEntries = (languageId: string): DictionaryEntry[] => {
  return dictionaryEntries.filter(entry => entry.languageId === languageId);
};
