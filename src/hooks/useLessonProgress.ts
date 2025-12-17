import { useState, useEffect, useCallback } from 'react';

export type LessonStatus = 'not-started' | 'in-progress' | 'completed';

export interface LessonProgress {
  lessonId: string;
  status: LessonStatus;
  lastAccessed?: string;
  completedAt?: string;
  quizScore?: number;
}

interface ProgressData {
  [lessonId: string]: LessonProgress;
}

const STORAGE_KEY = 'afrolinguistic_lesson_progress';

export function useLessonProgress() {
  const [progress, setProgress] = useState<ProgressData>({});

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProgress(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load lesson progress:', e);
    }
  }, []);

  // Save to localStorage whenever progress changes
  const saveProgress = useCallback((newProgress: ProgressData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
      setProgress(newProgress);
    } catch (e) {
      console.error('Failed to save lesson progress:', e);
    }
  }, []);

  const getLessonStatus = useCallback((lessonId: string): LessonStatus => {
    return progress[lessonId]?.status || 'not-started';
  }, [progress]);

  const getLessonProgress = useCallback((lessonId: string): LessonProgress | null => {
    return progress[lessonId] || null;
  }, [progress]);

  const startLesson = useCallback((lessonId: string) => {
    const existing = progress[lessonId];
    if (!existing || existing.status === 'not-started') {
      const newProgress = {
        ...progress,
        [lessonId]: {
          lessonId,
          status: 'in-progress' as LessonStatus,
          lastAccessed: new Date().toISOString()
        }
      };
      saveProgress(newProgress);
    } else {
      // Just update last accessed
      const newProgress = {
        ...progress,
        [lessonId]: {
          ...existing,
          lastAccessed: new Date().toISOString()
        }
      };
      saveProgress(newProgress);
    }
  }, [progress, saveProgress]);

  const completeLesson = useCallback((lessonId: string, quizScore?: number) => {
    const newProgress = {
      ...progress,
      [lessonId]: {
        lessonId,
        status: 'completed' as LessonStatus,
        lastAccessed: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        quizScore
      }
    };
    saveProgress(newProgress);
  }, [progress, saveProgress]);

  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setProgress({});
  }, []);

  const getCompletedCount = useCallback((): number => {
    return Object.values(progress).filter(p => p.status === 'completed').length;
  }, [progress]);

  const getInProgressCount = useCallback((): number => {
    return Object.values(progress).filter(p => p.status === 'in-progress').length;
  }, [progress]);

  return {
    progress,
    getLessonStatus,
    getLessonProgress,
    startLesson,
    completeLesson,
    resetProgress,
    getCompletedCount,
    getInProgressCount
  };
}
