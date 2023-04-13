import * as admin from 'firebase-admin';
import { HandlerData } from '../models/handlerData.model';

export const postCommentsHandler = async (data: HandlerData) => {
  const itemID = data.itemID;
  const reviewID = data.reviewID;
  const review = data.review;

  if (!review.text) {
    return { error: 'text string cannot be empty' };
  }

  if (!review.author.name) {
    review.author.name = 'anonymous';
  }

  return admin
    .database()
    .ref(`item_reviews/${itemID}/${reviewID}`)
    .update(review);
};
