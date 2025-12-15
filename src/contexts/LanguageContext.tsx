import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, languages, getLanguageById } from '@/data/languages';

interface LanguageContextType {
  selectedLanguage: Language;
  setSelectedLanguageId: (id: string) => void;
  availableLanguages: Language[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'afrolinguistic-learning-language';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [selectedLanguageId, setSelectedLanguageIdState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && getLanguageById(stored)) {
        return stored;
      }
    }
    return 'edo';
  });

  const selectedLanguage = getLanguageById(selectedLanguageId) || languages[0];

  const setSelectedLanguageId = (id: string) => {
    const lang = getLanguageById(id);
    if (lang && lang.enabled) {
      setSelectedLanguageIdState(id);
      localStorage.setItem(STORAGE_KEY, id);
    }
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, selectedLanguageId);
  }, [selectedLanguageId]);

  return (
    <LanguageContext.Provider
      value={{
        selectedLanguage,
        setSelectedLanguageId,
        availableLanguages: languages
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
