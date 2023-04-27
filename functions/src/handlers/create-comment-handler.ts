import * as admin from 'firebase-admin';
import { HandlerData } from '../models/handlerData.model';
import { https } from 'firebase-functions/v1';

export const postCommentsHandler = async (data: HandlerData) => {
  const itemId = data.itemId;
  const reviewId = data.reviewId;
  const review = data.review;

  if (!review.text) {
    return new https.HttpsError('invalid-argument', 'cannot post empty comment');
  }

  if (!review.author.name) {
    review.author.name = 'anonymous';
  }

  await admin.database().ref(`item_reviews/${itemId}/${reviewId}`).set(review);

  return { status: 'ok' };

};
