import { useState } from 'react';
import { Search, ChevronRight, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { getChapters, type YorubaLesson } from '@/data/yoruba-ye-mi';

interface Props {
  activeLessonId: string | null;
  onSelectLesson: (id: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  filteredLessons: YorubaLesson[];
}

export function YorubaLessonSidebar({
  activeLessonId,
  onSelectLesson,
  searchQuery,
  onSearchChange,
  filteredLessons,
}: Props) {
  const chapters = getChapters();
  const filteredIds = new Set(filteredLessons.map((l) => l.id));

  // Open chapters that contain filtered results or the active lesson
  const [openChapters, setOpenChapters] = useState<Set<number>>(() => {
    const s = new Set<number>();
    chapters.forEach((ch) => s.add(ch.number));
    return s;
  });

  const toggleChapter = (num: number) => {
    setOpenChapters((prev) => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num);
      else next.add(num);
      return next;
    });
  };

  const chapterLabel = (num: number) =>
    num === 0 ? 'Intro' : `Ch. ${num}`;

  return (
    <aside className="flex flex-col h-full border-r border-border bg-card">
      {/* Search */}
      <div className="p-3 border-b border-border">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search lessons, vocab…"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 h-9 text-sm"
          />
        </div>
      </div>

      {/* Chapter list */}
      <ScrollArea className="flex-1">
        <nav className="p-2 space-y-1" aria-label="Lesson navigation">
          {chapters.map((chapter) => {
            const visibleLessons = searchQuery
              ? chapter.lessons.filter((l) => filteredIds.has(l.id))
              : chapter.lessons;

            if (searchQuery && visibleLessons.length === 0) return null;

            return (
              <Collapsible
                key={chapter.number}
                open={openChapters.has(chapter.number)}
                onOpenChange={() => toggleChapter(chapter.number)}
              >
                <CollapsibleTrigger className="flex items-center w-full gap-2 px-2 py-2 text-sm font-medium rounded-md hover:bg-muted/50 transition-colors text-foreground">
                  <ChevronRight
                    className={cn(
                      'h-4 w-4 shrink-0 transition-transform',
                      openChapters.has(chapter.number) && 'rotate-90'
                    )}
                  />
                  <span className="text-xs font-bold text-primary mr-1">
                    {chapterLabel(chapter.number)}
                  </span>
                  <span className="truncate text-left flex-1">
                    {chapter.title.replace(/^Orí\s+\S+\s*–?\s*/, '')}
                  </span>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <ul className="ml-4 pl-2 border-l border-border space-y-0.5 pb-1">
                    {visibleLessons.map((lesson) => (
                      <li key={lesson.id}>
                        <button
                          onClick={() => onSelectLesson(lesson.id)}
                          className={cn(
                            'flex items-center gap-2 w-full text-left px-2 py-1.5 text-sm rounded-md transition-colors',
                            activeLessonId === lesson.id
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                          )}
                        >
                          <BookOpen className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">
                            {lesson.lessonNumber
                              ? `L${lesson.lessonNumber}: `
                              : ''}
                            {lesson.lessonTitle}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </nav>
      </ScrollArea>
    </aside>
  );
}
