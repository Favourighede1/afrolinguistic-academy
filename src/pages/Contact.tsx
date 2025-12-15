import { useState } from 'react';
import { Mail, MessageSquare, Lightbulb, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Layout } from '@/components/layout/Layout';
import { useToast } from '@/hooks/use-toast';

export default function Contact() {
  const { toast } = useToast();
  
  // Contact Form
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);

  // Lesson Request Form
  const [lessonForm, setLessonForm] = useState({
    name: '',
    email: '',
    topic: '',
    language: '',
    details: ''
  });
  const [isSubmittingLesson, setIsSubmittingLesson] = useState(false);

  // Newsletter Form
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingContact(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmittingContact(false);
    setContactForm({ name: '', email: '', subject: '', message: '' });
    toast({
      title: "Message Sent",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
  };

  const handleLessonSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingLesson(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmittingLesson(false);
    setLessonForm({ name: '', email: '', topic: '', language: '', details: '' });
    toast({
      title: "Request Submitted",
      description: "Thank you for your lesson topic suggestion!",
    });
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingNewsletter(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmittingNewsletter(false);
    setNewsletterEmail('');
    toast({
      title: "Subscribed!",
      description: "You'll receive updates about new lessons and features.",
    });
  };

  return (
    <Layout>
      {/* Header */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 via-background to-accent/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground">
              Have questions, feedback, or ideas? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <CardTitle>Send a Message</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Name</Label>
                      <Input
                        id="contact-name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email">Email</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-subject">Subject</Label>
                    <Input
                      id="contact-subject"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Message</Label>
                    <Textarea
                      id="contact-message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                      rows={4}
                      required
                    />
                  </div>
                  <Button type="submit" disabled={isSubmittingContact} className="w-full gap-2">
                    {isSubmittingContact ? 'Sending...' : (
                      <>
                        Send Message
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Lesson Request Form */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <CardTitle>Request a Lesson Topic</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLessonSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="lesson-name">Name</Label>
                      <Input
                        id="lesson-name"
                        value={lessonForm.name}
                        onChange={(e) => setLessonForm(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lesson-email">Email</Label>
                      <Input
                        id="lesson-email"
                        type="email"
                        value={lessonForm.email}
                        onChange={(e) => setLessonForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lesson-language">Language</Label>
                    <Select 
                      value={lessonForm.language} 
                      onValueChange={(value) => setLessonForm(prev => ({ ...prev, language: value }))}
                    >
                      <SelectTrigger id="lesson-language">
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="edo">Edo</SelectItem>
                        <SelectItem value="yoruba">Yoruba (Coming soon)</SelectItem>
                        <SelectItem value="igbo">Igbo (Coming soon)</SelectItem>
                        <SelectItem value="swahili">Swahili (Coming soon)</SelectItem>
                        <SelectItem value="other">Other (specify in details)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lesson-topic">Topic</Label>
                    <Input
                      id="lesson-topic"
                      placeholder="e.g., Ordering food at a restaurant"
                      value={lessonForm.topic}
                      onChange={(e) => setLessonForm(prev => ({ ...prev, topic: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lesson-details">Additional Details</Label>
                    <Textarea
                      id="lesson-details"
                      placeholder="Tell us more about what you'd like to learn..."
                      value={lessonForm.details}
                      onChange={(e) => setLessonForm(prev => ({ ...prev, details: e.target.value }))}
                      rows={3}
                    />
                  </div>
                  <Button type="submit" disabled={isSubmittingLesson} className="w-full">
                    {isSubmittingLesson ? 'Submitting...' : 'Submit Request'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Newsletter */}
          <Card className="max-w-2xl mx-auto mt-8 bg-primary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <Mail className="h-10 w-10 mx-auto mb-4 text-primary" />
              <h2 className="text-xl font-bold font-serif mb-2">
                Stay Updated
              </h2>
              <p className="text-muted-foreground mb-6">
                Get notified when we add new lessons, languages, and features.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit" disabled={isSubmittingNewsletter}>
                  {isSubmittingNewsletter ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
