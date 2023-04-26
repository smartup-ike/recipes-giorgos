import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin';
import { DataSnapshot } from 'firebase-functions/lib/common/providers/database';
import { AverageRating } from '../models/averageRating.model';


export const onRatingWriteHandler = async (change: functions.Change<DataSnapshot>, context: functions.EventContext) => {
    try {
        const itemId = context.params.itemId;
        const uid = context.params.uid;
        const previousRating = change.before.val();
        const updatedRating = change.after.val();

        console.log({ previousRating, updatedRating });


        const getAverageRatingData = admin.database().ref(`item_ratings/${itemId}/averageRatingData`).get();
        const averageRatingData: AverageRating = (await getAverageRatingData).val();
        console.log(averageRatingData);


        if (previousRating == null) {
            const newSumOnCreate = averageRatingData.sumOfRatings + updatedRating.rating;
            const newRatingOnCreate = (newSumOnCreate / averageRatingData.ratingCount).toString()
            const newRatingCount = averageRatingData.ratingCount + 1;

            const newRatingDataOnCreate = {
                ratingCount: newRatingCount,
                sumOfRatings: newSumOnCreate,
                rating: newRatingOnCreate
            };
            await admin.database().ref(`item_ratings/${itemId}/averageRatingData`).transaction(() => { return newRatingDataOnCreate })
        } else {
            const newSumOnUpdate = averageRatingData.sumOfRatings - previousRating.rating + updatedRating.rating;
            const newRatingOnUpdate = (newSumOnUpdate / averageRatingData.ratingCount).toString()
            const newRatingDataOnUpdate = {
                rating: newRatingOnUpdate,
                sumOfRatings: newSumOnUpdate,
                ratingCount: averageRatingData.ratingCount
            }
            await admin.database().ref(`item_ratings/${itemId}/averageRatingData`).transaction(() => { return newRatingDataOnUpdate })
        }

        await admin.database().ref(`user_ratings/${uid}/itemRatings/${itemId}`).update(updatedRating);

    } catch (e) {
        console.log(e);

    }
}
