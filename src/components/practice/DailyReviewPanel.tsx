import { useState, useEffect } from 'react';
import { RotateCcw, Clock, Settings2, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface DailyReviewPanelProps {
  dueCardsCount: number;
  onStart: (settings: { cardCount: number; includeAudio: boolean }) => void;
}

const CARD_COUNT_OPTIONS = [10, 20, 30] as const;
const STREAK_KEY = 'afrolinguistic_practice_streak';

export const DailyReviewPanel = ({ dueCardsCount, onStart }: DailyReviewPanelProps) => {
  const [showSettings, setShowSettings] = useState(false);
  const [cardCount, setCardCount] = useState<number>(10);
  const [includeAudio, setIncludeAudio] = useState(false);

  const estimatedMinutes = Math.ceil(Math.min(dueCardsCount, cardCount) * 0.5);

  const handleStart = () => {
    // Check if this is a new day practice
    const lastPractice = localStorage.getItem(`${STREAK_KEY}_last`);
    const today = new Date().toDateString();
    
    if (lastPractice !== today) {
      localStorage.setItem(`${STREAK_KEY}_last`, today);
      toast.success('🔥 Streak kept! Great job practicing today.');
    }
    
    onStart({ cardCount, includeAudio });
  };

  return (
    <Card className="bg-gradient-to-br from-primary/10 via-background to-accent/5 border-primary/20">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
              <RotateCcw className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif mb-1">Daily Review</h2>
              <p className="text-muted-foreground text-sm mb-2">
                Spaced repetition helps you remember words long-term. Review a little each day for best results.
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">
                  {dueCardsCount} cards due
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  ~{estimatedMinutes} min
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <Button 
              size="lg" 
              onClick={handleStart}
              disabled={dueCardsCount === 0}
              className="whitespace-nowrap"
            >
              Start Daily Review
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
              className="text-muted-foreground"
            >
              <Settings2 className="h-4 w-4 mr-1" />
              Settings
            </Button>
          </div>
        </div>

        {showSettings && (
          <div className="mt-6 pt-6 border-t border-border">
            <div className="space-y-4 max-w-md">
              {/* Cards per session with preset buttons */}
              <div className="space-y-2">
                <Label>Cards per session</Label>
                <div className="flex gap-2">
                  {CARD_COUNT_OPTIONS.map((count) => (
                    <Button
                      key={count}
                      variant={cardCount === count ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCardCount(count)}
                      className="flex-1"
                    >
                      {count}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Include audio toggle */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="include-audio" className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4" />
                    Include audio
                  </Label>
                  <Switch 
                    id="include-audio" 
                    checked={includeAudio} 
                    onCheckedChange={setIncludeAudio}
                    disabled
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Audio coming soon. We're recording native pronunciations.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
