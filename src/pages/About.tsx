import { Link } from 'react-router-dom';
import { Heart, Users, Globe, MessageSquare, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';

const team = [
  {
    name: 'Osaze E.',
    role: 'Founder & Lead Instructor',
    bio: 'Native Edo speaker passionate about preserving and sharing African languages.'
  },
  {
    name: 'Amara N.',
    role: 'Curriculum Developer',
    bio: 'Linguist specializing in West African languages with 10+ years teaching experience.'
  },
  {
    name: 'Kofi A.',
    role: 'Content Creator',
    bio: 'Cultural researcher documenting traditions and stories from across Africa.'
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
            <p className="text-lg text-muted-foreground">
              Afrolinguistic Academy was created to bridge the gap between English speakers 
              and the rich linguistic heritage of Africa. Our mission is simple: make learning 
              African languages easy, enjoyable, and completely free.
            </p>
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
                languages from every region of Africa. Our approach combines audio-first learning, 
                cultural context, and structured progression to help you achieve real fluency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 md:py-16 bg-card">
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
      <section className="py-12 md:py-16">
        <div className="container">
          <h2 className="text-3xl font-bold font-serif text-center mb-10">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {team.map((member) => (
              <Card key={member.name} className="text-center">
                <CardContent className="pt-6">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-primary mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container">
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="p-8">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold font-serif mb-2">
                Help Us Grow
              </h2>
              <p className="text-muted-foreground mb-6">
                Are you a native speaker who wants to contribute? Have ideas for new lessons 
                or languages? We'd love to hear from you.
              </p>
              <Button asChild className="gap-2">
                <Link to="/contact">
                  Request a Lesson Topic
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
