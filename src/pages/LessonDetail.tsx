import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  Target, 
  BookOpen, 
  MessageSquare,
  HelpCircle,
  Plus,
  Check,
  X,
  RefreshCw,
  Brain
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Layout } from '@/components/layout/Layout';
import { AudioButton } from '@/components/AudioButton';
import { NextStepPanel } from '@/components/NextStepPanel';
import { getLessonById, getLessonsByLanguage } from '@/data/lessons';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function LessonDetail() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { selectedLanguage } = useLanguage();
  const lesson = getLessonById(lessonId || '');
  const lessons = getLessonsByLanguage(selectedLanguage.id);
  const { toast } = useToast();
  
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizResults, setQuizResults] = useState<Record<string, boolean>>({});
  const [typingAnswers, setTypingAnswers] = useState<Record<string, string>>({});

  // Find the next lesson
  const currentIndex = lessons.findIndex(l => l.id === lessonId);
  const nextLesson = currentIndex >= 0 && currentIndex < lessons.length - 1 
    ? lessons[currentIndex + 1] 
    : null;

  if (!lesson) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
          <p className="text-muted-foreground mb-6">The lesson you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/lessons">Back to Lessons</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const handleMultipleChoice = (questionId: string, answer: string, correctAnswer: string) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: answer }));
    setQuizResults(prev => ({ ...prev, [questionId]: answer === correctAnswer }));
  };

  const handleTypingSubmit = (questionId: string, correctAnswer: string) => {
    const userAnswer = typingAnswers[questionId]?.trim().toLowerCase();
    const correct = userAnswer === correctAnswer.toLowerCase();
    setQuizResults(prev => ({ ...prev, [questionId]: correct }));
  };

  const handleAddToFlashcards = () => {
    toast({
      title: "Added to Flashcards",
      description: "Sign in to save flashcards permanently.",
    });
  };

  return (
    <Layout>
      {/* Header */}
      <section className="py-8 bg-gradient-to-br from-primary/5 via-background to-accent/10">
        <div className="container">
          <Link 
            to="/lessons" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Lessons
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant="secondary">
              {lesson.level.charAt(0).toUpperCase() + lesson.level.slice(1)}
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              {lesson.estimatedMinutes} min
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-4">
            {lesson.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {lesson.description}
          </p>
        </div>
      </section>

      {/* Learning Objectives */}
      <section className="py-8 border-b border-border">
        <div className="container">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Learning Objectives</h2>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {lesson.objectives.map((obj, idx) => (
              <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                <Check className="h-4 w-4 text-accent-foreground mt-0.5 flex-shrink-0" />
                {obj}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container">
          <Tabs defaultValue="vocabulary" className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto mb-6">
              <TabsTrigger value="vocabulary" className="gap-2">
                <BookOpen className="h-4 w-4" />
                Vocabulary
              </TabsTrigger>
              <TabsTrigger value="grammar" className="gap-2">
                Grammar Notes
              </TabsTrigger>
              <TabsTrigger value="dialog" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Dialog
              </TabsTrigger>
              <TabsTrigger value="quiz" className="gap-2">
                <HelpCircle className="h-4 w-4" />
                Quiz
              </TabsTrigger>
            </TabsList>

            {/* Vocabulary Tab */}
            <TabsContent value="vocabulary" className="mt-0">
              <div className="grid gap-3">
                {lesson.vocabulary.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardContent className="p-4 flex items-center gap-4">
                      <AudioButton audioUrl={item.audioUrl} size="sm" />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <span className="font-semibold text-lg">{item.word}</span>
                          <span className="text-sm text-muted-foreground">
                            [{item.pronunciation}]
                          </span>
                        </div>
                        <p className="text-muted-foreground">{item.translation}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button 
                variant="outline" 
                className="mt-6 gap-2"
                onClick={handleAddToFlashcards}
              >
                <Plus className="h-4 w-4" />
                Add All to Flashcards
              </Button>
            </TabsContent>

            {/* Grammar Tab */}
            <TabsContent value="grammar" className="mt-0">
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-4">
                    {lesson.grammarNotes.map((note, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <p className="text-muted-foreground">{note}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Dialog Tab */}
            <TabsContent value="dialog" className="mt-0">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {lesson.dialog.map((line, idx) => (
                      <div 
                        key={line.id} 
                        className={cn(
                          "flex gap-4 p-4 rounded-lg",
                          idx % 2 === 0 ? "bg-secondary/30" : "bg-card"
                        )}
                      >
                        <AudioButton audioUrl={line.audioUrl} size="sm" />
                        <div className="flex-1">
                          <div className="font-medium text-sm text-primary mb-1">
                            {line.speaker}
                          </div>
                          <p className="font-semibold mb-1">{line.text}</p>
                          <p className="text-sm text-muted-foreground">{line.translation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Quiz Tab */}
            <TabsContent value="quiz" className="mt-0">
              <div className="space-y-6">
                {lesson.quiz.map((question, idx) => (
                  <Card key={question.id}>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center">
                          {idx + 1}
                        </span>
                        {question.question}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {question.type === 'multiple-choice' && question.options && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {question.options.map((option) => {
                            const isSelected = quizAnswers[question.id] === option;
                            const hasResult = quizResults[question.id] !== undefined;
                            const isCorrect = option === question.correctAnswer;
                            
                            return (
                              <Button
                                key={option}
                                variant={isSelected ? (hasResult ? (isCorrect ? 'default' : 'destructive') : 'default') : 'outline'}
                                className={cn(
                                  "justify-start h-auto py-3",
                                  hasResult && isCorrect && "bg-accent text-accent-foreground border-accent"
                                )}
                                onClick={() => handleMultipleChoice(question.id, option, question.correctAnswer)}
                                disabled={hasResult}
                              >
                                {option}
                                {hasResult && isSelected && !isCorrect && (
                                  <X className="h-4 w-4 ml-auto" />
                                )}
                                {hasResult && isCorrect && (
                                  <Check className="h-4 w-4 ml-auto" />
                                )}
                              </Button>
                            );
                          })}
                        </div>
                      )}

                      {question.type === 'typing' && (
                        <div className="flex gap-3">
                          <Input
                            placeholder="Type your answer..."
                            value={typingAnswers[question.id] || ''}
                            onChange={(e) => setTypingAnswers(prev => ({ ...prev, [question.id]: e.target.value }))}
                            disabled={quizResults[question.id] !== undefined}
                            className={cn(
                              quizResults[question.id] === true && "border-accent",
                              quizResults[question.id] === false && "border-destructive"
                            )}
                          />
                          <Button 
                            onClick={() => handleTypingSubmit(question.id, question.correctAnswer)}
                            disabled={quizResults[question.id] !== undefined}
                          >
                            Check
                          </Button>
                        </div>
                      )}

                      {quizResults[question.id] !== undefined && (
                        <p className={cn(
                          "mt-3 text-sm font-medium",
                          quizResults[question.id] ? "text-accent-foreground" : "text-destructive"
                        )}>
                          {quizResults[question.id] 
                            ? "Correct! Well done." 
                            : `Not quite. The correct answer is: ${question.correctAnswer}`
                          }
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Next Steps Panel */}
      <section className="py-8 border-t border-border">
        <div className="container">
          <NextStepPanel
            title="Ready for More?"
            description="Reinforce what you learned or continue to the next lesson."
            actions={[
              ...(nextLesson ? [{
                label: `Next: ${nextLesson.title}`,
                href: `/lessons/${nextLesson.id}`,
                icon: BookOpen
              }] : []),
              {
                label: 'Review in Practice',
                href: '/practice',
                icon: RefreshCw,
                variant: 'outline' as const
              },
              {
                label: 'Take a Quiz',
                href: '/practice',
                icon: Brain,
                variant: 'outline' as const
              }
            ]}
          />
        </div>
      </section>
    </Layout>
  );
}
