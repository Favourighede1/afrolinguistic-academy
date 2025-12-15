export interface Language {
  id: string;
  name: string;
  nativeName: string;
  region: string;
  country: string;
  enabled: boolean;
  description: string;
}

export const languages: Language[] = [
  {
    id: 'edo',
    name: 'Edo',
    nativeName: 'Ẹ̀dó',
    region: 'West Africa',
    country: 'Nigeria',
    enabled: true,
    description: 'Edo is the language of the Edo people of southern Nigeria, with rich cultural heritage from the ancient Benin Kingdom.'
  },
  {
    id: 'yoruba',
    name: 'Yoruba',
    nativeName: 'Yorùbá',
    region: 'West Africa',
    country: 'Nigeria',
    enabled: false,
    description: 'One of the largest languages in Africa, spoken by over 40 million people.'
  },
  {
    id: 'igbo',
    name: 'Igbo',
    nativeName: 'Igbo',
    region: 'West Africa',
    country: 'Nigeria',
    enabled: false,
    description: 'A major Nigerian language with a rich literary tradition.'
  },
  {
    id: 'swahili',
    name: 'Swahili',
    nativeName: 'Kiswahili',
    region: 'East Africa',
    country: 'Multiple',
    enabled: false,
    description: 'A Bantu language spoken across East Africa by over 100 million people.'
  }
];

export const getLanguageById = (id: string): Language | undefined => {
  return languages.find(lang => lang.id === id);
};

export const getEnabledLanguages = (): Language[] => {
  return languages.filter(lang => lang.enabled);
};
