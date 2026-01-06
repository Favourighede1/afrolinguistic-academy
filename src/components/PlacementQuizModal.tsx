import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

interface PlacementQuizModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const questions = [
  {
    id: 1,
    question: "How much Edo do you already know?",
    options: [
      { value: 'none', label: "I'm a complete beginner" },
      { value: 'some', label: "I know a few words or phrases" },
      { value: 'conversational', label: "I can hold basic conversations" },
    ]
  },
  {
    id: 2,
    question: "Why are you learning Edo?",
    options: [
      { value: 'heritage', label: "To connect with my heritage" },
      { value: 'travel', label: "To travel or communicate with family" },
      { value: 'curiosity', label: "General interest and curiosity" },
    ]
  },
  {
    id: 3,
    question: "How much time can you dedicate daily?",
    options: [
      { value: '5min', label: "5-10 minutes" },
      { value: '15min', label: "15-30 minutes" },
      { value: '30min', label: "30+ minutes" },
    ]
  }
];

export function PlacementQuizModal({ open, onOpenChange }: PlacementQuizModalProps) {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleStartLesson = () => {
    onOpenChange(false);
    navigate('/lessons/edo-greetings');
    // Reset state for next time
    setTimeout(() => {
      setCurrentQuestion(0);
      setAnswers({});
      setShowResults(false);
    }, 300);
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset state
    setTimeout(() => {
      setCurrentQuestion(0);
      setAnswers({});
      setShowResults(false);
    }, 300);
  };

  if (showResults) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Check className="h-6 w-6 text-primary" />
            </div>
            <DialogTitle className="text-center">We recommend starting with Lesson 1!</DialogTitle>
            <DialogDescription className="text-center">
              Based on your answers, our beginner-friendly greetings lesson is the perfect place to start your Edo journey.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="bg-secondary/50 rounded-lg p-4">
              <h4 className="font-medium mb-2">Your personalized path:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Start with basic greetings and pronunciation</li>
                <li>• Learn essential everyday phrases</li>
                <li>• Practice with daily review sessions</li>
              </ul>
            </div>
            <Button onClick={handleStartLesson} className="w-full gap-2">
              Start Lesson 1
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="ghost" onClick={handleClose} className="w-full">
              Maybe later
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-1.5 mb-4" />
          <DialogTitle>{currentQ.question}</DialogTitle>
        </DialogHeader>
        <RadioGroup
          value={answers[currentQ.id] || ''}
          onValueChange={(value) => setAnswers(prev => ({ ...prev, [currentQ.id]: value }))}
          className="space-y-3 mt-4"
        >
          {currentQ.options.map((option) => (
            <div key={option.value} className="flex items-center space-x-3">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value} className="flex-1 cursor-pointer py-2">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        <div className="flex justify-end mt-6">
          <Button 
            onClick={handleNext}
            disabled={!answers[currentQ.id]}
            className="gap-2"
          >
            {currentQuestion < questions.length - 1 ? 'Next' : 'See Results'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
