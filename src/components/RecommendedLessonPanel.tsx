import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Clock, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lesson } from '@/data/lessons';
import { LessonStatus } from '@/hooks/useLessonProgress';

interface RecommendedLessonPanelProps {
  lesson: Lesson;
  lessonNumber: number;
  hasProgress: boolean;
  status: LessonStatus;
  completedCount: number;
  totalLessons: number;
  onStartLesson?: () => void;
}

export function RecommendedLessonPanel({
  lesson,
  lessonNumber,
  hasProgress,
  status,
  completedCount,
  totalLessons,
  onStartLesson
}: RecommendedLessonPanelProps) {
  const handleClick = () => {
    if (onStartLesson) onStartLesson();
  };

  return (
    <Card className="border-primary/30 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">
                {hasProgress ? 'Continue your learning path' : 'Start your learning journey'}
              </span>
            </div>
            
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                Recommended next · Lesson {lessonNumber}
              </p>
              <h3 className="text-xl font-bold font-serif">{lesson.title}</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-lg">
                {lesson.description}
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{lesson.estimatedMinutes} min</span>
              </div>
              <span className="text-border">·</span>
              <div className="flex items-center gap-1">
                <Target className="h-4 w-4" />
                <span>{lesson.objectives.length} objectives</span>
              </div>
              <span className="text-border">·</span>
              <Badge variant="outline" className="capitalize">
                {lesson.level}
              </Badge>
            </div>
          </div>
          
          <div className="flex flex-col items-start lg:items-end gap-3">
            <div className="text-sm text-muted-foreground">
              {completedCount} of {totalLessons} lessons completed
            </div>
            <Link to={`/lessons/${lesson.id}`} onClick={handleClick}>
              <Button size="lg" className="gap-2">
                {status === 'in-progress' ? 'Continue' : 'Start'}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
