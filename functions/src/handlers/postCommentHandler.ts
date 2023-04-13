import * as admin from 'firebase-admin';

export const postCommentsHandler = async (data: any, context: any) => {
  const itemID = data.itemID;
  const reviewID = data.reviewID;
  const review = data.review;

  admin.database().ref(`item_reviews/${itemID}/${reviewID}`).update(review);
};
