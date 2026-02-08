import { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Menu, BookOpen, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { YorubaLessonSidebar } from '@/components/yoruba/YorubaLessonSidebar';
import { YorubaLessonViewer } from '@/components/yoruba/YorubaLessonViewer';
import { getLessonById, searchLessons, yorubaYeMiData } from '@/data/yoruba-ye-mi';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'yoruba-yemi-last-lesson';

export default function YorubaYeMi() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Restore last lesson from localStorage
  const [activeLessonId, setActiveLessonId] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || yorubaYeMiData[0]?.id || '';
    } catch {
      return yorubaYeMiData[0]?.id || '';
    }
  });

  const activeLesson = getLessonById(activeLessonId);
  const filteredLessons = searchQuery ? searchLessons(searchQuery) : yorubaYeMiData;

  const handleSelectLesson = useCallback((id: string) => {
    setActiveLessonId(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch { /* noop */ }
    // Close sidebar on mobile
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, []);

  // Auto-select first filtered result when searching
  useEffect(() => {
    if (searchQuery && filteredLessons.length > 0 && !filteredLessons.find(l => l.id === activeLessonId)) {
      setActiveLessonId(filteredLessons[0].id);
    }
  }, [searchQuery, filteredLessons, activeLessonId]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Yorùbá Yé Mi – Learn Yorùbá Language',
    description:
      'Structured study guide for learning Yorùbá, covering greetings, grammar, numbers, time, family, and more.',
    author: { '@type': 'Organization', name: 'Afrolinguistic Academy' },
    publisher: { '@type': 'Organization', name: 'Afrolinguistic Academy' },
  };

  return (
    <Layout>
      <Helmet>
        <title>Yorùbá Lessons: Yorùbá Yé Mi | Afrolinguistic Academy</title>
        <meta
          name="description"
          content="Learn Yorùbá with structured lessons covering greetings, grammar, numbers, time, and family. Free study guide based on Yorùbá Yé Mi."
        />
        <link rel="canonical" href="/yoruba-ye-mi" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Disclaimer banner */}
      <div className="bg-muted/50 border-b border-border">
        <div className="container py-2 flex items-start gap-2 text-xs text-muted-foreground">
          <Info className="h-4 w-4 shrink-0 mt-0.5" />
          <p>
            Study guide built from a textbook; summaries are original and short excerpts may appear
            for reference. Content © 2012 COERLL, The University of Texas at Austin (Creative Commons).
          </p>
        </div>
      </div>

      <main className="flex-1 flex flex-col">
        {/* Mobile header bar */}
        <div className="md:hidden flex items-center gap-2 p-3 border-b border-border bg-card">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle lesson sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold font-serif text-foreground truncate">
            Yorùbá Yé Mi
          </h1>
        </div>

        <div className="flex flex-1 min-h-0 relative">
          {/* Sidebar */}
          <div
            className={cn(
              'absolute md:relative z-30 bg-card h-full transition-all',
              sidebarOpen
                ? 'w-72 md:w-72 lg:w-80'
                : 'w-0 overflow-hidden'
            )}
          >
            <YorubaLessonSidebar
              activeLessonId={activeLessonId}
              onSelectLesson={handleSelectLesson}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filteredLessons={filteredLessons}
            />
          </div>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div
              className="md:hidden fixed inset-0 z-20 bg-background/60 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main content */}
          <div className="flex-1 overflow-y-auto">
            <div className="hidden md:flex items-center justify-between p-4 border-b border-border bg-card">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  aria-label="Toggle lesson sidebar"
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <h1 className="text-xl font-bold font-serif text-foreground">
                  Yorùbá Yé Mi
                </h1>
              </div>
              <span className="text-sm text-muted-foreground">
                {yorubaYeMiData.length} lessons across 6 sections
              </span>
            </div>

            <section className="p-4 md:p-8">
              {activeLesson ? (
                <YorubaLessonViewer lesson={activeLesson} />
              ) : (
                <div className="text-center py-20 space-y-4">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Select a lesson from the sidebar to begin.
                  </p>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </Layout>
  );
}
