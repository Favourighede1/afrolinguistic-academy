import { Link } from 'react-router-dom';
import { Clock, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { getCulturePostsByLanguage } from '@/data/culture';

export default function Culture() {
  const { selectedLanguage } = useLanguage();
  const posts = getCulturePostsByLanguage(selectedLanguage.id);

  const categories = [...new Set(posts.map(p => p.category))];

  return (
    <Layout>
      {/* Header */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 via-background to-accent/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-4">
              {selectedLanguage.name} Culture
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore the history, traditions, and stories behind the language.
              Understanding culture enriches your learning journey.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="py-4 border-b border-border bg-card">
          <div className="container">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Badge key={cat} variant="secondary">
                  {cat}
                </Badge>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-12">
        <div className="container">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link key={post.id} to={`/culture/${post.slug}`}>
                  <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group overflow-hidden">
                    {/* Placeholder Image */}
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <span className="text-4xl opacity-50">📖</span>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {post.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readingMinutes} min read
                        </span>
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Culture articles for {selectedLanguage.name} are coming soon.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
