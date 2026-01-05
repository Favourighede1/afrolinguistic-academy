import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Clock, Calendar, Tag, BookOpen, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/layout/Layout';
import { NextStepPanel } from '@/components/NextStepPanel';
import { getCulturePostBySlug } from '@/data/culture';
import { ArticleVocabulary } from '@/components/culture/ArticleVocabulary';
import { ArticleTableOfContents } from '@/components/culture/ArticleTableOfContents';
import { NamesTable } from '@/components/culture/NamesTable';
import { FoodVocabularyList } from '@/components/culture/FoodVocabularyList';

// Vocabulary data for each article
const articleVocabulary: Record<string, Array<{ edo: string; pronunciation: string; english: string }>> = {
  'ancient-benin-kingdom-legacy': [
    { edo: 'Oba', pronunciation: 'OH-bah', english: 'King/Ruler' },
    { edo: 'Ẹdó', pronunciation: 'eh-DOH', english: 'The Edo people and land' },
    { edo: 'Ọba na gha tọ ẹse', pronunciation: 'oh-bah nah gah toh eh-seh', english: 'May the Oba live long' },
    { edo: 'Ẹwua', pronunciation: 'eh-WOO-ah', english: 'Palace' },
    { edo: 'Ọghẹ', pronunciation: 'oh-GEH', english: 'Chief' },
    { edo: 'Iye', pronunciation: 'ee-YEH', english: 'Mother' },
    { edo: 'Erha', pronunciation: 'EHR-hah', english: 'Father' },
  ],
  'edo-names-meanings-traditions': [
    { edo: 'Osaze', pronunciation: 'oh-SAH-zeh', english: 'God has chosen' },
    { edo: 'Osagie', pronunciation: 'oh-SAH-gee-eh', english: 'God has agreed' },
    { edo: 'Ivie', pronunciation: 'ee-VEE-eh', english: 'Precious/jewel' },
    { edo: 'Ehi', pronunciation: 'EH-hee', english: 'Destiny/time' },
    { edo: 'Omon', pronunciation: 'oh-MOHN', english: 'Child' },
    { edo: 'Ẹrẹn', pronunciation: 'eh-REHN', english: 'Name' },
  ],
  'traditional-edo-cuisine-flavors': [
    { edo: 'Ẹvbarie', pronunciation: 'ehv-BAH-ree-eh', english: 'Food' },
    { edo: 'Amẹ', pronunciation: 'ah-MEH', english: 'Water' },
    { edo: 'Ẹma', pronunciation: 'EH-mah', english: 'Pounded yam' },
    { edo: 'Eran', pronunciation: 'eh-RAHN', english: 'Meat' },
    { edo: 'Ẹhẹn', pronunciation: 'EH-hehn', english: 'Fish' },
    { edo: 'Iyan', pronunciation: 'ee-YAHN', english: 'Yam' },
    { edo: 'Ọka', pronunciation: 'oh-KAH', english: 'Corn' },
  ]
};

// Names data for the names article
const namesData = {
  male: [
    { name: 'Osaze', meaning: 'God has chosen' },
    { name: 'Osagie', meaning: 'God has agreed' },
    { name: 'Ehigie', meaning: 'Time/destiny is good' },
    { name: 'Osakpolor', meaning: 'God is the greatest' },
  ],
  female: [
    { name: 'Ivie', meaning: 'Precious/jewel' },
    { name: 'Osamudiamen', meaning: 'God knows my heart' },
    { name: 'Ehi', meaning: 'Destiny/time' },
    { name: 'Osarugue', meaning: 'God is my strength' },
  ]
};

// Food vocabulary for the cuisine article
const foodData = {
  vocabulary: [
    { edo: 'Ẹvbarie', english: 'Food' },
    { edo: 'Amẹ', english: 'Water' },
    { edo: 'Ẹma', english: 'Pounded yam' },
    { edo: 'Eran', english: 'Meat' },
    { edo: 'Ẹhẹn', english: 'Fish' },
    { edo: 'Iyan', english: 'Yam' },
    { edo: 'Ọka', english: 'Corn' },
  ],
  phrases: [
    { edo: 'I hoo amẹ', english: 'I want water' },
    { edo: 'Ẹvbarie na wọrọ', english: 'This food is delicious' },
    { edo: 'I re ẹma', english: 'I am eating pounded yam' },
  ]
};

