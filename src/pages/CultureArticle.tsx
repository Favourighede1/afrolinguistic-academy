import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/layout/Layout';
import { getCulturePostBySlug } from '@/data/culture';

export default function CultureArticle() {
  const { slug } = useParams<{ slug: string }>();
  const post = getCulturePostBySlug(slug || '');

  if (!post) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/culture">Back to Culture</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <Link 
              to="/culture" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Culture
            </Link>

            {/* Header */}
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge variant="secondary">{post.category}</Badge>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readingMinutes} min read
                </span>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-4">
                {post.title}
              </h1>
              <p className="text-lg text-muted-foreground">
                {post.excerpt}
              </p>
            </header>

            {/* Featured Image Placeholder */}
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mb-8">
              <span className="text-6xl opacity-50">📖</span>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {post.content.split('\n').map((paragraph, idx) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={idx} className="text-2xl font-bold font-serif mt-8 mb-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={idx} className="text-xl font-semibold mt-6 mb-3">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('- ')) {
                  return (
                    <li key={idx} className="text-muted-foreground ml-4">
                      {paragraph.replace('- ', '')}
                    </li>
                  );
                }
                if (paragraph.startsWith('| ')) {
                  return null; // Skip table formatting for now
                }
                if (paragraph.trim()) {
                  return (
                    <p key={idx} className="text-muted-foreground mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  );
                }
                return null;
              })}
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="h-4 w-4 text-muted-foreground" />
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
}
