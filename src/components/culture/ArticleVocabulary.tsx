import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface VocabItem {
  edo: string;
  pronunciation: string;
  english: string;
}

interface ArticleVocabularyProps {
  articleTitle: string;
  vocabulary: VocabItem[];
}

export function ArticleVocabulary({ articleTitle, vocabulary }: ArticleVocabularyProps) {
  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Key Edo Vocabulary
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Words and phrases from this article
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {vocabulary.map((item, idx) => (
          <div 
            key={idx} 
            className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 py-2 border-b border-border/50 last:border-0"
          >
            <span className="font-semibold text-foreground">{item.edo}</span>
            <span className="text-sm text-muted-foreground hidden sm:inline">•</span>
            <span className="text-sm text-muted-foreground italic">{item.pronunciation}</span>
            <span className="text-sm text-muted-foreground hidden sm:inline">—</span>
            <span className="text-sm text-foreground">{item.english}</span>
          </div>
        ))}

        <Button variant="outline" className="w-full mt-4" asChild>
          <Link to="/practice">
            <GraduationCap className="h-4 w-4 mr-2" />
            Practice these words
          </Link>
        </Button>
        <p className="text-xs text-center text-muted-foreground">
          Custom vocabulary decks coming soon
        </p>
      </CardContent>
    </Card>
  );
}