export default function CultureArticle() {
  const { slug } = useParams<{ slug: string }>();
  const post = getCulturePostBySlug(slug || '');

  // Parse headings for TOC
  const headings = useMemo(() => {
    if (!post) return [];
    const lines = post.content.split('\n');
    const result: Array<{ id: string; title: string; level: number }> = [];
    
    lines.forEach((line) => {
      if (line.startsWith('## ')) {
        const title = line.replace('## ', '').trim();
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        result.push({ id, title, level: 2 });
      } else if (line.startsWith('### ')) {
        const title = line.replace('### ', '').trim();
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        result.push({ id, title, level: 3 });
      }
    });
    
    return result;
  }, [post]);

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

  const vocabulary = articleVocabulary[post.slug] || [];
  const isNamesArticle = post.slug === 'edo-names-meanings-traditions';
  const isFoodArticle = post.slug === 'traditional-edo-cuisine-flavors';

  // Render content with proper heading IDs
  const renderContent = () => {
    return post.content.split('\n').map((paragraph, idx) => {
      if (paragraph.startsWith('## ')) {
        const title = paragraph.replace('## ', '').trim();
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        
        // Insert special components after specific headings
        const showNamesTable = isNamesArticle && title === 'Common Edo Names and Their Meanings';
        const showFoodVocab = isFoodArticle && title === 'Common Food Vocabulary';
        
        return (
          <div key={idx}>
            <h2 id={id} className="text-2xl font-bold font-serif mt-10 mb-4 scroll-mt-20">
              {title}
            </h2>
            {showNamesTable && (
              <NamesTable maleNames={namesData.male} femaleNames={namesData.female} />
            )}
            {showFoodVocab && (
              <FoodVocabularyList vocabulary={foodData.vocabulary} phrases={foodData.phrases} />
            )}
          </div>
        );
      }
      if (paragraph.startsWith('### ')) {
        const title = paragraph.replace('### ', '').trim();
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        // Skip male/female names headings if we're showing the table
        if (isNamesArticle && (title === 'Male Names' || title === 'Female Names')) {
          return null;
        }
        return (
          <h3 key={idx} id={id} className="text-xl font-semibold mt-8 mb-3 scroll-mt-20">
            {title}
          </h3>
        );
      }
      if (paragraph.startsWith('- ')) {
        // Skip individual name listings if we're showing the table
        if (isNamesArticle && paragraph.includes('**')) {
          return null;
        }
        return (
          <li key={idx} className="text-muted-foreground ml-4 mb-1">
            {paragraph.replace('- ', '')}
          </li>
        );
      }
      if (paragraph.startsWith('| ') || paragraph.startsWith('|--')) {
        return null; // Skip table formatting, we're using custom components
      }
      if (paragraph.trim()) {
        // Skip vocabulary items if we're showing custom food vocab
        if (isFoodArticle && paragraph.includes('| ')) {
          return null;
        }
        return (
          <p key={idx} className="text-muted-foreground mb-4 leading-relaxed">
            {paragraph}
          </p>
        );
      }
      return null;
    });
  };

  return (
    <Layout>
      <Helmet>
        <title>{post.title} | Edo Culture | Afrolinguistic Academy</title>
        <meta 
          name="description" 
          content={post.excerpt} 
        />
      </Helmet>

      <article className="py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
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
              <span className="text-6xl opacity-50">
                {post.category === 'History' ? '🏛️' : post.category === 'Traditions' ? '🎭' : '🍲'}
              </span>
            </div>

            {/* Two-column layout for content + vocabulary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Table of Contents */}
                <ArticleTableOfContents headings={headings} />

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                  {renderContent()}
                </div>
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="sticky top-24">
                  {vocabulary.length > 0 && (
                    <ArticleVocabulary 
                      articleTitle={post.title}
                      vocabulary={vocabulary}
                    />
                  )}
                </div>
              </aside>
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

            {/* Next Steps Panel */}
            <div className="mt-8">
              <NextStepPanel
                title="Continue Learning"
                description="Study the vocabulary from this article or explore more."
                actions={[
                  {
                    label: 'Search in Dictionary',
                    href: '/dictionary',
                    icon: Search
                  },
                  {
                    label: 'Start a Lesson',
                    href: '/lessons',
                    icon: BookOpen,
                    variant: 'outline'
                  }
                ]}
              />
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
}
