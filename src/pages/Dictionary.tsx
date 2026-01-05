import { useState, useMemo, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, RefreshCw, Brain } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/layout/Layout';
import { NextStepPanel } from '@/components/NextStepPanel';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { getAllDictionaryEntries, DictionaryEntry } from '@/data/dictionary';
import { useToast } from '@/hooks/use-toast';
import { useFavorites } from '@/hooks/useFavorites';
import { DictionaryFilters } from '@/components/dictionary/DictionaryFilters';
import { DictionaryEntryCard } from '@/components/dictionary/DictionaryEntryCard';
import { DictionaryEmptyState } from '@/components/dictionary/DictionaryEmptyState';

type SearchDirection = 'edo-english' | 'english-edo';

export default function Dictionary() {
  const { selectedLanguage } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchDirection, setSearchDirection] = useState<SearchDirection>('edo-english');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPartsOfSpeech, setSelectedPartsOfSpeech] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const { favoriteIds, toggleFavorite, isFavorite } = useFavorites(selectedLanguage.id);
  
  const entryRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const allEntries = getAllDictionaryEntries(selectedLanguage.id);

  const filteredEntries = useMemo(() => {
    let entries = allEntries;
    
    // Category filter
    if (selectedCategories.length > 0) {
      entries = entries.filter(entry => selectedCategories.includes(entry.category));
    }
    
    // Part of speech filter
    if (selectedPartsOfSpeech.length > 0) {
      entries = entries.filter(entry => {
        const entryPos = entry.partOfSpeech.toLowerCase();
        return selectedPartsOfSpeech.some(pos => entryPos.includes(pos));
      });
    }

    // Favorites filter
    if (showFavoritesOnly && user) {
      entries = entries.filter(entry => favoriteIds.has(entry.id));
    }
    
    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      entries = entries.filter(entry => {
        if (searchDirection === 'edo-english') {
          // Search Edo words first, then meanings
          return (
            entry.word.toLowerCase().includes(query) ||
            entry.pronunciation.toLowerCase().includes(query) ||
            entry.example.toLowerCase().includes(query)
          );
        } else {
          // English to Edo: search meanings and translations first
          return (
            entry.meaning.toLowerCase().includes(query) ||
            entry.exampleTranslation.toLowerCase().includes(query)
          );
        }
      });
    }
    
    return entries;
  }, [allEntries, searchQuery, searchDirection, selectedCategories, selectedPartsOfSpeech, showFavoritesOnly, user, favoriteIds]);

  const handleToggleFavorite = useCallback(async (entry: DictionaryEntry) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Sign in to save favorites.",
      });
      return;
    }

    const success = await toggleFavorite(entry.id);
    if (success) {
      const wasFavorite = isFavorite(entry.id);
      toast({
        title: wasFavorite ? "Removed from Favorites" : "Added to Favorites",
        description: wasFavorite 
          ? `"${entry.word}" removed from your favorites.`
          : `"${entry.word}" saved to your favorites.`,
      });
    }
  }, [user, toggleFavorite, isFavorite, toast]);

  const handleRelatedWordClick = useCallback((word: string) => {
    // Find the entry with this word
    const entry = allEntries.find(e => e.word === word);
    if (entry) {
      const element = entryRefs.current.get(entry.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('ring-2', 'ring-primary');
        setTimeout(() => {
          element.classList.remove('ring-2', 'ring-primary');
        }, 2000);
      }
    } else {
      // Search for it
      setSearchQuery(word);
    }
  }, [allEntries]);

  const handleAddToFlashcards = useCallback((entry: DictionaryEntry) => {
    toast({
      title: "Coming Soon",
      description: "Flashcard feature is coming soon! Stay tuned.",
    });
  }, [toast]);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedPartsOfSpeech([]);
    setShowFavoritesOnly(false);
  }, []);

  const setEntryRef = useCallback((id: string) => (el: HTMLDivElement | null) => {
    if (el) {
      entryRefs.current.set(id, el);
    } else {
      entryRefs.current.delete(id);
    }
  }, []);

  return (
    <Layout>
      {/* Header */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 via-background to-accent/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            {/* Language indicator */}
            <div className="inline-flex items-center gap-2 bg-secondary/50 rounded-full px-3 py-1 mb-4">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Language: {selectedLanguage.name}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-4">
              {selectedLanguage.name} Dictionary
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Explore {allEntries.length} words and phrases. Find meanings, examples, and pronunciation.
            </p>
            
            {/* Filters */}
            <DictionaryFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              searchDirection={searchDirection}
              onSearchDirectionChange={setSearchDirection}
              selectedCategories={selectedCategories}
              onCategoriesChange={setSelectedCategories}
              selectedPartsOfSpeech={selectedPartsOfSpeech}
              onPartsOfSpeechChange={setSelectedPartsOfSpeech}
              showFavoritesOnly={showFavoritesOnly}
              onShowFavoritesOnlyChange={setShowFavoritesOnly}
              isAuthenticated={!!user}
              languageName={selectedLanguage.name}
            />
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-8">
        <div className="container">
          {/* Entry count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              {filteredEntries.length} {filteredEntries.length === 1 ? 'entry' : 'entries'} found ({selectedLanguage.name})
            </p>
            {(searchQuery || selectedCategories.length > 0 || selectedPartsOfSpeech.length > 0 || showFavoritesOnly) && (
              <Badge 
                variant="outline" 
                className="cursor-pointer hover:bg-secondary"
                onClick={clearFilters}
              >
                Clear all
              </Badge>
            )}
          </div>

          {filteredEntries.length > 0 ? (
            <div className="grid gap-4">
              {filteredEntries.map((entry) => (
                <DictionaryEntryCard
                  key={entry.id}
                  ref={setEntryRef(entry.id)}
                  entry={entry}
                  isFavorite={isFavorite(entry.id)}
                  isAuthenticated={!!user}
                  onToggleFavorite={handleToggleFavorite}
                  onRelatedWordClick={handleRelatedWordClick}
                  onAddToFlashcards={handleAddToFlashcards}
                />
              ))}
            </div>
          ) : (
            <DictionaryEmptyState
              searchQuery={searchQuery}
              onClearSearch={clearFilters}
            />
          )}

          {/* Next Steps Panel */}
          {filteredEntries.length > 0 && (
            <NextStepPanel
              className="mt-8"
              title="Practice These Words"
              description="Turn dictionary lookups into lasting knowledge."
              actions={[
                {
                  label: 'Review with Flashcards',
                  href: '/practice',
                  icon: RefreshCw
                },
                {
                  label: 'Take a Quiz',
                  href: '/practice',
                  icon: Brain,
                  variant: 'outline'
                }
              ]}
            />
          )}
        </div>
      </section>
    </Layout>
  );
}
