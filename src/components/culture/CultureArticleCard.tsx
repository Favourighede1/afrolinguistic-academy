import { Link } from 'react-router-dom';
import { Clock, Calendar, BookOpen, Library } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CulturePost } from '@/data/culture';

interface CultureArticleCardProps {
  post: CulturePost;
}

// Map article slugs to related dictionary search terms
const articleDictionaryMap: Record<string, string> = {
  'ancient-benin-kingdom-legacy': 'greeting',
  'edo-names-meanings-traditions': 'family',
  'traditional-edo-cuisine-flavors': 'food'
};

export function CultureArticleCard({ post }: CultureArticleCardProps) {
  const dictionarySearch = articleDictionaryMap[post.slug];
  
  return (
    <Card className="h-full hover:shadow-md transition-shadow group overflow-hidden flex flex-col">
      {/* Placeholder Image */}
      <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
        <span className="text-4xl opacity-50">
          {post.category === 'History' ? '🏛️' : post.category === 'Traditions' ? '🎭' : '🍲'}
        </span>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <Badge variant="secondary" className="text-xs">
            {post.category}
          </Badge>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readingMinutes} min read
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>
        <Link to={`/culture/${post.slug}`}>
          <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </CardTitle>
        </Link>
      </CardHeader>
      
      <CardContent className="pt-0 flex-1 flex flex-col">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
          {post.excerpt}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Integration Links */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
          <Link 
            to={`/culture/${post.slug}`}
            className="text-xs text-primary hover:underline flex items-center gap-1"
          >
            <BookOpen className="h-3 w-3" />
            Read article
          </Link>
          {dictionarySearch ? (
            <Link 
              to={`/dictionary?category=${dictionarySearch}`}
              className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
            >
              <Library className="h-3 w-3" />
              Related words
            </Link>
          ) : (
            <span className="text-xs text-muted-foreground/60 flex items-center gap-1">
              <Library className="h-3 w-3" />
              More practice coming soon
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
