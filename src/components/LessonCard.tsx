import { Link } from 'react-router-dom';
import { Clock, BookOpen, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lesson } from '@/data/lessons';

interface LessonCardProps {
  lesson: Lesson;
}

export function LessonCard({ lesson }: LessonCardProps) {
  const levelColors = {
    beginner: 'bg-accent text-accent-foreground',
    intermediate: 'bg-primary/10 text-primary',
    advanced: 'bg-secondary text-secondary-foreground'
  };

  return (
    <Link to={`/lessons/${lesson.id}`}>
      <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <Badge className={levelColors[lesson.level]} variant="secondary">
              {lesson.level.charAt(0).toUpperCase() + lesson.level.slice(1)}
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              {lesson.estimatedMinutes} min
            </div>
          </div>
          <CardTitle className="text-lg group-hover:text-primary transition-colors mt-2">
            {lesson.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground mb-4">
            {lesson.description}
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Target className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">
                {lesson.objectives.length} learning objectives
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">
                {lesson.vocabulary.length} vocabulary words
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mt-4">
            {lesson.skills.map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
