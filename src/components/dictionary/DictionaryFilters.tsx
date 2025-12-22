import { useState } from 'react';
import { Search, ChevronDown, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Toggle } from '@/components/ui/toggle';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';

type SearchDirection = 'edo-english' | 'english-edo';

interface DictionaryFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchDirection: SearchDirection;
  onSearchDirectionChange: (direction: SearchDirection) => void;
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
  selectedPartsOfSpeech: string[];
  onPartsOfSpeechChange: (parts: string[]) => void;
  showFavoritesOnly: boolean;
  onShowFavoritesOnlyChange: (show: boolean) => void;
  isAuthenticated: boolean;
  languageName: string;
}

const categories = ['greetings', 'family', 'food', 'travel'];
const partsOfSpeech = ['noun', 'verb', 'greeting', 'expression', 'preposition'];

export function DictionaryFilters({
  searchQuery,
  onSearchChange,
  searchDirection,
  onSearchDirectionChange,
  selectedCategories,
  onCategoriesChange,
  selectedPartsOfSpeech,
  onPartsOfSpeechChange,
  showFavoritesOnly,
  onShowFavoritesOnlyChange,
  isAuthenticated,
  languageName,
}: DictionaryFiltersProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoriesChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoriesChange([...selectedCategories, category]);
    }
  };

  const togglePartOfSpeech = (pos: string) => {
    if (selectedPartsOfSpeech.includes(pos)) {
      onPartsOfSpeechChange(selectedPartsOfSpeech.filter(p => p !== pos));
    } else {
      onPartsOfSpeechChange([...selectedPartsOfSpeech, pos]);
    }
  };

  const clearAllFilters = () => {
    onCategoriesChange([]);
    onPartsOfSpeechChange([]);
    onShowFavoritesOnlyChange(false);
  };

  const activeFilterCount = selectedCategories.length + selectedPartsOfSpeech.length + (showFavoritesOnly ? 1 : 0);

  return (
    <div className="space-y-4">
      {/* Search Direction Toggle */}
      <div className="flex items-center justify-center gap-2 text-sm">
        <span className="text-muted-foreground">Search direction:</span>
        <div className="flex items-center gap-1 bg-secondary/50 rounded-lg p-1">
          <Button
            variant={searchDirection === 'edo-english' ? 'default' : 'ghost'}
            size="sm"
            className="h-7 text-xs"
            onClick={() => onSearchDirectionChange('edo-english')}
          >
            {languageName} → English
          </Button>
          <Button
            variant={searchDirection === 'english-edo' ? 'default' : 'ghost'}
            size="sm"
            className="h-7 text-xs"
            onClick={() => onSearchDirectionChange('english-edo')}
          >
            English → {languageName}
          </Button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder={
            searchDirection === 'edo-english'
              ? `Search ${languageName} words...`
              : 'Search English meanings...'
          }
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-12 text-lg"
        />
      </div>

      {/* Category Chips & Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {/* Category chips */}
        {categories.map((cat) => (
          <Badge
            key={cat}
            variant={selectedCategories.includes(cat) ? 'default' : 'outline'}
            className="cursor-pointer hover:bg-primary/80 transition-colors capitalize"
            onClick={() => toggleCategory(cat)}
          >
            {cat}
          </Badge>
        ))}

        {/* Favorites filter (auth only) */}
        {isAuthenticated && (
          <Badge
            variant={showFavoritesOnly ? 'default' : 'outline'}
            className="cursor-pointer hover:bg-primary/80 transition-colors"
            onClick={() => onShowFavoritesOnlyChange(!showFavoritesOnly)}
          >
            ♥ Favorites
          </Badge>
        )}

        {/* More Filters Popover */}
        <Popover open={filtersOpen} onOpenChange={setFiltersOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="h-4 w-4" />
              More Filters
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64" align="end">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2 text-sm">Part of Speech</h4>
                <div className="space-y-2">
                  {partsOfSpeech.map((pos) => (
                    <label key={pos} className="flex items-center gap-2 text-sm cursor-pointer">
                      <Checkbox
                        checked={selectedPartsOfSpeech.includes(pos)}
                        onCheckedChange={() => togglePartOfSpeech(pos)}
                      />
                      <span className="capitalize">{pos}</span>
                    </label>
                  ))}
                </div>
              </div>

              {activeFilterCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={clearAllFilters}
                >
                  Clear all filters
                </Button>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
