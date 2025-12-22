import { Link } from 'react-router-dom';
import { Search, MessageSquarePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DictionaryEmptyStateProps {
  searchQuery: string;
  onClearSearch: () => void;
}

export function DictionaryEmptyState({ searchQuery, onClearSearch }: DictionaryEmptyStateProps) {
  const requestWordSubject = encodeURIComponent('Dictionary word request');
  const requestWordMessage = searchQuery
    ? encodeURIComponent(`I'd like to request the word "${searchQuery}" be added to the dictionary.`)
    : encodeURIComponent("I'd like to request a word be added to the dictionary.");

  return (
    <div className="text-center py-16 px-4">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/50 mb-4">
        <Search className="h-8 w-8 text-muted-foreground" />
      </div>
      
      <h3 className="text-lg font-semibold text-foreground mb-2">
        No matches found
      </h3>
      
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        {searchQuery
          ? `No entries match "${searchQuery}". Try a simpler word or another category.`
          : 'No entries match your current filters. Try adjusting your selections.'}
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button variant="outline" onClick={onClearSearch}>
          Clear filters
        </Button>
        
        <Button asChild>
          <Link to={`/contact?subject=${requestWordSubject}&message=${requestWordMessage}`}>
            <MessageSquarePlus className="h-4 w-4 mr-2" />
            Request a word
          </Link>
        </Button>
      </div>
    </div>
  );
}
