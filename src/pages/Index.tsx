import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Headphones, 
  Layers, 
  Brain, 
  Trophy,
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Layout } from '@/components/layout/Layout';
import { LessonCard } from '@/components/LessonCard';
import { SubscribeForm } from '@/components/SubscribeForm';
import { ContinueLearning } from '@/components/ContinueLearning';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLessonsByLanguage } from '@/data/lessons';
import { useLessonProgress } from '@/hooks/useLessonProgress';

const features = [
  {
    icon: BookOpen,
    title: 'Bite-Size Lessons',
    description: 'Learn in 15-minute sessions that fit your busy schedule.'
  },
  {
    icon: Headphones,
    title: 'Native Audio (Coming Soon)',
    description: 'Native speaker pronunciation for vocabulary—currently in development.'
  },
  {
    icon: Layers,
    title: 'Smart Flashcards',
    description: 'Spaced repetition helps you remember vocabulary longer.'
  },
  {
    icon: Brain,
    title: 'Interactive Quizzes',
    description: 'Test your knowledge with multiple choice and typing exercises.'
  },
  {
    icon: Trophy,
    title: 'Track Progress',
    description: 'Optional accounts let you save streaks and achievements.'
  }
];

const testimonials = [
  {
    quote: "Finally, a way to learn my grandmother's language! The lessons are clear and the cultural context makes everything meaningful.",
    name: "Adaeze O.",
    location: "Atlanta, USA"
  },
  {
    quote: "I've tried other apps but none focused on African languages. Afrolinguistic Academy filled that gap perfectly.",
    name: "Marcus J.",
    location: "London, UK"
  },
  {
    quote: "The bite-sized lessons are perfect for my commute. I'm learning Edo one train ride at a time.",
    name: "Chisom E.",
    location: "Lagos, Nigeria"
  }
];

const faqs = [
  {
    question: "Is this really 100% free?",
    answer: "Yes! Afrolinguistic Academy is completely free with no hidden costs, subscriptions, or paywalls. Our mission is to make African languages accessible to everyone."
  },
  {
    question: "Do I need to create an account?",
    answer: "No! You can access all lessons, the dictionary, and cultural content without signing up. Accounts are optional and only needed if you want to save your progress, favorites, and learning streaks."
  },
  {
    question: "Which languages are available?",
    answer: "We currently offer Edo (from Nigeria). Yoruba, Igbo, and Swahili are coming soon. We're working to add more African languages based on community feedback."
  },
  {
    question: "How long does it take to learn a language?",
    answer: "It varies by person and goals. Our structured lessons help you have basic conversations within weeks. With consistent 15-minute daily practice, you'll build solid foundations in a few months."
  },
  {
    question: "Can I use this on my phone?",
    answer: "Absolutely! The website is fully responsive and works great on mobile browsers. No app download needed."
  }
];

export default function Index() {
  const { selectedLanguage } = useLanguage();
  const lessons = getLessonsByLanguage(selectedLanguage.id);
  const sampleLesson = lessons[0];
  const { getInProgressCount, getCompletedCount } = useLessonProgress();
  const hasStartedLearning = getInProgressCount() > 0 || getCompletedCount() > 0;

  return (
    <Layout>
      {/* Continue Learning Banner (for returning users) */}
      {hasStartedLearning && (
        <section className="py-4 bg-card border-b border-border">
          <div className="container">
            <ContinueLearning variant="banner" />
          </div>
        </section>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/10">
        <div className="container py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-foreground mb-6">
              Learn African Languages for Free
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start speaking {selectedLanguage.name} today. Structured lessons, cultural context, 
              and native audio coming soon—no account required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="gap-2">
                <Link to="/lessons/edo-greetings">
                  Start Lesson 1
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="gap-2 relative">
                <Link to="/start-here">
                  Take Placement Quiz
                  <span className="text-xs bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded ml-1">Soon</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/30 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-20 bg-card">
        <div className="container">
          <h2 className="text-3xl font-bold font-serif text-center mb-4">
            Everything You Need to Learn
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Our structured approach combines vocabulary, listening practice, grammar, and culture.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center border-none shadow-sm">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Lesson Preview */}
      {sampleLesson && (
        <section className="py-16 md:py-20">
          <div className="container">
            <h2 className="text-3xl font-bold font-serif text-center mb-4">
              Preview a Lesson
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Get a taste of what you'll learn. This is one of our beginner lessons in {selectedLanguage.name}.
            </p>
            <div className="max-w-md mx-auto">
              <LessonCard lesson={sampleLesson} />
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container">
          <h2 className="text-3xl font-bold font-serif text-center mb-12">
            What Learners Are Saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="bg-card">
                <CardContent className="pt-6">
                  <blockquote className="text-muted-foreground mb-4">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Email Capture */}
      <section className="py-16 md:py-20">
        <div className="container">
          <SubscribeForm className="max-w-2xl mx-auto" />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-card">
        <div className="container">
          <h2 className="text-3xl font-bold font-serif text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </Layout>
  );
}
