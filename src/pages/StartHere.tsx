import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Headphones, 
  PenTool, 
  ArrowRight, 
  CheckCircle,
  Lightbulb,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';

const pronunciationGuide = [
  {
    letter: 'Ọ / ọ',
    sound: 'Like "o" in "hot" but more open',
    example: 'Ọbọkhian (Good morning)'
  },
  {
    letter: 'Ẹ / ẹ',
    sound: 'Like "e" in "bed"',
    example: 'Ẹvbo (Place)'
  },
  {
    letter: 'Vb',
    sound: 'A unique Edo sound—lips together, voiced',
    example: 'Vbẹẹ (Yes)'
  },
  {
    letter: 'Kp',
    sound: 'Blend of "k" and "p" pronounced together',
    example: 'Ọkpa (One)'
  },
  {
    letter: 'Gb',
    sound: 'Blend of "g" and "b" pronounced together',
    example: 'Gbe (To stay)'
  },
  {
    letter: 'Gh',
    sound: 'A soft, voiced sound made in the throat',
    example: 'Ghẹ (To know)'
  }
];

const beginnerTips = [
  {
    icon: Headphones,
    title: 'Listen First, Speak Second',
    description: 'Edo is a tonal language. The same word can have different meanings based on tone. Spend time listening before trying to speak.'
  },
  {
    icon: PenTool,
    title: 'Practice the Special Letters',
    description: 'Letters like Ọ, Ẹ, and combinations like Vb are essential. Master these early and everything else becomes easier.'
  },
  {
    icon: BookOpen,
    title: 'Learn Phrases, Not Just Words',
    description: "Context matters in Edo. Learning complete phrases helps you understand how words work together."
  },
  {
    icon: Lightbulb,
    title: 'Embrace the Culture',
    description: 'Language and culture are inseparable. Read our culture articles to understand the meaning behind the words.'
  }
];

const learningPath = [
  {
    level: 'Beginner',
    description: 'Build your foundation',
    topics: ['Greetings & Politeness', 'Introducing Yourself', 'Numbers 1-20', 'Family Members', 'Basic Verbs'],
    lessons: 5,
    weeks: '4-6 weeks'
  },
  {
    level: 'Intermediate',
    description: 'Expand your abilities',
    topics: ['Food & Dining', 'Travel & Directions', 'Market Conversations', 'Past & Future Tense', 'Cultural Expressions'],
    lessons: 8,
    weeks: '8-12 weeks'
  }
];

export default function StartHere() {
  const { selectedLanguage } = useLanguage();

  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 via-background to-accent/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4" variant="secondary">
              {selectedLanguage.name} Course
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-6">
              Start Here: Your Guide to Learning {selectedLanguage.name}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {selectedLanguage.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="gap-2">
                <Link to="/lessons/edo-greetings">
                  Start Lesson 1
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" disabled className="gap-2 cursor-not-allowed">
                Take Placement Quiz
                <span className="text-xs bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded ml-1">Coming Soon</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pronunciation Basics */}
      <section className="py-12 md:py-16">
        <div className="container">
          <h2 className="text-3xl font-bold font-serif text-center mb-4">
            Pronunciation Basics
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            {selectedLanguage.name} uses special characters that English doesn't have. Here's how to pronounce them.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {pronunciationGuide.map((item) => (
              <Card key={item.letter} className="border-border">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary font-mono mb-2">
                    {item.letter}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{item.sound}</p>
                  <p className="text-sm font-medium">
                    <span className="text-muted-foreground">Example:</span> {item.example}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Beginner Tips */}
      <section className="py-12 md:py-16 bg-card">
        <div className="container">
          <h2 className="text-3xl font-bold font-serif text-center mb-4">
            Tips for Success
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Set yourself up for success with these proven learning strategies.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {beginnerTips.map((tip) => (
              <Card key={tip.title} className="border-none shadow-sm">
                <CardContent className="pt-6 flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <tip.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{tip.title}</h3>
                    <p className="text-sm text-muted-foreground">{tip.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-12 md:py-16">
        <div className="container">
          <h2 className="text-3xl font-bold font-serif text-center mb-4">
            Your Learning Path
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Follow our structured curriculum from beginner to intermediate.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {learningPath.map((level, idx) => (
              <Card key={level.level} className={idx === 0 ? 'border-primary/30 bg-primary/5' : ''}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={idx === 0 ? 'default' : 'secondary'}>
                      {level.level}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{level.weeks}</span>
                  </div>
                  <CardTitle>{level.description}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {level.topics.map((topic) => (
                      <li key={topic} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-accent-foreground" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-muted-foreground">
                    {level.lessons} lessons available
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Placement Quiz CTA */}
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container">
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="p-8">
              <Target className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold font-serif mb-2">
                Not Sure Where to Start?
              </h2>
              <p className="text-muted-foreground mb-6">
                Our placement quiz will help you find lessons matched to your level. 
                For now, we recommend starting with Lesson 1.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" asChild className="gap-2">
                  <Link to="/lessons/edo-greetings">
                    Start Lesson 1
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" disabled className="gap-2 cursor-not-allowed">
                  Placement Quiz
                  <span className="text-xs bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded ml-1">Soon</span>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Placement quiz coming soon • No account required
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
