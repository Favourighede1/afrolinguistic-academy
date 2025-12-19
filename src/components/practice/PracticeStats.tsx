import { Flame, Trophy, Calendar, CheckCircle, Cloud } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PracticeStats as Stats } from '@/hooks/usePracticeProgress';
import { useAuth } from '@/contexts/AuthContext';

interface PracticeStatsProps {
  stats: Stats;
  dueCardsCount: number;
}

export const PracticeStats = ({ stats, dueCardsCount }: PracticeStatsProps) => {
  const { user } = useAuth();
  
  // Calculate estimated time (30 seconds per card)
  const estimatedMinutes = Math.ceil(Math.min(dueCardsCount, 10) * 0.5);
  const cardGoal = Math.min(dueCardsCount, 10);

  return (
    <section className="py-6 border-b border-border bg-card">
      <div className="container">
        <div className="flex flex-col gap-4">
          {/* Stats Row */}
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
          </div>
          
          {/* Today's Plan + Sync Status */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
            {dueCardsCount > 0 ? (
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Today's plan:</span>{' '}
                review {cardGoal} cards (~{estimatedMinutes} min)
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">You're all caught up!</span>{' '}
                Try free practice to learn new words.
              </p>
            )}
            
            {user ? (
              <Badge variant="outline" className="flex items-center gap-1.5 py-1.5 px-3 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-sm text-green-700 dark:text-green-300">Synced across devices</span>
              </Badge>
            ) : (
              <Badge variant="outline" className="flex items-center gap-1.5 py-1.5 px-3">
                <Cloud className="h-4 w-4" />
                <span className="text-sm">Sign in to sync across devices</span>
              </Badge>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
