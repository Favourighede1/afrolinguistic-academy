import { Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const comingSoonLanguages = [
  { name: 'Yoruba', flag: '🇳🇬', description: 'Rich traditions from Western Nigeria' },
  { name: 'Igbo', flag: '🇳🇬', description: 'Culture of the Eastern region' },
  { name: 'Swahili', flag: '🇰🇪', description: 'East African heritage' }
];

export function ComingSoonLanguages() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold font-serif text-foreground mb-2">
            More Languages Coming Soon
          </h2>
          <p className="text-muted-foreground">
            Explore culture articles in these languages as we expand our library.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {comingSoonLanguages.map((lang) => (
            <Card key={lang.name} className="relative overflow-hidden opacity-75">
              <CardContent className="p-4 text-center">
                <span className="text-3xl mb-2 block">{lang.flag}</span>
                <h3 className="font-semibold text-foreground">{lang.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{lang.description}</p>
                <Badge variant="secondary" className="mt-3 text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  Coming soon
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
