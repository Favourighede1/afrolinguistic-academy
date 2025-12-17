import { useState } from 'react';
import { RotateCcw, Clock, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface DailyReviewPanelProps {
  dueCardsCount: number;
  onStart: (settings: { cardCount: number; includeAudio: boolean }) => void;
}

export const DailyReviewPanel = ({ dueCardsCount, onStart }: DailyReviewPanelProps) => {
  const [showSettings, setShowSettings] = useState(false);
  const [cardCount, setCardCount] = useState(10);
  const [includeAudio, setIncludeAudio] = useState(false);

  const estimatedMinutes = Math.ceil(Math.min(dueCardsCount, cardCount) * 0.5);

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
              onClick={() => onStart({ cardCount, includeAudio })}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
              <div className="space-y-2">
                <Label htmlFor="card-count">Cards per session</Label>
                <Select value={cardCount.toString()} onValueChange={(v) => setCardCount(parseInt(v))}>
                  <SelectTrigger id="card-count">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 cards</SelectItem>
                    <SelectItem value="20">20 cards</SelectItem>
                    <SelectItem value="30">30 cards</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="include-audio">Include audio</Label>
                <div className="flex items-center gap-2">
                  <Switch 
                    id="include-audio" 
                    checked={includeAudio} 
                    onCheckedChange={setIncludeAudio}
                    disabled
                  />
                  <span className="text-xs text-muted-foreground">Coming soon</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
