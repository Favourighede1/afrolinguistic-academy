import { BookOpen, Target, MessageSquare, PenLine, FileText, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import type { YorubaLesson, VocabItem } from '@/data/yoruba-ye-mi';

function VocabChips({ items, label }: { items: VocabItem[]; label: string }) {
  if (!items.length) return null;
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
        {label}
      </h4>
      <div className="flex flex-wrap gap-2">
        {items.map((v) => (
          <Badge
            key={v.yoruba}
            variant="secondary"
            className="text-sm py-1 px-2.5 font-normal"
          >
            <span className="font-semibold">{v.yoruba}</span>
            <span className="mx-1 text-muted-foreground">–</span>
            <span className="text-muted-foreground">{v.english}</span>
          </Badge>
        ))}
      </div>
    </div>
  );
}

interface Props {
  lesson: YorubaLesson;
}

export function YorubaLessonViewer({ lesson }: Props) {
  const vocab = lesson.sections.vocabulary;
  const hasVocab =
    vocab &&
    (vocab.nouns?.length ||
      vocab.verbs?.length ||
      vocab.phrases?.length ||
      vocab.expressions?.length ||
      vocab.interrogatives?.length);

  return (
    <article className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <header>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span className="font-medium text-primary">
            {lesson.chapterNumber === 0 ? 'Introduction' : `Chapter ${lesson.chapterNumber}`}
          </span>
          {lesson.lessonNumber && (
            <>
              <span>/</span>
              <span>Lesson {lesson.lessonNumber}</span>
            </>
          )}
          {lesson.pageStart && (
            <>
              <span className="ml-auto">
                pp. {lesson.pageStart}
                {lesson.pageEnd ? `–${lesson.pageEnd}` : ''}
              </span>
            </>
          )}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold font-serif text-foreground">
          {lesson.lessonTitle}
        </h2>
      </header>

      {/* Summaries */}
      {lesson.summaries.length > 0 && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-2">
          {lesson.summaries.map((s, i) => (
            <p key={i} className="text-sm text-foreground leading-relaxed">
              {s}
            </p>
          ))}
        </div>
      )}

      {/* Objectives */}
      {lesson.objectives.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-primary" />
              Objectives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {lesson.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  {obj}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Accordion for detailed sections */}
      <Accordion type="multiple" defaultValue={['vocab', 'grammar']} className="space-y-2">
        {/* Vocabulary */}
        {hasVocab && (
          <AccordionItem value="vocab" className="border rounded-lg px-4">
            <AccordionTrigger className="hover:no-underline">
              <span className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                Vocabulary
              </span>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pb-4">
              {vocab!.nouns && <VocabChips items={vocab!.nouns} label="Nouns" />}
              {vocab!.verbs && <VocabChips items={vocab!.verbs} label="Verbs" />}
              {vocab!.phrases && <VocabChips items={vocab!.phrases} label="Phrases" />}
              {vocab!.expressions && <VocabChips items={vocab!.expressions} label="Expressions" />}
              {vocab!.interrogatives && <VocabChips items={vocab!.interrogatives} label="Interrogatives" />}
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Grammar Topics */}
        {lesson.sections.grammarTopics && lesson.sections.grammarTopics.length > 0 && (
          <AccordionItem value="grammar" className="border rounded-lg px-4">
            <AccordionTrigger className="hover:no-underline">
              <span className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                Grammar Topics
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <ul className="space-y-2">
                {lesson.sections.grammarTopics.map((topic, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    <span className="text-muted-foreground">{topic}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Dialogues */}
        {lesson.sections.dialogues && lesson.sections.dialogues.length > 0 && (
          <AccordionItem value="dialogues" className="border rounded-lg px-4">
            <AccordionTrigger className="hover:no-underline">
              <span className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                Dialogues
              </span>
            </AccordionTrigger>
            <AccordionContent className="space-y-3 pb-4">
              {lesson.sections.dialogues.map((d, i) => (
                <div key={i} className="bg-muted/50 rounded-md p-3">
                  <p className="font-medium text-sm text-foreground">{d.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{d.summary}</p>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Exercises */}
        {lesson.sections.exercises && lesson.sections.exercises.length > 0 && (
          <AccordionItem value="exercises" className="border rounded-lg px-4">
            <AccordionTrigger className="hover:no-underline">
              <span className="flex items-center gap-2">
                <PenLine className="h-4 w-4 text-primary" />
                Exercises
              </span>
            </AccordionTrigger>
            <AccordionContent className="space-y-2 pb-4">
              {lesson.sections.exercises.map((ex, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <Badge variant="outline" className="shrink-0 text-xs">
                    {ex.title}
                  </Badge>
                  {ex.notes && (
                    <span className="text-muted-foreground">{ex.notes}</span>
                  )}
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>

      {/* Tags */}
      {lesson.tags.length > 0 && (
        <>
          <Separator />
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="h-4 w-4 text-muted-foreground" />
            {lesson.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </>
      )}
    </article>
  );
}
