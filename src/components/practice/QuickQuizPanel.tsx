import { useState } from 'react';
import { Brain, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export type QuizType = 'vocabulary' | 'translation' | 'listening';
export type QuizDifficulty = 'beginner' | 'intermediate';

interface QuickQuizPanelProps {
  onStart: (settings: { quizType: QuizType; difficulty: QuizDifficulty; questionCount: number }) => void;
  hasBeginnerContent: boolean;
  hasIntermediateContent: boolean;
}

const QUESTION_COUNT_OPTIONS = [5, 10, 20] as const;

export const QuickQuizPanel = ({ 
  onStart, 
  hasBeginnerContent, 
  hasIntermediateContent 
}: QuickQuizPanelProps) => {
  const [quizType, setQuizType] = useState<QuizType>('vocabulary');
  const [difficulty, setDifficulty] = useState<QuizDifficulty>('beginner');
  const [questionCount, setQuestionCount] = useState<number>(10);

  const quizTypes = [
    { value: 'vocabulary', label: 'Vocabulary', description: 'Match words with meanings', disabled: false, icon: null },
    { value: 'translation', label: 'Translation', description: 'Translate sentences', disabled: false, icon: null },
    { value: 'listening', label: 'Listening', description: 'Identify spoken words', disabled: true, icon: <Headphones className="h-3 w-3" /> }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Quick Quiz
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Test your knowledge with interactive quizzes
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quiz Type */}
        <div className="space-y-2">
          <Label>Quiz Type</Label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {quizTypes.map((type) => (
              <Button
                key={type.value}
                variant={quizType === type.value ? 'default' : 'outline'}
                className={cn(
                  "h-auto py-2 px-3 justify-start",
                  type.disabled && "opacity-60"
                )}
                disabled={type.disabled}
                onClick={() => setQuizType(type.value as QuizType)}
              >
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    {type.icon}
                    <span className="font-medium">{type.label}</span>
                    {type.disabled && (
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0 ml-1">
                        Soon
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs opacity-70 font-normal">{type.description}</p>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Question Count */}
        <div className="space-y-2">
          <Label>Question Count</Label>
          <div className="flex gap-2">
            {QUESTION_COUNT_OPTIONS.map((count) => (
              <Button
                key={count}
                variant={questionCount === count ? 'default' : 'outline'}
                size="sm"
                onClick={() => setQuestionCount(count)}
                className="flex-1"
              >
                {count}
              </Button>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div className="space-y-2">
          <Label htmlFor="difficulty">Difficulty</Label>
          <Select 
            value={difficulty} 
            onValueChange={(v) => setDifficulty(v as QuizDifficulty)}
          >
            <SelectTrigger id="difficulty" className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner" disabled={!hasBeginnerContent}>
                Beginner
              </SelectItem>
              <SelectItem value="intermediate" disabled={!hasIntermediateContent}>
                Intermediate
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          className="w-full sm:w-auto"
          onClick={() => onStart({ quizType, difficulty, questionCount })}
        >
          Start Quiz
        </Button>
      </CardContent>
    </Card>
  );
};
