import { Review } from './review.model';

export interface HandlerData {
  review: Review;
  reviewID: string;
  itemID: string;
}
