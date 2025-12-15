import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, 
  Brain, 
  RotateCcw, 
  Trophy,
  Flame,
  Lock,
  ChevronLeft,
  ChevronRight,
  Check,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Layout } from '@/components/layout/Layout';
import { AudioButton } from '@/components/AudioButton';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLessonsByLanguage } from '@/data/lessons';
import { cn } from '@/lib/utils';

export default function Practice() {
  const { selectedLanguage } = useLanguage();
  const lessons = getLessonsByLanguage(selectedLanguage.id);
  
  // Combine all vocabulary from lessons for flashcards
  const allVocabulary = lessons.flatMap(lesson => 
    lesson.vocabulary.map(v => ({ ...v, lessonTitle: lesson.title }))
  );

  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [practiceMode, setPracticeMode] = useState<'flashcards' | 'quiz' | null>(null);

  const currentCard = allVocabulary[flashcardIndex];

  const nextCard = () => {
    setShowAnswer(false);
    setFlashcardIndex((prev) => (prev + 1) % allVocabulary.length);
  };

  const prevCard = () => {
    setShowAnswer(false);
    setFlashcardIndex((prev) => (prev - 1 + allVocabulary.length) % allVocabulary.length);
  };

  if (practiceMode === 'flashcards' && currentCard) {
    return (
      <Layout>
        <section className="py-12">
          <div className="container max-w-2xl">
            <Button 
              variant="ghost" 
              className="mb-6"
              onClick={() => setPracticeMode(null)}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Practice
            </Button>

            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold font-serif mb-2">Flashcards</h1>
              <p className="text-muted-foreground">
                Card {flashcardIndex + 1} of {allVocabulary.length}
              </p>
              <Progress 
                value={(flashcardIndex + 1) / allVocabulary.length * 100} 
                className="mt-4 h-2"
              />
            </div>

            <Card 
              className="min-h-[300px] cursor-pointer flex items-center justify-center"
              onClick={() => setShowAnswer(!showAnswer)}
            >
              <CardContent className="text-center py-12">
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
                    <p className="text-sm text-muted-foreground mt-6">
                      Tap to see word again
                    </p>
                  </>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-center gap-4 mt-6">
              <Button variant="outline" size="lg" onClick={prevCard}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <Button size="lg" onClick={nextCard}>
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-8">
              Sign in to save your progress and track which cards you've mastered.
            </p>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 via-background to-accent/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-4">
              Practice {selectedLanguage.name}
            </h1>
            <p className="text-lg text-muted-foreground">
              Reinforce your learning with flashcards and quizzes. 
              Sign in to track your streak and progress.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Banner (for signed-in users preview) */}
      <section className="py-6 border-b border-border bg-card">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            <div className="flex items-center gap-2">
              <Flame className="h-6 w-6 text-primary" />
              <div>
                <p className="text-2xl font-bold">0</p>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              <div>
                <p className="text-2xl font-bold">0%</p>
                <p className="text-xs text-muted-foreground">Mastered</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Sign in to save progress
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Options */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Flashcards */}
            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setPracticeMode('flashcards')}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Layers className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Flashcards</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Review vocabulary with spaced repetition. Flip cards to test your memory.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {allVocabulary.length} cards available
                  </span>
                  <Button>Start</Button>
                </div>
              </CardContent>
            </Card>

            {/* Quiz */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Quick Quiz</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Test your knowledge with multiple choice questions from all lessons.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Mixed vocabulary
                  </span>
                  <Button variant="outline" asChild>
                    <Link to="/lessons">Go to Lessons</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Daily Review Prompt */}
          <Card className="max-w-3xl mx-auto mt-8 bg-secondary/30">
            <CardContent className="p-6 text-center">
              <RotateCcw className="h-8 w-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Daily Review</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Come back each day to review vocabulary using spaced repetition.
                Consistent practice is the key to long-term retention.
              </p>
              <Badge variant="outline">
                <Lock className="h-3 w-3 mr-1" />
                Sign in to enable daily reminders
              </Badge>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
