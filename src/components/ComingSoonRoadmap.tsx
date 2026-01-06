import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bell, MessageSquarePlus, ThumbsUp } from 'lucide-react';
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

const VOTE_STORAGE_KEY = 'afrolinguistic_roadmap_votes';

interface PlannedLesson {
  title: string;
  level: string;
  topic: string;
}

const plannedLessons: PlannedLesson[] = [
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
  const [votes, setVotes] = useState<Record<string, number>>(() => {
    if (typeof window === 'undefined') return {};
    const saved = localStorage.getItem(VOTE_STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  });
  const [votedTopics, setVotedTopics] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    const saved = localStorage.getItem(`${VOTE_STORAGE_KEY}_user`);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem(VOTE_STORAGE_KEY, JSON.stringify(votes));
  }, [votes]);

  useEffect(() => {
    localStorage.setItem(`${VOTE_STORAGE_KEY}_user`, JSON.stringify([...votedTopics]));
  }, [votedTopics]);

  const handleVote = (lessonTitle: string) => {
    if (votedTopics.has(lessonTitle)) {
      toast.info('You already voted for this topic!');
      return;
    }
    setVotes(prev => ({
      ...prev,
      [lessonTitle]: (prev[lessonTitle] || 0) + 1
    }));
    setVotedTopics(prev => new Set([...prev, lessonTitle]));
    toast.success(`Vote recorded for "${lessonTitle}"!`);
  };

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
                  {(votes[lesson.title] || 0) > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {votes[lesson.title]} vote{votes[lesson.title] > 1 ? 's' : ''}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {lesson.level}
                  </Badge>
                  <Button
                    variant={votedTopics.has(lesson.title) ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => handleVote(lesson.title)}
                    className="gap-1 h-7 px-2"
                    disabled={votedTopics.has(lesson.title)}
                  >
                    <ThumbsUp className={`h-3 w-3 ${votedTopics.has(lesson.title) ? 'text-primary' : ''}`} />
                    <span className="text-xs">{votedTopics.has(lesson.title) ? 'Voted' : 'Vote'}</span>
                  </Button>
                </div>
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
