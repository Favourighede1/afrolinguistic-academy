import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bell, MessageSquarePlus, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

const plannedLessons = [
  { title: 'Family Members', level: 'Beginner', topic: 'family' },
  { title: 'Food & Dining', level: 'Beginner', topic: 'food' },
  { title: 'Asking for Directions', level: 'Intermediate', topic: 'travel' },
  { title: 'Shopping & Bargaining', level: 'Intermediate', topic: 'travel' },
  { title: 'Travel Essentials', level: 'Intermediate', topic: 'travel' },
];

export function ComingSoonRoadmap() {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [topicRequest, setTopicRequest] = useState('');
  const [email, setEmail] = useState('');

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicRequest.trim()) {
      toast.error('Please enter a topic suggestion');
      return;
    }
    // In a real app, this would send to a backend
    toast.success('Thank you! Your topic suggestion has been submitted.');
    setTopicRequest('');
    setEmail('');
    setIsRequestModalOpen(false);
  };

  return (
    <>
      <Card className="border-dashed border-2 bg-secondary/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl">Coming Soon</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            We're constantly adding new lessons. Here's what's next on our roadmap:
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Roadmap list */}
          <div className="grid gap-2">
            {plannedLessons.map((lesson, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-muted-foreground w-6">
                    {index + 1}.
                  </span>
                  <span className="font-medium">{lesson.title}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {lesson.level}
                </Badge>
              </div>
            ))}
          </div>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              variant="outline" 
              className="flex-1 gap-2"
              onClick={() => setIsRequestModalOpen(true)}
            >
              <MessageSquarePlus className="h-4 w-4" />
              Request a topic
            </Button>
            <Link to="/#email-signup" className="flex-1">
              <Button variant="secondary" className="w-full gap-2">
                <Bell className="h-4 w-4" />
                Get notified
              </Button>
            </Link>
          </div>
          
          <p className="text-xs text-center text-muted-foreground pt-2">
            100% Free Forever · All lessons are always free
          </p>
        </CardContent>
      </Card>

      {/* Request Topic Modal */}
      <Dialog open={isRequestModalOpen} onOpenChange={setIsRequestModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request a Lesson Topic</DialogTitle>
            <DialogDescription>
              What would you like to learn? We'll prioritize topics based on community interest.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRequestSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="topic" className="text-sm font-medium">
                Topic suggestion *
              </label>
              <Textarea
                id="topic"
                placeholder="e.g., Weather expressions, Colors, Days of the week..."
                value={topicRequest}
                onChange={(e) => setTopicRequest(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email (optional - to notify you when it's ready)
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex gap-3 justify-end">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setIsRequestModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                Submit request
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
