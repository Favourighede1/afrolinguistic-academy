import { useState } from 'react';
import { Mail, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

interface SubscribeFormProps {
  variant?: 'card' | 'inline';
  className?: string;
}

export function SubscribeForm({ variant = 'card', className }: SubscribeFormProps) {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const { selectedLanguage } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || honeypot) return;

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-newsletter', {
        body: {
          email,
          honeypot,
        },
      });

      if (error) throw error;

      if (data?.error) {
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
      } else {
        setEmail('');
        setIsSuccess(true);
        toast({
          title: "You're on the list!",
          description: "Check your email for your free phrasebook PDF.",
        });
      }
    } catch (error) {
      console.error('Subscribe error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={className}>
        {variant === 'card' ? (
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-accent-foreground" />
              <h2 className="text-2xl font-bold font-serif mb-2">
                You're All Set!
              </h2>
              <p className="text-muted-foreground">
                Check your inbox for the free {selectedLanguage.name} phrasebook PDF and learning updates.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="text-center py-4">
            <div className="flex items-center justify-center gap-2 text-accent-foreground font-medium">
              <CheckCircle className="h-5 w-5" />
              Check your inbox for the phrasebook!
            </div>
          </div>
        )}
      </div>
    );
  }

  const formContent = (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      {/* Honeypot field - hidden from users */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="absolute -left-[9999px] opacity-0 pointer-events-none"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1"
        aria-label="Email address"
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          'Get Free PDF'
        )}
      </Button>
    </form>
  );

  if (variant === 'inline') {
    return <div className={className}>{formContent}</div>;
  }

  return (
    <div className={className}>
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-8 text-center">
          <Mail className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-bold font-serif mb-2">
            Get the Free {selectedLanguage.name} Phrasebook
          </h2>
          <p className="text-muted-foreground mb-6">
            Essential phrases + weekly learning tips delivered to your inbox.
          </p>
          {formContent}
          <p className="text-xs text-muted-foreground mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
