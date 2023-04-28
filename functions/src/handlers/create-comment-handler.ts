import * as admin from 'firebase-admin';
import { HandlerData } from '../models/handlerData.model';
import { https } from 'firebase-functions/v1';

export const postCommentsHandler = async (data: HandlerData) => {
  const itemId = data.itemId;
  const reviewId = data.reviewId;
  const review = data.review;

  if (!review.text) {
    throw new https.HttpsError('invalid-argument', 'cannot post empty comment');
  }

  if (!review.author.name) {
    review.author.name = 'anonymous';
  }

  const menuContentKeys: Record<string, Record<string, boolean>> = (await admin.database().ref('menu_content_keys').get()).val();

  //find on entries
  const optionId = Object.keys(menuContentKeys).find(key => {
    return menuContentKeys[key][itemId];
  }) ?? '';

  const writeReview = admin.database().ref(`item_reviews/${itemId}/${reviewId}`).set(review);

  await admin.database().ref(`menu_option_reviews/${optionId}`).transaction((currentNumber: number) => {
    return (currentNumber ?? 0) + 1;
  });

  await writeReview;

  return { status: 'ok' };

};