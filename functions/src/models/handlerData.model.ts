import { Review } from './review.model';

export interface HandlerData {
  review: Review;
  reviewId: string;
  itemId: string;
}
