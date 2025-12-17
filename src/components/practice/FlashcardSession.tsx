import { useState, useCallback } from 'react';
import { ChevronLeft, Check, X, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AudioButton } from '@/components/AudioButton';
import { VocabularyItem } from '@/data/lessons';

interface FlashcardSessionProps {
  cards: (VocabularyItem & { lessonTitle: string })[];
  mode: 'daily' | 'free';
  onBack: () => void;
  onCardReview: (cardId: string, correct: boolean) => void;
  onComplete: (results: SessionResults) => void;
}

export interface SessionResults {
  totalCards: number;
  correctCount: number;
  incorrectCount: number;
  reviewedCards: { cardId: string; correct: boolean }[];
}

export const FlashcardSession = ({ 
  cards, 
  mode, 
  onBack, 
  onCardReview,
  onComplete 
}: FlashcardSessionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [results, setResults] = useState<SessionResults>({
    totalCards: cards.length,
    correctCount: 0,
    incorrectCount: 0,
    reviewedCards: []
  });
  const [isComplete, setIsComplete] = useState(false);

  const currentCard = cards[currentIndex];
  const progress = ((currentIndex) / cards.length) * 100;

  const handleAnswer = useCallback((correct: boolean) => {
    onCardReview(currentCard.id, correct);
    
    const newResults = {
      ...results,
      correctCount: correct ? results.correctCount + 1 : results.correctCount,
      incorrectCount: correct ? results.incorrectCount : results.incorrectCount + 1,
      reviewedCards: [...results.reviewedCards, { cardId: currentCard.id, correct }]
    };
    setResults(newResults);

    if (currentIndex === cards.length - 1) {
      setIsComplete(true);
      onComplete(newResults);
    } else {
      setShowAnswer(false);
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentCard, currentIndex, cards.length, results, onCardReview, onComplete]);

  if (isComplete) {
    const accuracy = Math.round((results.correctCount / results.totalCards) * 100);
    return (
      <div className="py-12">
        <div className="container max-w-2xl">
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold font-serif mb-2">Session Complete!</h2>
              <p className="text-muted-foreground mb-6">
                {mode === 'daily' ? 'Great job keeping up your streak!' : 'Nice practice session!'}
              </p>
              
              <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto mb-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">{results.totalCards}</p>
                  <p className="text-xs text-muted-foreground">Reviewed</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">{accuracy}%</p>
                  <p className="text-xs text-muted-foreground">Accuracy</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-muted-foreground">{results.incorrectCount}</p>
                  <p className="text-xs text-muted-foreground">To Review</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={onBack}>
                  Back to Practice
                </Button>
                {results.incorrectCount > 0 && (
                  <Button variant="outline" onClick={() => {
                    setCurrentIndex(0);
                    setShowAnswer(false);
                    setIsComplete(false);
                    setResults({
                      totalCards: cards.length,
                      correctCount: 0,
                      incorrectCount: 0,
                      reviewedCards: []
                    });
                  }}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Practice Again
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!currentCard) {
    return null;
  }

  return (
    <div className="py-12">
      <div className="container max-w-2xl">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={onBack}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Practice
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold font-serif mb-2">
            {mode === 'daily' ? 'Daily Review' : 'Free Practice'}
          </h1>
          <p className="text-muted-foreground">
            Card {currentIndex + 1} of {cards.length}
          </p>
          <Progress value={progress} className="mt-4 h-2" />
        </div>

        <Card 
          className="min-h-[300px] cursor-pointer flex items-center justify-center"
          onClick={() => !showAnswer && setShowAnswer(true)}
        >
          <CardContent className="text-center py-12 w-full">
            {!showAnswer ? (
              <>
                <p className="text-4xl font-bold font-serif mb-4">{currentCard.word}</p>
                <p className="text-lg text-muted-foreground">[{currentCard.pronunciation}]</p>
                <AudioButton audioUrl={currentCard.audioUrl} className="mt-4" />
                <p className="text-sm text-muted-foreground mt-6">
                  Tap to reveal translation
                </p>
              </>
            ) : (
              <>
                <p className="text-2xl text-muted-foreground mb-2">{currentCard.word}</p>
                <p className="text-4xl font-bold font-serif mb-4">{currentCard.translation}</p>
                <Badge variant="outline">{currentCard.lessonTitle}</Badge>
                
                <div className="mt-8">
                  <p className="text-sm text-muted-foreground mb-4">Did you know this?</p>
                  <div className="flex justify-center gap-4">
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="border-red-200 hover:bg-red-50 hover:border-red-300"
                      onClick={(e) => { e.stopPropagation(); handleAnswer(false); }}
                    >
                      <X className="h-5 w-5 mr-2 text-red-500" />
                      Not Yet
                    </Button>
                    <Button 
                      size="lg"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={(e) => { e.stopPropagation(); handleAnswer(true); }}
                    >
                      <Check className="h-5 w-5 mr-2" />
                      Got It!
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Sign in to sync your progress across devices.
        </p>
      </div>
    </div>
  );
};
