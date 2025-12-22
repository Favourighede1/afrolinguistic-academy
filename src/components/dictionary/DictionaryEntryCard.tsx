import { forwardRef } from 'react';
import { Heart, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AudioButton } from '@/components/AudioButton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { DictionaryEntry } from '@/data/dictionary';

interface DictionaryEntryCardProps {
  entry: DictionaryEntry;
  isFavorite: boolean;
  isAuthenticated: boolean;
  onToggleFavorite: (entry: DictionaryEntry) => void;
  onRelatedWordClick: (word: string) => void;
  onAddToFlashcards: (entry: DictionaryEntry) => void;
}

export const DictionaryEntryCard = forwardRef<HTMLDivElement, DictionaryEntryCardProps>(
  function DictionaryEntryCard(
    { entry, isFavorite, isAuthenticated, onToggleFavorite, onRelatedWordClick, onAddToFlashcards },
    ref
  ) {
    const hasAudio = Boolean(entry.audioUrl);

    return (
      <Card ref={ref} className="overflow-hidden" id={`entry-${entry.id}`}>
        <CardContent className="p-0">
          <div className="p-4 md:p-5">
            {/* Top row: headword, part of speech, category */}
            <div className="flex flex-wrap items-start gap-2 mb-2">
              <h3 className="text-xl md:text-2xl font-bold text-foreground">{entry.word}</h3>
              <Badge variant="secondary" className="text-xs capitalize">
                {entry.partOfSpeech}
              </Badge>
              <Badge variant="outline" className="text-xs capitalize">
                {entry.category}
              </Badge>
            </div>

            {/* Pronunciation */}
            <p className="text-sm text-muted-foreground mb-3 font-mono">
              /{entry.pronunciation}/
            </p>

            {/* Meaning */}
            <p className="font-medium text-foreground mb-4">
              {entry.meaning}
            </p>

            {/* Example */}
            <div className="bg-secondary/30 rounded-md p-3 mb-4">
              <p className="text-sm font-medium text-foreground">{entry.example}</p>
              <p className="text-sm text-muted-foreground mt-1">{entry.exampleTranslation}</p>
            </div>

            {/* Related words as chips */}
            {entry.relatedWords.length > 0 && (
              <div className="mb-4">
                <span className="text-xs text-muted-foreground mr-2">Related:</span>
                <div className="inline-flex flex-wrap gap-1 mt-1">
                  {entry.relatedWords.map((word) => (
                    <Badge
                      key={word}
                      variant="outline"
                      className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => onRelatedWordClick(word)}
                    >
                      {word}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Footer actions */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border">
              {/* Audio button - AudioButton component handles disabled state internally */}
              <AudioButton audioUrl={entry.audioUrl} size="sm" />

              {/* Add to flashcards */}
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={() => onAddToFlashcards(entry)}
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Add to flashcards</span>
                <span className="sm:hidden">Flashcard</span>
              </Button>

              {/* Favorite button */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onToggleFavorite(entry)}
                      className={isFavorite ? 'text-destructive' : 'text-muted-foreground hover:text-destructive'}
                    >
                      <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                    </Button>
                  </TooltipTrigger>
                  {!isAuthenticated && (
                    <TooltipContent>
                      <p>Sign in to save favorites</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);
