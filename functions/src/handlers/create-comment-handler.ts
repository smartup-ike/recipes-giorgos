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

  const menuContentKeys: Record<string, Record<string, boolean>> = (await admin.database().ref('menu_content_keys').get()).val();

  let optionId = '';

  //find on entries
  for (const [key, items] of Object.entries(menuContentKeys)) {
    for (const [item] of Object.entries(items)) {
      if (item === itemId) {
        optionId = key;
      }
    }
  }

  await admin.database().ref(`menu_option_reviews/${optionId}`).transaction((currentNumber: number) => {

    let commentCount = (currentNumber) ?? 0;
    commentCount++;

    admin.database().ref(`item_reviews/${itemId}/${reviewId}`).set(review);

    return commentCount;
  });

  return { status: 'ok' };

};