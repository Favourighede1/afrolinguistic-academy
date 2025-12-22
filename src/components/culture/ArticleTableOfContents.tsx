import { List } from 'lucide-react';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface ArticleTableOfContentsProps {
  headings: TocItem[];
}

export function ArticleTableOfContents({ headings }: ArticleTableOfContentsProps) {
  if (headings.length < 3) return null;

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-muted/50 rounded-lg p-4 mb-8">
      <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
        <List className="h-4 w-4" />
        In This Article
      </h3>
      <nav className="space-y-1">
        {headings.map((heading) => (
          <button
            key={heading.id}
            onClick={() => scrollToHeading(heading.id)}
            className={`block text-sm text-left w-full hover:text-primary transition-colors ${
              heading.level === 2 
                ? 'text-muted-foreground font-medium' 
                : 'text-muted-foreground/80 pl-4'
            }`}
          >
            {heading.title}
          </button>
        ))}
      </nav>
    </div>
  );
}
