import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface VocabItem {
  edo: string;
  english: string;
}

interface PhraseItem {
  edo: string;
  english: string;
}

interface FoodVocabularyListProps {
  vocabulary: VocabItem[];
  phrases: PhraseItem[];
}

export function FoodVocabularyList({ vocabulary, phrases }: FoodVocabularyListProps) {
  return (
    <div className="space-y-6 my-8">
      {/* Vocabulary Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Common Food Vocabulary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {vocabulary.map((item, idx) => (
              <div key={idx} className="bg-muted/50 rounded-lg p-3 text-center">
                <span className="block font-semibold text-foreground">{item.edo}</span>
                <span className="text-sm text-muted-foreground">{item.english}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Phrase Cards */}
      <div>
        <h4 className="font-semibold text-foreground mb-3">Practice Phrases</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {phrases.map((phrase, idx) => (
            <Card key={idx} className="bg-primary/5 border-primary/20">
              <CardContent className="p-4 text-center">
                <Badge variant="outline" className="mb-2 text-xs">Phrase</Badge>
                <p className="font-semibold text-foreground text-lg mb-1">{phrase.edo}</p>
                <p className="text-sm text-muted-foreground">{phrase.english}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
