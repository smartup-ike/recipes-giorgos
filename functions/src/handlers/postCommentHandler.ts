import * as admin from 'firebase-admin';
import { HandlerData } from '../models/handlerData.model';

export const postCommentsHandler = async (data: HandlerData) => {
  const itemId = data.itemId;
  const reviewId = data.reviewId;
  const review = data.review;

  if (!review.text) {
    return { error: 'text string cannot be empty' };
  }

  if (!review.author.name) {
    review.author.name = 'anonymous';
  }

  await admin.database().ref(`item_reviews/${itemId}/${reviewId}`).set(review);

};
