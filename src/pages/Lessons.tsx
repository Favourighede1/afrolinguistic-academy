import { useState, useMemo } from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Layout } from '@/components/layout/Layout';
import { LessonCard } from '@/components/LessonCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLessonsByLanguage } from '@/data/lessons';

const levels = ['all', 'beginner', 'intermediate', 'advanced'];
const topics = ['all', 'greetings', 'numbers', 'family', 'food', 'travel'];
const skills = ['all', 'listening', 'speaking', 'grammar'];

export default function Lessons() {
  const { selectedLanguage } = useLanguage();
  const [levelFilter, setLevelFilter] = useState('all');
  const [topicFilter, setTopicFilter] = useState('all');
  const [skillFilter, setSkillFilter] = useState('all');

  const allLessons = getLessonsByLanguage(selectedLanguage.id);

  const filteredLessons = useMemo(() => {
    return allLessons.filter((lesson) => {
      if (levelFilter !== 'all' && lesson.level !== levelFilter) return false;
      if (topicFilter !== 'all' && lesson.topic !== topicFilter) return false;
      if (skillFilter !== 'all' && !lesson.skills.includes(skillFilter)) return false;
      return true;
    });
  }, [allLessons, levelFilter, topicFilter, skillFilter]);

  const clearFilters = () => {
    setLevelFilter('all');
    setTopicFilter('all');
    setSkillFilter('all');
  };

  const hasActiveFilters = levelFilter !== 'all' || topicFilter !== 'all' || skillFilter !== 'all';

  return (
    <Layout>
      {/* Header */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 via-background to-accent/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-4">
              {selectedLanguage.name} Lessons
            </h1>
            <p className="text-lg text-muted-foreground">
              {allLessons.length} lessons available. Start from the beginning or jump to a topic that interests you.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b border-border bg-card sticky top-16 z-40">
        <div className="container">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filter by:</span>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-[140px]">
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
                <SelectTrigger className="w-[140px]">
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
                <SelectTrigger className="w-[140px]">
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
      </section>

      {/* Lessons Grid */}
      <section className="py-12">
        <div className="container">
          {filteredLessons.length > 0 ? (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                Showing {filteredLessons.length} lesson{filteredLessons.length !== 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLessons.map((lesson) => (
                  <LessonCard key={lesson.id} lesson={lesson} />
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

      {/* Coming Soon */}
      {allLessons.length < 10 && (
        <section className="py-12 bg-secondary/20">
          <div className="container text-center">
            <Badge variant="outline" className="mb-4">Coming Soon</Badge>
            <h2 className="text-2xl font-bold font-serif mb-2">More Lessons on the Way</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              We're constantly adding new lessons. Check back regularly or sign up for updates 
              to be notified when new content is available.
            </p>
          </div>
        </section>
      )}
    </Layout>
  );
}
