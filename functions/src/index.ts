import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

import { postCommentsHandler } from './handlers/postCommentHandler';
// import { onRatingCreateHandler } from './handlers/create-user-rating';
// import { onRatingUpdateHandler } from './handlers/update-user-rating';

// export const onRatingCreate = functions.database.ref('item_ratings/{itemId}/userRatings/{uid}').onCreate(onRatingCreateHandler)
// export const onRatingUpdate = functions.database.ref('item_ratings/{itemId}/userRatings/{uid}').onUpdate(onRatingUpdateHandler)
export const onPostComment = functions.https.onCall(postCommentsHandler);

export const onRatingChange = functions.database
    .ref('item_ratings/{itemId}/userRatings/{uid}')
    .onWrite(async (change, context) => {
        try {
            const itemId = context.params.itemId;
            const uid = context.params.uid;
            const afterRating = change.after.val();
            const beforeRating = change.before.val();

            console.log(beforeRating);
            console.log(afterRating);

            const prevSum: number = (
                await admin
                    .database()
                    .ref(`item_ratings/${itemId}/averageRatingData/sumOfRatings`)
                    .get()
            ).val();

            const ratingCount: number = (
                await admin
                    .database()
                    .ref(`item_ratings/${itemId}/averageRatingData/ratingCount`)
                    .get()
            ).val();

            if (!beforeRating) {
                //OnCreate

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
                    .ref(`item_ratings/${itemId}/averageRatingData/`)
                    .update(newRatingCount);

                admin
                    .database()
                    .ref(`item_ratings/${itemId}/averageRatingData/`)
                    .update(newSum);

                admin
                    .database()
                    .ref(`item_ratings/${itemId}/averageRatingData/`)
                    .update(newRating);
            } else {

                //OnUpdate
                const newSum = {
                    sumOfRatings: prevSum - beforeRating.rating + afterRating.rating,
                };

                const newRating = {
                    rating: (newSum.sumOfRatings / ratingCount).toString(),
                };

                admin
                    .database()
                    .ref(`item_ratings/${itemId}/averageRatingData/`)
                    .update(newRating);

                admin
                    .database()
                    .ref(`item_ratings/${itemId}/averageRatingData/`)
                    .update(newSum);

                admin
                    .database()
                    .ref(`user_ratings/${uid}/itemRatings/${itemId}`)
                    .update(afterRating);
            }


        } catch (error) {
            console.log(error);
        }
    });

