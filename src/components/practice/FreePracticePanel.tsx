import { Layers, BookOpen, Tag, AlertCircle, Heart, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lesson } from '@/data/lessons';

type DeckType = 'mixed' | 'lesson' | 'topic' | 'hard' | 'favorites';

interface DeckOption {
  id: string;
  type: DeckType;
  label: string;
  description?: string;
  cardCount: number;
  lessonId?: string;
  topic?: string;
  disabled?: boolean;
  requiresAuth?: boolean;
}

interface FreePracticePanelProps {
  lessons: Lesson[];
  hardCardsCount: number;
  totalCardsCount: number;
  onSelectDeck: (deck: DeckOption) => void;
}

export const FreePracticePanel = ({ 
  lessons, 
  hardCardsCount, 
  totalCardsCount,
  onSelectDeck 
}: FreePracticePanelProps) => {
  // Get unique topics
  const topics = [...new Set(lessons.map(l => l.topic))];
  
  const deckOptions: DeckOption[] = [
    {
      id: 'mixed',
      type: 'mixed',
      label: 'Mixed Vocabulary',
      description: 'All words from all lessons',
      cardCount: totalCardsCount
    },
    ...lessons.map((lesson, idx) => ({
      id: `lesson-${lesson.id}`,
      type: 'lesson' as DeckType,
      label: `Lesson ${idx + 1}: ${lesson.title.replace(/^.+: /, '').replace(' in Edo', '')}`,
      cardCount: lesson.vocabulary.length,
      lessonId: lesson.id
    })),
    ...topics.map(topic => {
      const topicLessons = lessons.filter(l => l.topic === topic);
      const cardCount = topicLessons.reduce((acc, l) => acc + l.vocabulary.length, 0);
      return {
        id: `topic-${topic}`,
        type: 'topic' as DeckType,
        label: topic.charAt(0).toUpperCase() + topic.slice(1),
        cardCount,
        topic
      };
    }),
    {
      id: 'hard',
      type: 'hard',
      label: 'Hard Words',
      description: 'Words you often get wrong',
      cardCount: hardCardsCount,
      disabled: hardCardsCount === 0
    },
    {
      id: 'favorites',
      type: 'favorites',
      label: 'Favorites',
      description: 'Sign in to save favorites',
      cardCount: 0,
      disabled: true,
      requiresAuth: true
    }
  ];

  const getIcon = (type: DeckType, requiresAuth?: boolean) => {
    if (requiresAuth) return <Lock className="h-4 w-4" />;
    switch (type) {
      case 'mixed': return <Layers className="h-4 w-4" />;
      case 'lesson': return <BookOpen className="h-4 w-4" />;
      case 'topic': return <Tag className="h-4 w-4" />;
      case 'hard': return <AlertCircle className="h-4 w-4" />;
      case 'favorites': return <Heart className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-primary" />
          Free Practice
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Choose a deck to practice at your own pace
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {deckOptions.map((deck) => (
            <Button
              key={deck.id}
              variant="outline"
              className="h-auto py-3 px-4 justify-start text-left"
              disabled={deck.disabled}
              onClick={() => onSelectDeck(deck)}
            >
              <div className="flex items-start gap-3 w-full">
                <div className="mt-0.5 text-muted-foreground">
                  {getIcon(deck.type, deck.requiresAuth)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{deck.label}</p>
                  {deck.description && (
                    <p className="text-xs text-muted-foreground truncate">{deck.description}</p>
                  )}
                </div>
                <Badge variant="secondary" className="shrink-0">
                  {deck.cardCount}
                </Badge>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export type { DeckOption };
