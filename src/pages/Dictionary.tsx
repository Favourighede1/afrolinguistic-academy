import { useState, useMemo } from 'react';
import { Search, Heart, Volume2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Layout } from '@/components/layout/Layout';
import { AudioButton } from '@/components/AudioButton';
import { useLanguage } from '@/contexts/LanguageContext';
import { getAllDictionaryEntries, DictionaryEntry } from '@/data/dictionary';
import { useToast } from '@/hooks/use-toast';

const categories = ['all', 'greetings', 'family', 'food', 'travel'];

export default function Dictionary() {
  const { selectedLanguage } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();

  const allEntries = getAllDictionaryEntries(selectedLanguage.id);

  const filteredEntries = useMemo(() => {
    let entries = allEntries;
    
    if (selectedCategory !== 'all') {
      entries = entries.filter(entry => entry.category === selectedCategory);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      entries = entries.filter(entry =>
        entry.word.toLowerCase().includes(query) ||
        entry.meaning.toLowerCase().includes(query) ||
        entry.example.toLowerCase().includes(query)
      );
    }
    
    return entries;
  }, [allEntries, searchQuery, selectedCategory]);

  const handleFavorite = (entry: DictionaryEntry) => {
    toast({
      title: "Added to Favorites",
      description: "Sign in to save favorites permanently.",
    });
  };

  return (
    <Layout>
      {/* Header */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 via-background to-accent/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-4">
              {selectedLanguage.name} Dictionary
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Search {allEntries.length} words and phrases. Find meanings, examples, and pronunciation.
            </p>
            
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={`Search ${selectedLanguage.name} or English...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-4 border-b border-border bg-card sticky top-16 z-40">
        <div className="container">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="w-full justify-start overflow-x-auto">
              {categories.map((cat) => (
                <TabsTrigger key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Results */}
      <section className="py-8">
        <div className="container">
          <p className="text-sm text-muted-foreground mb-6">
            {filteredEntries.length} {filteredEntries.length === 1 ? 'entry' : 'entries'} found
          </p>

          {filteredEntries.length > 0 ? (
            <div className="grid gap-4">
              {filteredEntries.map((entry) => (
                <Card key={entry.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex">
                      {/* Main Content */}
                      <div className="flex-1 p-4">
                        <div className="flex flex-wrap items-start gap-3 mb-3">
                          <div>
                            <div className="flex items-baseline gap-2 flex-wrap">
                              <span className="text-xl font-bold">{entry.word}</span>
                              <span className="text-sm text-muted-foreground">
                                [{entry.pronunciation}]
                              </span>
                            </div>
                            <Badge variant="outline" className="mt-1 text-xs">
                              {entry.partOfSpeech}
                            </Badge>
                          </div>
                          <AudioButton audioUrl={entry.audioUrl} size="sm" />
                        </div>
                        
                        <p className="font-medium text-foreground mb-3">
                          {entry.meaning}
                        </p>
                        
                        <div className="bg-secondary/30 rounded-md p-3 mb-3">
                          <p className="text-sm font-medium">{entry.example}</p>
                          <p className="text-sm text-muted-foreground">{entry.exampleTranslation}</p>
                        </div>

                        {entry.relatedWords.length > 0 && (
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs text-muted-foreground">Related:</span>
                            {entry.relatedWords.map((word) => (
                              <Badge key={word} variant="secondary" className="text-xs">
                                {word}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Favorite Button */}
                      <div className="p-4 border-l border-border flex items-start">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleFavorite(entry)}
                          className="text-muted-foreground hover:text-primary"
                        >
                          <Heart className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                No entries found for "{searchQuery}"
              </p>
              <Button variant="outline" onClick={() => setSearchQuery('')}>
                Clear search
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
