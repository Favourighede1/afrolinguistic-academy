import { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Layout } from '@/components/layout/Layout';
import { YorubaLessonSidebar } from '@/components/yoruba/YorubaLessonSidebar';
import { YorubaLessonViewer } from '@/components/yoruba/YorubaLessonViewer';
import { yorubaYeMiData, getLessonById, searchLessons } from '@/data/yoruba-ye-mi';
import { useIsMobile } from '@/hooks/use-mobile';

const LAST_LESSON_KEY = 'yoruba-ye-mi-last-lesson';

export default function YorubaYeMi() {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [activeLessonId, setActiveLessonId] = useState<string>(() => {
    const stored = localStorage.getItem(LAST_LESSON_KEY);
    if (stored && getLessonById(stored)) return stored;
    return yorubaYeMiData[0]?.id ?? '';
  });

  const [searchQuery, setSearchQuery] = useState('');

  const filteredLessons = useMemo(
    () => (searchQuery ? searchLessons(searchQuery) : yorubaYeMiData),
    [searchQuery]
  );

  const activeLesson = getLessonById(activeLessonId);
  const currentIndex = yorubaYeMiData.findIndex((l) => l.id === activeLessonId);
  const prevLesson = currentIndex > 0 ? yorubaYeMiData[currentIndex - 1] : null;
  const nextLesson = currentIndex < yorubaYeMiData.length - 1 ? yorubaYeMiData[currentIndex + 1] : null;

  useEffect(() => {
    if (activeLessonId) {
      localStorage.setItem(LAST_LESSON_KEY, activeLessonId);
    }
  }, [activeLessonId]);

  const handleSelectLesson = (id: string) => {
    setActiveLessonId(id);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sidebarContent = (
    <YorubaLessonSidebar
      activeLessonId={activeLessonId}
      onSelectLesson={handleSelectLesson}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      filteredLessons={filteredLessons}
    />
  );

  return (
    <Layout>
      <Helmet>
        <title>Learn Yorùbá – Yorùbá Yé Mi | Afrolinguistic Academy</title>
        <meta
          name="description"
          content="Learn Yorùbá with structured lessons from the Yorùbá Yé Mi textbook. Covers greetings, grammar, vocabulary, culture, and more."
        />
        <link rel="canonical" href="/yoruba-ye-mi" />
        <html lang="en" />
      </Helmet>

      <div className="flex flex-1 min-h-[calc(100vh-4rem)]">
        {/* Desktop sidebar */}
        {!isMobile && (
          <div className="w-72 shrink-0 border-r border-border hidden md:block">
            {sidebarContent}
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile header bar */}
          {isMobile && (
            <div className="flex items-center gap-2 p-3 border-b border-border bg-card">
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="shrink-0">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-80">
                  {sidebarContent}
                </SheetContent>
              </Sheet>
              <div className="text-sm font-medium text-foreground truncate">
                {activeLesson?.lessonTitle ?? 'Yorùbá Yé Mi'}
              </div>
            </div>
          )}

          {/* Lesson viewer */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            {/* Language label */}
            <div className="mb-4 text-xs font-semibold text-primary uppercase tracking-wider">
              Language: Yorùbá
            </div>

            {activeLesson ? (
              <YorubaLessonViewer lesson={activeLesson} />
            ) : (
              <p className="text-muted-foreground">Select a lesson from the sidebar.</p>
            )}

            {/* Prev / Next navigation */}
            <nav className="flex items-center justify-between mt-8 pt-6 border-t border-border" aria-label="Lesson navigation">
              {prevLesson ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSelectLesson(prevLesson.id)}
                  className="gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline truncate max-w-[180px]">{prevLesson.lessonTitle}</span>
                  <span className="sm:hidden">Previous</span>
                </Button>
              ) : (
                <div />
              )}
              {nextLesson ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSelectLesson(nextLesson.id)}
                  className="gap-1"
                >
                  <span className="hidden sm:inline truncate max-w-[180px]">{nextLesson.lessonTitle}</span>
                  <span className="sm:hidden">Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <div />
              )}
            </nav>

            {/* Attribution footer */}
            <footer className="mt-8 pt-4 border-t border-border text-xs text-muted-foreground space-y-1">
              <p>
                Content adapted from COERLL –{' '}
                <em>Yorùbá Yé Mi</em> (CC 2012 The University of Texas at Austin).
              </p>
              <p>
                Licensed under{' '}
                <a
                  href="https://creativecommons.org/licenses/by-nc-sa/3.0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-primary hover:text-primary/80"
                >
                  Creative Commons BY-NC-SA 3.0
                </a>
                . Study guide with original summaries; not a reproduction of the textbook.
              </p>
            </footer>
          </div>
        </div>
      </div>
    </Layout>
  );
}
