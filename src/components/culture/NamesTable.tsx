import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface NameItem {
  name: string;
  meaning: string;
}

interface NamesTableProps {
  maleNames: NameItem[];
  femaleNames: NameItem[];
}

export function NamesTable({ maleNames, femaleNames }: NamesTableProps) {
  return (
    <div className="space-y-6 my-8">
      <div className="bg-muted/30 rounded-lg p-4 mb-6">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Note for learners:</strong> Many Edo names contain common roots like{' '}
          <span className="font-semibold">Osa-</span> (God), <span className="font-semibold">Ehi-</span> (destiny/time), and{' '}
          <span className="font-semibold">Osa-</span>. Recognizing these patterns helps you understand new names you encounter!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Male Names */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Badge variant="secondary">Male Names</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {maleNames.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start py-2 border-b border-border/50 last:border-0">
                <span className="font-semibold text-foreground">{item.name}</span>
                <span className="text-sm text-muted-foreground text-right max-w-[60%]">{item.meaning}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Female Names */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Badge variant="secondary">Female Names</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {femaleNames.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start py-2 border-b border-border/50 last:border-0">
                <span className="font-semibold text-foreground">{item.name}</span>
                <span className="text-sm text-muted-foreground text-right max-w-[60%]">{item.meaning}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
