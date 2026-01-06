import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { getCulturePostsByLanguage } from '@/data/culture';
import { CultureFilters } from '@/components/culture/CultureFilters';
import { CultureArticleCard } from '@/components/culture/CultureArticleCard';
import { ComingSoonLanguages } from '@/components/culture/ComingSoonLanguages';

export default function Culture() {
  const { selectedLanguage } = useLanguage();
  const posts = getCulturePostsByLanguage(selectedLanguage.id);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => 
    [...new Set(posts.map(p => p.category))],
    [posts]
  );

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      // Category filter
      if (selectedCategory !== 'All' && post.category !== selectedCategory) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = post.title.toLowerCase().includes(query);
        const matchesTags = post.tags.some(tag => tag.toLowerCase().includes(query));
        const matchesContent = post.content.toLowerCase().includes(query);
        const matchesExcerpt = post.excerpt.toLowerCase().includes(query);
        
        return matchesTitle || matchesTags || matchesContent || matchesExcerpt;
      }

      return true;
    });
  }, [posts, selectedCategory, searchQuery]);

  return (
    <Layout>
      <Helmet>
        <title>{selectedLanguage.name} Culture | Afrolinguistic Academy</title>
        <meta 
          name="description" 
          content={`Explore ${selectedLanguage.name} culture, history, traditions, and food. Learn real-life vocabulary and phrases used by ${selectedLanguage.name} speakers.`} 
        />
      </Helmet>

      {/* Featured Article Hero */}
      {posts.length > 0 && (
        <section className="py-12 md:py-16 bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <Badge variant="outline" className="mb-4">
                Featured Article
              </Badge>
              <Card className="overflow-hidden border-primary/20">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="aspect-video md:aspect-auto bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <span className="text-8xl opacity-50">
                      {posts[0].category === 'History' ? '🏛️' : posts[0].category === 'Traditions' ? '🎭' : '🍲'}
                    </span>
                  </div>
                  <CardContent className="p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary">{posts[0].category}</Badge>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {posts[0].readingMinutes} min read
                      </span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold font-serif text-foreground mb-3">
                      {posts[0].title}
                    </h1>
                    <p className="text-muted-foreground mb-6">
                      {posts[0].excerpt}
                    </p>
                    <Button asChild className="w-fit gap-2">
                      <Link to={`/culture/${posts[0].slug}`}>
                        Read Article
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Header */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 via-background to-accent/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">
              Language: {selectedLanguage.name}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-4">
              {selectedLanguage.name} Culture
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              Explore the history, traditions, and stories behind the language.
              Understanding culture enriches your learning journey.
            </p>
            <p className="text-sm text-primary font-medium">
              Use these articles to learn real-life vocabulary, names, and phrases used by {selectedLanguage.name} speakers.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b border-border bg-card">
        <div className="container">
          <CultureFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={categories}
          />
        </div>
      </section>

      {/* Articles Grid - exclude first article if showing featured hero */}
      <section className="py-12">
        <div className="container">
          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-6">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {searchQuery && ` for "${searchQuery}"`}
          </p>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Skip first post if no filters are applied (it's shown in hero) */}
              {(selectedCategory === 'All' && !searchQuery ? filteredPosts.slice(1) : filteredPosts).map((post) => (
                <CultureArticleCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-2">
                No articles match your search.
              </p>
              <p className="text-sm text-muted-foreground">
                Try a different search term or category filter.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Coming Soon Languages */}
      <ComingSoonLanguages />
    </Layout>
  );
}
