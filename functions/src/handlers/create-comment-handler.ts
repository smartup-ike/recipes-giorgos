import * as admin from 'firebase-admin';
import { HandlerData } from '../models/handlerData.model';
import { https } from 'firebase-functions/v1';

export const postCommentsHandler = async (data: HandlerData) => {
  const itemId = data.itemId;
  const reviewId = data.reviewId;
  const review = data.review;

  if (!review.text) {
    return new https.HttpsError('invalid-argument', 'cannot post empty comment');
  };

  if (!review.author.name) {
    review.author.name = 'anonymous';
  };

  const getItemKey: Record<string, Record<string, boolean>> = (await admin.database().ref('menu_content_keys').get()).val();

  let optionName = ''

  for (const [key, value] of Object.entries(getItemKey)) {
    for (const [val] of Object.entries(value)) {
      if (val === itemId) {
        optionName = key;
      }
    }
  }

  await admin.database().ref(`menu_option_reviews/${optionName}`).transaction((currentOption: { commentCount: number }) => {
    const newCommentCount = {
      commentCount: (currentOption?.commentCount) ?? 0,
    };

    newCommentCount.commentCount++;

    return newCommentCount
  })

  await admin.database().ref(`item_reviews/${itemId}/${reviewId}`).set(review);

  return { status: 'ok' };

};
