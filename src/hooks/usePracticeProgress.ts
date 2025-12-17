import { useState, useEffect, useCallback } from 'react';

export interface CardProgress {
  cardId: string;
  correctCount: number;
  incorrectCount: number;
  lastReviewed: string;
  nextReview: string;
  interval: number; // days until next review
  easeFactor: number;
}

export interface PracticeStats {
  streak: number;
  lastPracticeDate: string | null;
  wordsMastered: number;
  totalReviews: number;
  cardProgress: Record<string, CardProgress>;
}

const STORAGE_KEY = 'afrolinguistic_practice_progress';
const MASTERY_THRESHOLD = 3; // correct answers needed to "master" a card

const getDefaultStats = (): PracticeStats => ({
  streak: 0,
  lastPracticeDate: null,
  wordsMastered: 0,
  totalReviews: 0,
  cardProgress: {}
});

const calculateNextReview = (
  correct: boolean,
  currentInterval: number,
  easeFactor: number
): { interval: number; easeFactor: number } => {
  if (correct) {
    const newInterval = currentInterval === 0 ? 1 : Math.ceil(currentInterval * easeFactor);
    const newEase = Math.min(easeFactor + 0.1, 2.5);
    return { interval: Math.min(newInterval, 30), easeFactor: newEase };
  } else {
    return { interval: 1, easeFactor: Math.max(easeFactor - 0.2, 1.3) };
  }
};

export const usePracticeProgress = (languageId: string) => {
  const storageKey = `${STORAGE_KEY}_${languageId}`;
  
  const [stats, setStats] = useState<PracticeStats>(() => {
    if (typeof window === 'undefined') return getDefaultStats();
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : getDefaultStats();
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(stats));
  }, [stats, storageKey]);

  // Check and update streak on load
  useEffect(() => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    if (stats.lastPracticeDate && stats.lastPracticeDate !== today && stats.lastPracticeDate !== yesterday) {
      // Streak broken
      setStats(prev => ({ ...prev, streak: 0 }));
    }
  }, [stats.lastPracticeDate]);

  const recordReview = useCallback((cardId: string, correct: boolean) => {
    const today = new Date().toDateString();
    
    setStats(prev => {
      const cardProgress = prev.cardProgress[cardId] || {
        cardId,
        correctCount: 0,
        incorrectCount: 0,
        lastReviewed: today,
        nextReview: today,
        interval: 0,
        easeFactor: 2.0
      };

      const { interval, easeFactor } = calculateNextReview(
        correct,
        cardProgress.interval,
        cardProgress.easeFactor
      );

      const nextReviewDate = new Date();
      nextReviewDate.setDate(nextReviewDate.getDate() + interval);

      const updatedCard: CardProgress = {
        ...cardProgress,
        correctCount: correct ? cardProgress.correctCount + 1 : cardProgress.correctCount,
        incorrectCount: correct ? cardProgress.incorrectCount : cardProgress.incorrectCount + 1,
        lastReviewed: today,
        nextReview: nextReviewDate.toDateString(),
        interval,
        easeFactor
      };

      const newCardProgress = { ...prev.cardProgress, [cardId]: updatedCard };
      
      // Calculate mastered words
      const wordsMastered = Object.values(newCardProgress).filter(
        c => c.correctCount >= MASTERY_THRESHOLD
      ).length;

      // Update streak
      const isNewDay = prev.lastPracticeDate !== today;
      const wasYesterday = prev.lastPracticeDate === new Date(Date.now() - 86400000).toDateString();
      const newStreak = isNewDay 
        ? (wasYesterday || !prev.lastPracticeDate ? prev.streak + 1 : 1)
        : prev.streak;

      return {
        ...prev,
        cardProgress: newCardProgress,
        wordsMastered,
        totalReviews: prev.totalReviews + 1,
        streak: newStreak,
        lastPracticeDate: today
      };
    });
  }, []);

  const getDueCards = useCallback((allCardIds: string[]): string[] => {
    const today = new Date().toDateString();
    const todayTime = new Date(today).getTime();
    
    return allCardIds.filter(cardId => {
      const progress = stats.cardProgress[cardId];
      if (!progress) return true; // New card is always due
      const nextReviewTime = new Date(progress.nextReview).getTime();
      return nextReviewTime <= todayTime;
    });
  }, [stats.cardProgress]);

  const getHardCards = useCallback((allCardIds: string[]): string[] => {
    return allCardIds.filter(cardId => {
      const progress = stats.cardProgress[cardId];
      return progress && progress.incorrectCount > progress.correctCount;
    });
  }, [stats.cardProgress]);

  const getCardStatus = useCallback((cardId: string): 'new' | 'learning' | 'mastered' => {
    const progress = stats.cardProgress[cardId];
    if (!progress) return 'new';
    if (progress.correctCount >= MASTERY_THRESHOLD) return 'mastered';
    return 'learning';
  }, [stats.cardProgress]);

  const resetProgress = useCallback(() => {
    setStats(getDefaultStats());
  }, []);

  return {
    stats,
    recordReview,
    getDueCards,
    getHardCards,
    getCardStatus,
    resetProgress
  };
};
