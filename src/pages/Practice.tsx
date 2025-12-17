import { useState, useMemo } from 'react';
import { Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLessonsByLanguage } from '@/data/lessons';
import { usePracticeProgress } from '@/hooks/usePracticeProgress';
import { PracticeStats } from '@/components/practice/PracticeStats';
import { DailyReviewPanel } from '@/components/practice/DailyReviewPanel';
import { FreePracticePanel, DeckOption } from '@/components/practice/FreePracticePanel';
import { QuickQuizPanel, QuizType, QuizDifficulty } from '@/components/practice/QuickQuizPanel';
import { FlashcardSession, SessionResults } from '@/components/practice/FlashcardSession';
import { QuizSession } from '@/components/practice/QuizSession';

type PracticeMode = 'menu' | 'daily-review' | 'free-practice' | 'quiz';

export default function Practice() {
  const { selectedLanguage } = useLanguage();
  const lessons = getLessonsByLanguage(selectedLanguage.id);
  const { stats, recordReview, getDueCards, getHardCards } = usePracticeProgress(selectedLanguage.id);
  
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('menu');
  const [sessionCards, setSessionCards] = useState<any[]>([]);
  const [quizSettings, setQuizSettings] = useState<{ quizType: QuizType; difficulty: QuizDifficulty } | null>(null);

  // Combine all vocabulary from lessons
  const allVocabulary = useMemo(() => 
    lessons.flatMap(lesson => 
      lesson.vocabulary.map(v => ({ ...v, lessonTitle: lesson.title }))
    ), [lessons]
  );

  const allCardIds = allVocabulary.map(v => v.id);
  const dueCards = getDueCards(allCardIds);
  const hardCards = getHardCards(allCardIds);

  const hasBeginnerContent = lessons.some(l => l.level === 'beginner');
  const hasIntermediateContent = lessons.some(l => l.level === 'intermediate');

  const handleStartDailyReview = (settings: { cardCount: number; includeAudio: boolean }) => {
    const dueVocab = allVocabulary.filter(v => dueCards.includes(v.id));
    const cardsToReview = dueVocab.slice(0, settings.cardCount);
    
    // If not enough due cards, add new cards
    if (cardsToReview.length < settings.cardCount) {
      const newCards = allVocabulary.filter(v => !dueCards.includes(v.id));
      cardsToReview.push(...newCards.slice(0, settings.cardCount - cardsToReview.length));
    }
    
    setSessionCards(cardsToReview);
    setPracticeMode('daily-review');
  };

  const handleStartFreePractice = (deck: DeckOption) => {
    let cardsToReview: typeof allVocabulary = [];
    
    switch (deck.type) {
      case 'mixed':
        cardsToReview = [...allVocabulary].sort(() => Math.random() - 0.5);
        break;
      case 'lesson':
        const lesson = lessons.find(l => l.id === deck.lessonId);
        if (lesson) {
          cardsToReview = lesson.vocabulary.map(v => ({ ...v, lessonTitle: lesson.title }));
        }
        break;
      case 'topic':
        const topicLessons = lessons.filter(l => l.topic === deck.topic);
        cardsToReview = topicLessons.flatMap(l => 
          l.vocabulary.map(v => ({ ...v, lessonTitle: l.title }))
        );
        break;
      case 'hard':
        cardsToReview = allVocabulary.filter(v => hardCards.includes(v.id));
        break;
      default:
        cardsToReview = allVocabulary;
    }
    
    setSessionCards(cardsToReview);
    setPracticeMode('free-practice');
  };

  const handleStartQuiz = (settings: { quizType: QuizType; difficulty: QuizDifficulty }) => {
    setQuizSettings(settings);
    setPracticeMode('quiz');
  };

  const handleSessionComplete = (results: SessionResults) => {
    // Results are tracked via recordReview during the session
    console.log('Session complete:', results);
  };

  const handleBackToMenu = () => {
    setPracticeMode('menu');
    setSessionCards([]);
    setQuizSettings(null);
  };

  // Render active session
  if (practiceMode === 'daily-review' || practiceMode === 'free-practice') {
    return (
      <Layout>
        <FlashcardSession
          cards={sessionCards}
          mode={practiceMode === 'daily-review' ? 'daily' : 'free'}
          onBack={handleBackToMenu}
          onCardReview={recordReview}
          onComplete={handleSessionComplete}
        />
      </Layout>
    );
  }

  if (practiceMode === 'quiz' && quizSettings) {
    return (
      <Layout>
        <QuizSession
          lessons={lessons}
          quizType={quizSettings.quizType}
          difficulty={quizSettings.difficulty}
          onBack={handleBackToMenu}
        />
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
              Build lasting memory with daily reviews and quizzes. 100% Free Forever.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <PracticeStats stats={stats} dueCardsCount={dueCards.length} />

      {/* Main Content */}
      <section className="py-8 md:py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <Button 
                size="lg" 
                onClick={() => handleStartDailyReview({ cardCount: 10, includeAudio: false })}
                disabled={allVocabulary.length === 0}
              >
                Start Daily Review
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => {
                  setSessionCards([...allVocabulary].sort(() => Math.random() - 0.5));
                  setPracticeMode('free-practice');
                }}
                disabled={allVocabulary.length === 0}
              >
                <Layers className="h-4 w-4 mr-2" />
                Start Free Practice
              </Button>
            </div>

            {/* Daily Review Panel */}
            <DailyReviewPanel 
              dueCardsCount={dueCards.length}
              onStart={handleStartDailyReview}
            />

            {/* Two-column layout for Free Practice and Quiz */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FreePracticePanel
                lessons={lessons}
                hardCardsCount={hardCards.length}
                totalCardsCount={allVocabulary.length}
                onSelectDeck={handleStartFreePractice}
              />
              
              <QuickQuizPanel
                onStart={handleStartQuiz}
                hasBeginnerContent={hasBeginnerContent}
                hasIntermediateContent={hasIntermediateContent}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
