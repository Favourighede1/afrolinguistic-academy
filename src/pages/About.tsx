import { Link } from 'react-router-dom';
import { Heart, Users, Globe, MessageSquare, ArrowRight, BookOpen, Languages, Mic, CheckCircle, Mail, ExternalLink, GraduationCap, FileText, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';
import { Badge } from '@/components/ui/badge';

const team = [
  {
    name: 'Osaze E.',
    role: 'Founder & Lead Instructor',
    bio: 'Native Edo speaker building this platform to preserve and share African languages.',
    isPlaceholder: false
  },
  {
    name: 'Community Contributors',
    role: 'Curriculum & Content',
    bio: 'Native speakers and linguists who review lessons and contribute cultural context.',
    isPlaceholder: true
  }
];

const values = [
  {
    icon: Heart,
    title: 'Free Forever',
    description: 'Language learning should be accessible to everyone, regardless of financial situation.'
  },
  {
    icon: Globe,
    title: 'Cultural Preservation',
    description: "Every language carries centuries of wisdom. We're committed to keeping that heritage alive."
  },
  {
    icon: Users,
    title: 'Community-Driven',
    description: 'Our content is shaped by learners and native speakers working together.'
  }
];

const features = [
  { icon: BookOpen, text: 'Free lessons with vocabulary, phrases, and grammar' },
  { icon: GraduationCap, text: 'Practice with flashcards and quizzes' },
  { icon: FileText, text: 'Dictionary and culture notes' },
  { icon: CheckCircle, text: 'Optional sign-in to sync progress across devices' },
  { icon: Volume2, text: 'Audio pronunciation (coming soon)', comingSoon: true }
];

const metrics = [
  { label: 'Languages available', value: '1', detail: 'Edo' },
  { label: 'Lessons published', value: '3', detail: 'More added monthly' },
  { label: 'Dictionary entries', value: '25+', detail: 'Growing weekly' },
  { label: 'Price', value: '$0', detail: '100% Free Forever' }
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary/5 via-background to-accent/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-6">
              Making African Languages Accessible to Everyone
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Afrolinguistic Academy is a free platform for learning African languages, 
              starting with Edo. We combine structured lessons, practice tools, and cultural 
              context to help you achieve real fluency.
            </p>
          </div>
        </div>
      </section>

      {/* What You Can Do Here */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold font-serif text-center mb-8">What You Can Do Here</h2>
            <div className="grid gap-4">
              {features.map((feature) => (
                <div 
                  key={feature.text} 
                  className="flex items-start gap-3 p-4 rounded-lg bg-card border"
                >
                  <feature.icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-foreground">{feature.text}</span>
                    {feature.comingSoon && (
                      <Badge variant="secondary" className="text-xs">Coming soon</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact / Progress So Far */}
      <section className="py-12 md:py-16 bg-card">
        <div className="container">
          <h2 className="text-3xl font-bold font-serif text-center mb-2">Progress So Far</h2>
          <p className="text-center text-muted-foreground mb-8 text-sm">
            Numbers update as we publish new content.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {metrics.map((metric) => (
              <Card key={metric.label} className="text-center border-none shadow-sm">
                <CardContent className="pt-6 pb-4">
                  <p className="text-3xl font-bold text-primary mb-1">{metric.value}</p>
                  <p className="font-medium text-sm">{metric.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{metric.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold font-serif text-center mb-8">Our Story</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-4">
                African languages represent some of humanity's oldest and most diverse linguistic traditions. 
                Yet for English speakers who want to learn them, resources are scarce, expensive, or outdated.
              </p>
              <p className="mb-4">
                Afrolinguistic Academy was founded to change that. We believe that language is the key to 
                understanding culture, and that everyone—whether connecting with heritage, preparing for 
                travel, or simply curious—deserves high-quality learning materials.
              </p>
              <p>
                Starting with Edo, we're building a comprehensive platform that will eventually cover 
                languages from every region of Africa. Our approach combines structured progression, 
                cultural context, and practice tools to help you achieve real fluency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Build Lessons */}
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold font-serif text-center mb-8">How We Build Lessons</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-none shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Languages className="h-5 w-5 text-primary mt-1 shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Native Speaker Involvement</h3>
                      <p className="text-sm text-muted-foreground">
                        Every lesson is created or reviewed by native speakers to ensure accuracy and natural usage.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Quality Review</h3>
                      <p className="text-sm text-muted-foreground">
                        Content goes through multiple review stages before publishing to catch errors.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Mic className="h-5 w-5 text-primary mt-1 shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Audio & Pronunciation</h3>
                      <p className="text-sm text-muted-foreground">
                        We're recording native speaker audio for all vocabulary. This is in progress—check back soon.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <MessageSquare className="h-5 w-5 text-primary mt-1 shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Community Feedback</h3>
                      <p className="text-sm text-muted-foreground">
                        Found an error? Have a suggestion? Use the Contact page to let us know—we fix issues quickly.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 md:py-16">
        <div className="container">
          <h2 className="text-3xl font-bold font-serif text-center mb-10">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {values.map((value) => (
              <Card key={value.title} className="text-center border-none shadow-sm">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-12 md:py-16 bg-card">
        <div className="container">
          <h2 className="text-3xl font-bold font-serif text-center mb-10">Who's Behind This</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {team.map((member) => (
              <Card key={member.name} className="text-center">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-primary mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                  {member.isPlaceholder && (
                    <p className="text-xs text-muted-foreground/60 mt-2 italic">
                      Want to join? See below.
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold font-serif text-center mb-8">Ready to Get Started?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link to="/lessons">
                  <BookOpen className="h-4 w-4" />
                  Start Learning Edo
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link to="/contact">
                  <MessageSquare className="h-4 w-4" />
                  Request a Lesson Topic
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="gap-2">
                <Link to="/contact">
                  <Users className="h-4 w-4" />
                  Contribute as a Native Speaker
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Help Us Grow */}
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container">
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="p-8">
              <Mail className="h-10 w-10 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold font-serif mb-2">
                Stay Updated
              </h2>
              <p className="text-muted-foreground mb-6">
                New lessons, languages, and features are coming. Visit our Contact page to get in touch 
                or subscribe to updates.
              </p>
              <Button asChild className="gap-2">
                <Link to="/contact">
                  Get in Touch
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
