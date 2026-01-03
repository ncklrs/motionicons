import { useMemo } from 'react';
import type { IconData } from '../components/IconCard';
import type { FilterState, MotionType, TriggerMode } from '../components/FilterPanel';

export interface UseSearchOptions {
  /** Array of all icons */
  icons: IconData[];
  /** Search query string */
  query: string;
  /** Active filters */
  filters: FilterState;
}

export interface UseSearchResult {
  /** Filtered icons matching search and filters */
  filteredIcons: IconData[];
  /** Total count of all icons */
  totalCount: number;
  /** Whether any filtering is active */
  isFiltering: boolean;
  /** Count of icons matching current filters */
  matchCount: number;
}

/**
 * Simple fuzzy match scoring
 * Returns a score based on how well the query matches the target
 * Higher score = better match
 */
function fuzzyScore(query: string, target: string): number {
  const queryLower = query.toLowerCase();
  const targetLower = target.toLowerCase();

  // Exact match gets highest score
  if (targetLower === queryLower) {
    return 100;
  }

  // Starts with query gets high score
  if (targetLower.startsWith(queryLower)) {
    return 80;
  }

  // Contains query as substring gets medium score
  if (targetLower.includes(queryLower)) {
    return 60;
  }

  // Check for fuzzy character matching
  let queryIndex = 0;
  let consecutiveMatches = 0;
  let maxConsecutive = 0;
  let totalMatches = 0;

  for (let i = 0; i < targetLower.length && queryIndex < queryLower.length; i++) {
    if (targetLower[i] === queryLower[queryIndex]) {
      queryIndex++;
      totalMatches++;
      consecutiveMatches++;
      maxConsecutive = Math.max(maxConsecutive, consecutiveMatches);
    } else {
      consecutiveMatches = 0;
    }
  }

  // If all query characters were found in order
  if (queryIndex === queryLower.length) {
    // Score based on consecutive matches and coverage
    const coverage = totalMatches / targetLower.length;
    const consecutiveBonus = (maxConsecutive / queryLower.length) * 20;
    return 20 + coverage * 20 + consecutiveBonus;
  }

  return 0;
}

/**
 * Get the best fuzzy match score across name and tags
 */
function getMatchScore(icon: IconData, query: string): number {
  if (!query.trim()) {
    return 100; // No query = everything matches
  }

  const queryLower = query.toLowerCase().trim();

  // Score against name
  const nameScore = fuzzyScore(queryLower, icon.name);

  // Score against id (which often has dashes)
  const idScore = fuzzyScore(queryLower, icon.id);
  const idNoDashScore = fuzzyScore(queryLower, icon.id.replace(/-/g, ''));

  // Score against tags
  let bestTagScore = 0;
  for (const tag of icon.tags) {
    const tagScore = fuzzyScore(queryLower, tag);
    bestTagScore = Math.max(bestTagScore, tagScore);
  }

  // Score against categories
  let bestCategoryScore = 0;
  for (const category of icon.categories) {
    const categoryScore = fuzzyScore(queryLower, category);
    bestCategoryScore = Math.max(bestCategoryScore, categoryScore);
  }

  // Return the best score
  return Math.max(nameScore, idScore, idNoDashScore, bestTagScore, bestCategoryScore * 0.8);
}

/**
 * Check if icon matches category filter
 */
function matchesCategories(icon: IconData, categories: string[]): boolean {
  if (categories.length === 0) {
    return true; // No category filter = matches all
  }

  return icon.categories.some((cat) => categories.includes(cat));
}

/**
 * Check if icon matches motion type filter
 */
function matchesMotionType(icon: IconData, lively: MotionType): boolean {
  if (lively === 'all') {
    return true;
  }

  return icon.defaultMotionType === lively;
}

/**
 * Check if icon matches trigger filter
 * Note: This is a simplified check - in reality, all icons may support all triggers
 */
function matchesTrigger(_icon: IconData, trigger: TriggerMode): boolean {
  if (trigger === 'all') {
    return true;
  }

  // For now, all icons support all triggers
  // This could be enhanced if icons have trigger-specific support
  return true;
}

/**
 * Hook for searching and filtering icons
 * Features: fuzzy search, category filtering, motion type filtering
 */
export function useSearch({ icons, query, filters }: UseSearchOptions): UseSearchResult {
  const result = useMemo(() => {
    const trimmedQuery = query.trim();
    const hasQuery = trimmedQuery.length > 0;
    const hasFilters =
      filters.categories.length > 0 ||
      filters.lively !== 'all' ||
      filters.trigger !== 'all';

    const isFiltering = hasQuery || hasFilters;

    if (!isFiltering) {
      // No filtering active - return all icons
      return {
        filteredIcons: icons,
        totalCount: icons.length,
        isFiltering: false,
        matchCount: icons.length,
      };
    }

    // Score and filter icons
    const scoredIcons: Array<{ icon: IconData; score: number }> = [];

    for (const icon of icons) {
      // Check category filter
      if (!matchesCategories(icon, filters.categories)) {
        continue;
      }

      // Check motion type filter
      if (!matchesMotionType(icon, filters.lively)) {
        continue;
      }

      // Check trigger filter
      if (!matchesTrigger(icon, filters.trigger)) {
        continue;
      }

      // Get search score
      const score = getMatchScore(icon, trimmedQuery);

      // Include if score is above threshold
      if (score > 0) {
        scoredIcons.push({ icon, score });
      }
    }

    // Sort by score (highest first), then alphabetically by name
    scoredIcons.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.icon.name.localeCompare(b.icon.name);
    });

    const filteredIcons = scoredIcons.map(({ icon }) => icon);

    return {
      filteredIcons,
      totalCount: icons.length,
      isFiltering: true,
      matchCount: filteredIcons.length,
    };
  }, [icons, query, filters]);

  return result;
}

export default useSearch;
