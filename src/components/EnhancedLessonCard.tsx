import { Link } from 'react-router-dom';
import { Clock, Target, BookOpen, ArrowRight, CheckCircle2, PlayCircle, Circle } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lesson } from '@/data/lessons';
import { LessonStatus } from '@/hooks/useLessonProgress';

interface EnhancedLessonCardProps {
  lesson: Lesson;
  lessonNumber: number;
  status: LessonStatus;
  isFirstLesson?: boolean;
  onStartLesson?: () => void;
}

export function EnhancedLessonCard({ 
  lesson, 
  lessonNumber, 
  status, 
  isFirstLesson = false,
  onStartLesson 
}: EnhancedLessonCardProps) {
  const levelColors = {
    beginner: 'bg-accent text-accent-foreground',
    intermediate: 'bg-primary/10 text-primary',
    advanced: 'bg-secondary text-secondary-foreground'
  };

  const statusConfig = {
    'not-started': {
      label: 'Not started',
      icon: Circle,
      className: 'bg-muted text-muted-foreground'
    },
    'in-progress': {
      label: 'In progress',
      icon: PlayCircle,
      className: 'bg-primary/10 text-primary'
    },
    'completed': {
      label: 'Completed',
      icon: CheckCircle2,
      className: 'bg-accent text-accent-foreground'
    }
  };

  const StatusIcon = statusConfig[status].icon;

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onStartLesson) onStartLesson();
    window.location.href = `/lessons/${lesson.id}`;
  };

  return (
    <Card className="h-full hover:shadow-md transition-shadow group border-border/50 hover:border-primary/30">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground bg-muted px-2 py-1 rounded">
              Lesson {lessonNumber}
            </span>
            {isFirstLesson && (
              <Badge variant="outline" className="text-xs border-primary/50 text-primary">
                Start here
              </Badge>
            )}
          </div>
          <Badge className={statusConfig[status].className} variant="secondary">
            <StatusIcon className="h-3 w-3 mr-1" />
            {statusConfig[status].label}
          </Badge>
        </div>
        
        <Link to={`/lessons/${lesson.id}`} className="block">
          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
            {lesson.title}
          </h3>
        </Link>
        
        <div className="flex items-center gap-3 mt-2">
          <Badge className={levelColors[lesson.level]} variant="secondary">
            {lesson.level.charAt(0).toUpperCase() + lesson.level.slice(1)}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            {lesson.estimatedMinutes} min
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {lesson.description}
        </p>
        
        {/* Stats row */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Target className="h-3.5 w-3.5" />
            <span>{lesson.objectives.length} objectives</span>
          </div>
          <span className="text-border">·</span>
          <div className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            <span>{lesson.vocabulary.length} vocab</span>
          </div>
        </div>
        
        {/* Skills chips */}
        <div className="flex flex-wrap gap-1.5">
          {lesson.skills.map((skill) => (
            <Badge 
              key={skill} 
              variant="outline" 
              className="text-xs capitalize bg-background"
            >
              {skill}
            </Badge>
          ))}
        </div>
        
        {/* CTA Button */}
        <Button 
          onClick={handleButtonClick}
          className="w-full mt-2 group/btn"
          variant={status === 'completed' ? 'outline' : 'default'}
        >
          {status === 'completed' ? 'Review lesson' : status === 'in-progress' ? 'Continue lesson' : 'Start lesson'}
          <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
}
