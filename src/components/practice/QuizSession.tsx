import { useState, useCallback, useMemo } from 'react';
import { ChevronLeft, Check, X, RotateCcw, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { QuizQuestion, VocabularyItem, Lesson } from '@/data/lessons';
import { QuizType, QuizDifficulty } from './QuickQuizPanel';

interface QuizSessionProps {
  lessons: Lesson[];
  quizType: QuizType;
  difficulty: QuizDifficulty;
  onBack: () => void;
}

interface QuizResult {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}

export const QuizSession = ({ lessons, quizType, difficulty, onBack }: QuizSessionProps) => {
  const filteredLessons = lessons.filter(l => l.level === difficulty);
  
  // Generate quiz questions based on type
  const questions = useMemo(() => {
    const allVocab = filteredLessons.flatMap(l => l.vocabulary);
    
    if (quizType === 'vocabulary') {
      return allVocab.slice(0, 10).map((v, idx) => {
        const wrongOptions = allVocab
          .filter(item => item.id !== v.id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(item => item.translation);
        
        const options = [...wrongOptions, v.translation].sort(() => Math.random() - 0.5);
        
        return {
          id: `q-${idx}`,
          type: 'multiple-choice' as const,
          question: `What does "${v.word}" mean?`,
          options,
          correctAnswer: v.translation
        };
      });
    } else {
      // Translation type - typing answers
      return allVocab.slice(0, 10).map((v, idx) => ({
        id: `q-${idx}`,
        type: 'typing' as const,
        question: `Type the word for "${v.translation}"`,
        correctAnswer: v.word
      }));
    }
  }, [filteredLessons, quizType]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  const checkAnswer = useCallback(() => {
    const userAnswer = currentQuestion.type === 'typing' ? typedAnswer : selectedAnswer || '';
    const isCorrect = userAnswer.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase().trim();
    
    setResults(prev => [...prev, {
      question: currentQuestion.question,
      userAnswer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect
    }]);
    setShowResult(true);
  }, [currentQuestion, typedAnswer, selectedAnswer]);

  const nextQuestion = useCallback(() => {
    if (currentIndex === questions.length - 1) {
      setIsComplete(true);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setTypedAnswer('');
      setShowResult(false);
    }
  }, [currentIndex, questions.length]);

  const restartQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setTypedAnswer('');
    setShowResult(false);
    setResults([]);
    setIsComplete(false);
  };

  const practiceWrongAnswers = () => {
    // For now, just restart
    restartQuiz();
  };

  if (questions.length === 0) {
    return (
      <div className="py-12">
        <div className="container max-w-2xl text-center">
          <h2 className="text-2xl font-bold mb-4">No Questions Available</h2>
          <p className="text-muted-foreground mb-6">
            There are no {difficulty} level lessons available yet.
          </p>
          <Button onClick={onBack}>Back to Practice</Button>
        </div>
      </div>
    );
  }

  if (isComplete) {
    const correctCount = results.filter(r => r.isCorrect).length;
    const accuracy = Math.round((correctCount / results.length) * 100);
    const wrongAnswers = results.filter(r => !r.isCorrect);

    return (
      <div className="py-12">
        <div className="container max-w-2xl">
          <Card className="py-8">
            <CardContent>
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  {accuracy >= 70 ? (
                    <Check className="h-8 w-8 text-primary" />
                  ) : (
                    <RotateCcw className="h-8 w-8 text-primary" />
                  )}
                </div>
                <h2 className="text-2xl font-bold font-serif mb-2">Quiz Complete!</h2>
                <p className="text-4xl font-bold text-primary mb-2">{accuracy}%</p>
                <p className="text-muted-foreground">
                  {correctCount} of {results.length} correct
                </p>
              </div>

              {wrongAnswers.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-semibold mb-3">Review Wrong Answers:</h3>
                  <div className="space-y-2">
                    {wrongAnswers.map((result, idx) => (
                      <div key={idx} className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg text-sm">
                        <p className="font-medium">{result.question}</p>
                        <p className="text-red-600 dark:text-red-400">Your answer: {result.userAnswer || '(no answer)'}</p>
                        <p className="text-green-600 dark:text-green-400">Correct: {result.correctAnswer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={onBack}>Back to Practice</Button>
                <Button variant="outline" onClick={restartQuiz}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Retry Quiz
                </Button>
                {wrongAnswers.length > 0 && (
                  <Button variant="outline" onClick={practiceWrongAnswers}>
                    Practice Wrong Answers
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const isAnswered = currentQuestion.type === 'typing' ? typedAnswer.trim() !== '' : selectedAnswer !== null;
  const currentResult = showResult ? results[results.length - 1] : null;

  return (
    <div className="py-12">
      <div className="container max-w-2xl">
        <Button variant="ghost" className="mb-6" onClick={onBack}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Practice
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold font-serif mb-2">
            {quizType === 'vocabulary' ? 'Vocabulary Quiz' : 'Translation Quiz'}
          </h1>
          <p className="text-muted-foreground">
            Question {currentIndex + 1} of {questions.length}
          </p>
          <Progress value={progress} className="mt-4 h-2" />
        </div>

        <Card>
          <CardContent className="py-8">
            <h2 className="text-xl font-semibold text-center mb-6">
              {currentQuestion.question}
            </h2>

            {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
              <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrect = option === currentQuestion.correctAnswer;
                  
                  return (
                    <Button
                      key={idx}
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left h-auto py-3 px-4",
                        isSelected && !showResult && "border-primary bg-primary/5",
                        showResult && isCorrect && "border-green-500 bg-green-50 dark:bg-green-950/20",
                        showResult && isSelected && !isCorrect && "border-red-500 bg-red-50 dark:bg-red-950/20"
                      )}
                      disabled={showResult}
                      onClick={() => setSelectedAnswer(option)}
                    >
                      <span className="flex-1">{option}</span>
                      {showResult && isCorrect && <Check className="h-5 w-5 text-green-500" />}
                      {showResult && isSelected && !isCorrect && <X className="h-5 w-5 text-red-500" />}
                    </Button>
                  );
                })}
              </div>
            )}

            {currentQuestion.type === 'typing' && (
              <div className="space-y-4">
                <Input
                  value={typedAnswer}
                  onChange={(e) => setTypedAnswer(e.target.value)}
                  placeholder="Type your answer..."
                  disabled={showResult}
                  className={cn(
                    "text-lg py-6",
                    showResult && currentResult?.isCorrect && "border-green-500",
                    showResult && !currentResult?.isCorrect && "border-red-500"
                  )}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !showResult && isAnswered) {
                      checkAnswer();
                    }
                  }}
                />
                {showResult && !currentResult?.isCorrect && (
                  <p className="text-green-600 dark:text-green-400 text-center">
                    Correct answer: {currentQuestion.correctAnswer}
                  </p>
                )}
              </div>
            )}

            <div className="mt-6 flex justify-center">
              {!showResult ? (
                <Button 
                  onClick={checkAnswer} 
                  disabled={!isAnswered}
                  size="lg"
                >
                  Check Answer
                </Button>
              ) : (
                <Button onClick={nextQuestion} size="lg">
                  {currentIndex === questions.length - 1 ? 'See Results' : 'Next Question'}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
