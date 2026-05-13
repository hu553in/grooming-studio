export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  dateLabel?: string;
  rating: number;
  text?: string;
  itemTitle?: string;
  stageTitle?: string;
  avatarUrl?: string;
}

export interface ReviewsResponse {
  reviews: ReviewItem[];
  fetchedAt: string;
  sourceUrl: string;
}

export interface ReviewsErrorResponse {
  error: string;
}

export type FetchState = 'loading' | 'success' | 'error';
