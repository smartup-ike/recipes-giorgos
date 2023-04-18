import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

import { postCommentsHandler } from './handlers/postCommentHandler';

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from Firebase!12');
});

export const onPostComment = functions.https.onCall(postCommentsHandler);
export const onRatingChange = functions.database
  .ref('item_ratings/{itemID}/userRatings/{uid}')
  .onWrite(async (change, context) => {
    try {
      const itemID = context.params.itemID;
      const uid = context.params.uid;
      const afterRating = change.after.val();
      const beforeRating = change.before.val();
      // const userRatings = await (
      //   await admin.database().ref(`item_ratings/${itemID}/userRatings`).get()
      // ).val();

      // const usersCount = (
      //   await admin.database().ref(`item_ratings/${itemID}/userRatings/`).get()
      // ).val();

      console.log(beforeRating);
      console.log(afterRating);

      const prevSum: number = (
        await admin
          .database()
          .ref(`item_ratings/${itemID}/averageRatingData/sumOfRatings`)
          .get()
      ).val();

      const ratingCount: number = (
        await admin
          .database()
          .ref(`item_ratings/${itemID}/averageRatingData/ratingCount`)
          .get()
      ).val();

      if (!beforeRating) {
        const newRatingCount = {
          ratingCount: ratingCount + 1,
        };

        const newSum = {
          sumOfRatings: prevSum + afterRating.rating,
        };

        const newRating = {
          rating: (newSum.sumOfRatings / newRatingCount.ratingCount).toString(),
        };

        admin
          .database()
          .ref(`item_ratings/${itemID}/averageRatingData/`)
          .update(newRatingCount);

        admin
          .database()
          .ref(`item_ratings/${itemID}/averageRatingData/`)
          .update(newSum);

        admin
          .database()
          .ref(`item_ratings/${itemID}/averageRatingData/`)
          .update(newRating);
      }

      const newSum = {
        sumOfRatings: prevSum - beforeRating.rating + afterRating.rating,
      };

      const newRating = {
        rating: (newSum.sumOfRatings / ratingCount).toString(),
      };

      admin
        .database()
        .ref(`item_ratings/${itemID}/averageRatingData/`)
        .update(newRating);

      admin
        .database()
        .ref(`item_ratings/${itemID}/averageRatingData/`)
        .update(newSum);

      admin
        .database()
        .ref(`user_ratings/${uid}/itemRatings/${itemID}`)
        .update(afterRating);
    } catch (error) {
      console.log(error);
    }
  });
