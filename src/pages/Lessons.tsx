import { useState, useMemo } from 'react';
import { Filter, Search, SortAsc, ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Layout } from '@/components/layout/Layout';
import { EnhancedLessonCard } from '@/components/EnhancedLessonCard';
import { RecommendedLessonPanel } from '@/components/RecommendedLessonPanel';
import { ComingSoonRoadmap } from '@/components/ComingSoonRoadmap';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLessonsByLanguage } from '@/data/lessons';
import { useLessonProgress } from '@/hooks/useLessonProgress';

const levels = ['all', 'beginner', 'intermediate', 'advanced'];
const topics = ['all', 'greetings', 'numbers', 'family', 'food', 'travel'];
const skills = ['all', 'listening', 'speaking', 'grammar'];
const sortOptions = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'shortest', label: 'Shortest first' },
  { value: 'newest', label: 'Newest first' },
];

export default function Lessons() {
  const { selectedLanguage } = useLanguage();
  const { getLessonStatus, startLesson, getCompletedCount } = useLessonProgress();
  
  const [levelFilter, setLevelFilter] = useState('all');
  const [topicFilter, setTopicFilter] = useState('all');
  const [skillFilter, setSkillFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');

  const allLessons = getLessonsByLanguage(selectedLanguage.id);
  const completedCount = getCompletedCount();

  // Find recommended next lesson
  const recommendedLesson = useMemo(() => {
    // Find first incomplete lesson in order
    const incompleteLessons = allLessons.filter(
      lesson => getLessonStatus(lesson.id) !== 'completed'
    );
    
    // Prefer in-progress lessons first
    const inProgress = incompleteLessons.find(
      lesson => getLessonStatus(lesson.id) === 'in-progress'
    );
    if (inProgress) return inProgress;
    
    // Otherwise return first not-started lesson
    return incompleteLessons[0] || allLessons[0];
  }, [allLessons, getLessonStatus]);

  const hasAnyProgress = useMemo(() => {
    return allLessons.some(lesson => getLessonStatus(lesson.id) !== 'not-started');
  }, [allLessons, getLessonStatus]);

  const filteredAndSortedLessons = useMemo(() => {
    let filtered = allLessons.filter((lesson) => {
      // Level filter
      if (levelFilter !== 'all' && lesson.level !== levelFilter) return false;
      // Topic filter
      if (topicFilter !== 'all' && lesson.topic !== topicFilter) return false;
      // Skill filter
      if (skillFilter !== 'all' && !lesson.skills.includes(skillFilter)) return false;
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = lesson.title.toLowerCase().includes(query);
        const matchesDescription = lesson.description.toLowerCase().includes(query);
        const matchesTopic = lesson.topic.toLowerCase().includes(query);
        const matchesSkills = lesson.skills.some(s => s.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDescription && !matchesTopic && !matchesSkills) {
          return false;
        }
      }
      return true;
    });

    // Sort
    switch (sortBy) {
      case 'shortest':
        filtered = [...filtered].sort((a, b) => a.estimatedMinutes - b.estimatedMinutes);
        break;
      case 'newest':
        filtered = [...filtered].sort((a, b) => b.order - a.order);
        break;
      case 'recommended':
      default:
        // Keep original order (by lesson.order)
        break;
    }

    return filtered;
  }, [allLessons, levelFilter, topicFilter, skillFilter, searchQuery, sortBy]);

  const clearFilters = () => {
    setLevelFilter('all');
    setTopicFilter('all');
    setSkillFilter('all');
    setSearchQuery('');
    setSortBy('recommended');
  };

  const hasActiveFilters = levelFilter !== 'all' || topicFilter !== 'all' || skillFilter !== 'all' || searchQuery.trim() !== '' || sortBy !== 'recommended';

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="border-b border-border bg-muted/30">
        <div className="container py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors flex items-center gap-1">
              <Home className="h-3.5 w-3.5" />
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">Lessons</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">{selectedLanguage.name}</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="py-8 md:py-12 bg-gradient-to-br from-primary/5 via-background to-accent/10">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-3">
              {selectedLanguage.name} Learning Path
            </h1>
            <p className="text-lg text-muted-foreground">
              {allLessons.length} lessons available · Progress through structured lessons from beginner to advanced.
            </p>
          </div>
        </div>
      </section>

      {/* Recommended Next Lesson */}
      {recommendedLesson && (
        <section className="py-6 bg-background">
          <div className="container">
            <RecommendedLessonPanel
              lesson={recommendedLesson}
              lessonNumber={recommendedLesson.order}
              hasProgress={hasAnyProgress}
              status={getLessonStatus(recommendedLesson.id)}
              completedCount={completedCount}
              totalLessons={allLessons.length}
              onStartLesson={() => startLesson(recommendedLesson.id)}
            />
          </div>
        </section>
      )}

      {/* Filters */}
      <section className="py-4 border-y border-border bg-card sticky top-16 z-40">
        <div className="container">
          <div className="flex flex-col gap-4">
            {/* Search and Sort Row */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search lessons..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex items-center gap-2">
                <SortAsc className="h-4 w-4 text-muted-foreground" />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Filter Row */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filter:</span>
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <Select value={levelFilter} onValueChange={setLevelFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level === 'all' ? 'All Levels' : level.charAt(0).toUpperCase() + level.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={topicFilter} onValueChange={setTopicFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {topics.map((topic) => (
                      <SelectItem key={topic} value={topic}>
                        {topic === 'all' ? 'All Topics' : topic.charAt(0).toUpperCase() + topic.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={skillFilter} onValueChange={setSkillFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Skill" />
                  </SelectTrigger>
                  <SelectContent>
                    {skills.map((skill) => (
                      <SelectItem key={skill} value={skill}>
                        {skill === 'all' ? 'All Skills' : skill.charAt(0).toUpperCase() + skill.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear all
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lessons Grid */}
      <section className="py-10">
        <div className="container">
          {filteredAndSortedLessons.length > 0 ? (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                Showing {filteredAndSortedLessons.length} lesson{filteredAndSortedLessons.length !== 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedLessons.map((lesson) => (
                  <EnhancedLessonCard
                    key={lesson.id}
                    lesson={lesson}
                    lessonNumber={lesson.order}
                    status={getLessonStatus(lesson.id)}
                    isFirstLesson={lesson.order === 1}
                    onStartLesson={() => startLesson(lesson.id)}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                No lessons match your filters.
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Coming Soon Roadmap */}
      <section className="py-10 bg-secondary/10">
        <div className="container max-w-2xl">
          <ComingSoonRoadmap />
        </div>
      </section>
    </Layout>
  );
}
