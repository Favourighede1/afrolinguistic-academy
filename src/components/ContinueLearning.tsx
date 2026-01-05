import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, RefreshCw, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLessonProgress } from '@/hooks/useLessonProgress';
import { usePracticeProgress } from '@/hooks/usePracticeProgress';
import { getLessonsByLanguage } from '@/data/lessons';
import { useLanguage } from '@/contexts/LanguageContext';

interface ContinueLearningProps {
  variant?: 'banner' | 'compact';
  className?: string;
}

export function ContinueLearning({ variant = 'banner', className }: ContinueLearningProps) {
  const { progress, getInProgressCount, getCompletedCount } = useLessonProgress();
  const { selectedLanguage } = useLanguage();
  const { stats, getDueCards } = usePracticeProgress(selectedLanguage.id);
  const lessons = getLessonsByLanguage(selectedLanguage.id);

  // Determine the best next action
  const inProgressCount = getInProgressCount();
  const completedCount = getCompletedCount();
  const hasStarted = inProgressCount > 0 || completedCount > 0;

  // Get all card IDs for checking due cards
  const allCardIds = lessons.flatMap(lesson => 
    lesson.vocabulary.map(v => v.id)
  );
  const dueCards = getDueCards(allCardIds);
  const hasDueReviews = dueCards.length > 0;

  // Find the next lesson to continue or start
  const getNextLesson = () => {
    // First, find any in-progress lesson
    const inProgressLessons = Object.values(progress)
      .filter(p => p.status === 'in-progress')
      .sort((a, b) => 
        new Date(b.lastAccessed || 0).getTime() - new Date(a.lastAccessed || 0).getTime()
      );
    
    if (inProgressLessons.length > 0) {
      const lessonId = inProgressLessons[0].lessonId;
      return lessons.find(l => l.id === lessonId);
    }

    // Otherwise, find the first lesson not completed
    for (const lesson of lessons) {
      const lessonProgress = progress[lesson.id];
      if (!lessonProgress || lessonProgress.status !== 'completed') {
        return lesson;
      }
    }

    // All completed - return first lesson
    return lessons[0];
  };

  const nextLesson = getNextLesson();

  // Determine CTA based on state
  let ctaLink = '/start-here';
  let ctaText = 'Start Learning';
  let ctaIcon = Play;
  let subtitle = `Begin your ${selectedLanguage.name} journey`;

  if (hasDueReviews) {
    ctaLink = '/practice';
    ctaText = `Review ${dueCards.length} Word${dueCards.length > 1 ? 's' : ''}`;
    ctaIcon = RefreshCw;
    subtitle = 'Keep your streak going!';
  } else if (hasStarted && nextLesson) {
    ctaLink = `/lessons/${nextLesson.id}`;
    ctaText = inProgressCount > 0 ? 'Continue Lesson' : 'Next Lesson';
    ctaIcon = BookOpen;
    subtitle = nextLesson.title;
  }

  const IconComponent = ctaIcon;

  if (variant === 'compact') {
    return (
      <div className={className}>
        <Button asChild className="gap-2">
          <Link to={ctaLink}>
            <IconComponent className="h-4 w-4" />
            {ctaText}
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <IconComponent className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium">{ctaText}</p>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        <Button asChild className="gap-2">
          <Link to={ctaLink}>
            Go
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
