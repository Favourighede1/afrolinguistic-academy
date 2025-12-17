import { Flame, Trophy, Calendar, Cloud } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PracticeStats as Stats } from '@/hooks/usePracticeProgress';

interface PracticeStatsProps {
  stats: Stats;
  dueCardsCount: number;
}

export const PracticeStats = ({ stats, dueCardsCount }: PracticeStatsProps) => {
  return (
    <section className="py-6 border-b border-border bg-card">
      <div className="container">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-center">
          <div className="flex items-center gap-2">
            <Flame className="h-6 w-6 text-primary" />
            <div>
              <p className="text-2xl font-bold">{stats.streak}</p>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-primary" />
            <div>
              <p className="text-2xl font-bold">{stats.wordsMastered}</p>
              <p className="text-xs text-muted-foreground">Words Mastered</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" />
            <div>
              <p className="text-2xl font-bold">{dueCardsCount}</p>
              <p className="text-xs text-muted-foreground">Due Today</p>
            </div>
          </div>
          <Badge variant="outline" className="flex items-center gap-1.5 py-1.5 px-3">
            <Cloud className="h-4 w-4" />
            <span className="text-sm">Sign in to sync across devices</span>
          </Badge>
        </div>
      </div>
    </section>
  );
};
