import { useState, useMemo, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, Filter, ArrowUpDown, Heart, X } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/hooks/useFavorites';
import { useEdoNames } from '@/hooks/useEdoNames';
import { useIsMobile } from '@/hooks/use-mobile';

type SortOrder = 'asc' | 'desc';
type GenderFilter = 'all' | 'Male' | 'Female' | 'Male/Female';

interface EdoName {
  id: string;
  name: string;
  meaning: string;
  gender: string;
  notes?: string;
}

export default function EdoNames() {
  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState<GenderFilter>('all');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [selectedName, setSelectedName] = useState<EdoName | null>(null);
  
  const { user } = useAuth();
  const { favoriteIds, toggleFavorite, isFavorite } = useFavorites('edo');
  const { names, loading, error } = useEdoNames();
  const isMobile = useIsMobile();

  const filteredNames = useMemo(() => {
    let result = [...names];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (name) =>
          name.name.toLowerCase().includes(query) ||
          name.meaning.toLowerCase().includes(query)
      );
    }

    // Filter by gender
    if (genderFilter !== 'all') {
      result = result.filter((name) => name.gender === genderFilter);
    }

    // Sort
    result.sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [names, searchQuery, genderFilter, sortOrder]);

  const handleFavoriteClick = useCallback(async (nameId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) return;
    await toggleFavorite(nameId);
  }, [user, toggleFavorite]);

  const getGenderBadgeVariant = (gender: string) => {
    switch (gender) {
      case 'Male':
        return 'default';
      case 'Female':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Edo Names Directory | Meanings & Traditions | Afrolinguistic Academy</title>
        <meta
          name="description"
          content="Explore our comprehensive directory of Edo names with meanings. Search, filter by gender, and discover the rich naming traditions of the Benin Kingdom."
        />
      </Helmet>

      <div className="py-12">
        <div className="container">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-10">
            <Badge variant="secondary" className="mb-4">
              Language: Edo
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-4">
              Edo Names Directory
            </h1>
            <p className="text-muted-foreground">
              Explore the rich naming traditions of the Edo people. Each name carries deep meaning, 
              reflecting blessings, circumstances of birth, and family aspirations.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-card border border-border rounded-lg p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search names or meanings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Gender Filter */}
              <Select
                value={genderFilter}
                onValueChange={(value) => setGenderFilter(value as GenderFilter)}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genders</SelectItem>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Male/Female">Unisex</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort Order */}
              <Select
                value={sortOrder}
                onValueChange={(value) => setSortOrder(value as SortOrder)}
              >
                <SelectTrigger className="w-full md:w-[150px]">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">A → Z</SelectItem>
                  <SelectItem value="desc">Z → A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredNames.length}</span> names
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-muted-foreground">Loading names...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <p className="text-destructive mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          )}

          {/* Names Grid */}
          {!loading && !error && (
            <>
              {filteredNames.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground mb-2">No names found</p>
                  <p className="text-sm text-muted-foreground">
                    Try a different search term or filter
                  </p>
                </div>
              ) : (
                <div className={isMobile ? 'space-y-3' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}>
                  {filteredNames.map((name) => (
                    <Card
                      key={name.id}
                      className="cursor-pointer hover:border-primary/50 transition-colors"
                      onClick={() => setSelectedName(name)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg text-foreground truncate">
                                {name.name}
                              </h3>
                              <Badge variant={getGenderBadgeVariant(name.gender)} className="shrink-0 text-xs">
                                {name.gender === 'Male/Female' ? 'Unisex' : name.gender}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2" title={name.meaning}>
                              {name.meaning}
                            </p>
                          </div>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="shrink-0"
                                onClick={(e) => handleFavoriteClick(name.id, e)}
                                disabled={!user}
                              >
                                <Heart
                                  className={`h-4 w-4 ${
                                    user && isFavorite(name.id)
                                      ? 'fill-destructive text-destructive'
                                      : 'text-muted-foreground'
                                  }`}
                                />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {user ? 'Add to favorites' : 'Sign in to save favorites'}
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Name Detail Dialog */}
      <Dialog open={!!selectedName} onOpenChange={() => setSelectedName(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif">{selectedName?.name}</DialogTitle>
          </DialogHeader>
          {selectedName && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant={getGenderBadgeVariant(selectedName.gender)}>
                  {selectedName.gender === 'Male/Female' ? 'Unisex' : selectedName.gender}
                </Badge>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Meaning</h4>
                <p className="text-foreground">{selectedName.meaning}</p>
              </div>
              {selectedName.notes && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Notes</h4>
                  <p className="text-foreground text-sm">{selectedName.notes}</p>
                </div>
              )}
              <div className="flex justify-end pt-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={user && isFavorite(selectedName.id) ? 'default' : 'outline'}
                      onClick={(e) => handleFavoriteClick(selectedName.id, e)}
                      disabled={!user}
                    >
                      <Heart
                        className={`h-4 w-4 mr-2 ${
                          user && isFavorite(selectedName.id) ? 'fill-current' : ''
                        }`}
                      />
                      {user && isFavorite(selectedName.id) ? 'Saved' : 'Add to Favorites'}
                    </Button>
                  </TooltipTrigger>
                  {!user && (
                    <TooltipContent>Sign in to save favorites</TooltipContent>
                  )}
                </Tooltip>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
