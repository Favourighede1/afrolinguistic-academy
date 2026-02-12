import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';

export default function YorubaYeMi() {
  return (
    <Layout>
      <Helmet>
        <title>Yorùbá Lessons Coming Soon | Afrolinguistic Academy</title>
        <meta
          name="description"
          content="Yorùbá lessons are coming soon to Afrolinguistic Academy. Start learning Edo today while we prepare more African languages."
        />
      </Helmet>

      <main className="flex-1 flex items-center justify-center py-20">
        <div className="text-center max-w-md mx-auto px-4 space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <Clock className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold font-serif text-foreground">
            Yorùbá Yé Mi
          </h1>
          <p className="text-muted-foreground text-lg">
            Yorùbá lessons are coming soon! We're working hard to bring you structured lessons for this beautiful language.
          </p>
          <p className="text-sm text-muted-foreground">
            In the meantime, start learning <strong>Edo</strong> — our first fully available language.
          </p>
          <Button asChild size="lg">
            <Link to="/lessons">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Edo Lessons
            </Link>
          </Button>
        </div>
      </main>
    </Layout>
  );
}
