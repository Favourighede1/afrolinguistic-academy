import { useState } from 'react';
import { Brain, Volume2 } from 'lucide-react';
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

export type QuizType = 'vocabulary' | 'translation' | 'listening';
export type QuizDifficulty = 'beginner' | 'intermediate';

interface QuickQuizPanelProps {
  onStart: (settings: { quizType: QuizType; difficulty: QuizDifficulty }) => void;
  hasBeginnerContent: boolean;
  hasIntermediateContent: boolean;
}

export const QuickQuizPanel = ({ 
  onStart, 
  hasBeginnerContent, 
  hasIntermediateContent 
}: QuickQuizPanelProps) => {
  const [quizType, setQuizType] = useState<QuizType>('vocabulary');
  const [difficulty, setDifficulty] = useState<QuizDifficulty>('beginner');

  const quizTypes = [
    { value: 'vocabulary', label: 'Vocabulary', description: 'Match words with meanings', disabled: false },
    { value: 'translation', label: 'Translation', description: 'Translate sentences', disabled: false },
    { value: 'listening', label: 'Listening', description: 'Identify spoken words', disabled: true }
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
        <div className="space-y-2">
          <Label>Quiz Type</Label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {quizTypes.map((type) => (
              <Button
                key={type.value}
                variant={quizType === type.value ? 'default' : 'outline'}
                className="h-auto py-2 px-3 justify-start"
                disabled={type.disabled}
                onClick={() => setQuizType(type.value as QuizType)}
              >
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium">{type.label}</span>
                    {type.disabled && (
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
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
          onClick={() => onStart({ quizType, difficulty })}
        >
          Start Quiz
        </Button>
      </CardContent>
    </Card>
  );
};
