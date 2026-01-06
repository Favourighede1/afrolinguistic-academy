import { useMemo } from 'react';
import { Sparkles, Volume2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DictionaryEntry } from '@/data/dictionary';

interface WordOfTheDayProps {
  entries: DictionaryEntry[];
}

export function WordOfTheDay({ entries }: WordOfTheDayProps) {
  // Get a consistent word based on the date
  const wordOfTheDay = useMemo(() => {
    if (entries.length === 0) return null;
    
    // Use date as seed for consistent daily selection
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const index = seed % entries.length;
    
    return entries[index];
  }, [entries]);

  if (!wordOfTheDay) return null;

  return (
    <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 border-primary/20 mb-8">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <Badge variant="secondary" className="mb-1">Word of the Day</Badge>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl md:text-3xl font-bold font-serif text-foreground">
                  {wordOfTheDay.word}
                </h2>
                <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                  <span className="sr-only">Play pronunciation</span>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground italic">
                /{wordOfTheDay.pronunciation}/
              </p>
            </div>
          </div>
          
          <div className="flex-1 md:text-right">
            <p className="text-lg font-medium text-foreground mb-1">
              {wordOfTheDay.meaning}
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">{wordOfTheDay.partOfSpeech}</span> · {wordOfTheDay.category}
            </p>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border/50">
          <p className="text-sm">
            <span className="font-medium text-foreground">Example: </span>
            <span className="text-muted-foreground italic">{wordOfTheDay.example}</span>
            <span className="text-muted-foreground"> — "{wordOfTheDay.exampleTranslation}"</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
