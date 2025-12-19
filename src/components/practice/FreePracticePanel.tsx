import { useState, useMemo } from 'react';
import { Layers, BookOpen, Tag, AlertCircle, Heart, Lock, Search, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lesson } from '@/data/lessons';
import { useAuth } from '@/contexts/AuthContext';

type DeckType = 'mixed' | 'lesson' | 'topic' | 'hard' | 'favorites';
type FilterType = 'all' | 'lesson' | 'topic';

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
  recentlyPracticed: string[];
  onSelectDeck: (deck: DeckOption) => void;
  onSignInClick?: () => void;
}

export const FreePracticePanel = ({ 
  lessons, 
  hardCardsCount, 
  totalCardsCount,
  recentlyPracticed,
  onSelectDeck,
  onSignInClick
}: FreePracticePanelProps) => {
  const { user } = useAuth();
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Get unique topics
  const topics = [...new Set(lessons.map(l => l.topic))];
  
  // Build deck options
  const allDeckOptions: DeckOption[] = useMemo(() => [
    {
      id: 'mixed',
      type: 'mixed' as DeckType,
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
        description: `${topicLessons.length} lesson${topicLessons.length > 1 ? 's' : ''}`,
        cardCount,
        topic
      };
    }),
    {
      id: 'hard',
      type: 'hard' as DeckType,
      label: 'Hard Words',
      description: hardCardsCount === 0 
        ? 'No hard words yet—finish a lesson and practice to build this list.' 
        : 'Words you often get wrong',
      cardCount: hardCardsCount,
      disabled: hardCardsCount === 0
    },
    {
      id: 'favorites',
      type: 'favorites' as DeckType,
      label: 'Favorites',
      description: user ? 'Your saved words' : 'Sign in to save favorites',
      cardCount: 0,
      disabled: !user,
      requiresAuth: !user
    }
  ], [lessons, topics, totalCardsCount, hardCardsCount, user]);

  // Filter decks based on current filter and search
  const filteredDecks = useMemo(() => {
    let decks = allDeckOptions;
    
    // Apply filter
    if (filter === 'lesson') {
      decks = decks.filter(d => d.type === 'lesson' || d.type === 'mixed');
    } else if (filter === 'topic') {
      decks = decks.filter(d => d.type === 'topic' || d.type === 'mixed');
    }
    
    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      decks = decks.filter(d => 
        d.label.toLowerCase().includes(query) || 
        d.description?.toLowerCase().includes(query)
      );
    }
    
    return decks;
  }, [allDeckOptions, filter, searchQuery]);

  // Get recently practiced decks
  const recentDecks = useMemo(() => {
    return recentlyPracticed
      .slice(0, 3)
      .map(id => allDeckOptions.find(d => d.id === id))
      .filter(Boolean) as DeckOption[];
  }, [recentlyPracticed, allDeckOptions]);

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

  const renderDeckButton = (deck: DeckOption) => (
    <Button
      key={deck.id}
      variant="outline"
      className="h-auto py-3 px-4 justify-start text-left overflow-hidden"
      disabled={deck.disabled}
      onClick={() => {
        if (deck.requiresAuth && onSignInClick) {
          onSignInClick();
        } else {
          onSelectDeck(deck);
        }
      }}
      title={deck.label}
    >
      <div className="flex items-start gap-3 w-full min-w-0">
        <div className="mt-0.5 text-muted-foreground shrink-0">
          {getIcon(deck.type, deck.requiresAuth)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm truncate">{deck.label}</p>
          {deck.description && (
            <p className="text-xs text-muted-foreground line-clamp-2">{deck.description}</p>
          )}
        </div>
        <Badge variant="secondary" className="shrink-0 text-xs">
          {deck.cardCount}
        </Badge>
      </div>
    </Button>
  );

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-primary" />
          Free Practice
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Choose a deck to practice at your own pace
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Recently Practiced */}
        {recentDecks.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Recently practiced</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentDecks.map((deck) => (
                <Button
                  key={`recent-${deck.id}`}
                  variant="secondary"
                  size="sm"
                  className="h-auto py-1.5 max-w-[200px]"
                  onClick={() => onSelectDeck(deck)}
                  title={deck.label}
                >
                  <span className="shrink-0">{getIcon(deck.type)}</span>
                  <span className="ml-1.5 truncate">{deck.label}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search decks or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterType)}>
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">All decks</TabsTrigger>
              <TabsTrigger value="lesson" className="flex-1">By lesson</TabsTrigger>
              <TabsTrigger value="topic" className="flex-1">By topic</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Deck Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {filteredDecks.map(renderDeckButton)}
        </div>

        {filteredDecks.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No decks found matching "{searchQuery}"
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export type { DeckOption };
