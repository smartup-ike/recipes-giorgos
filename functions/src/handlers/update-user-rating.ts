import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin';
import { DataSnapshot } from 'firebase-functions/lib/common/providers/database';
import { AverageRating } from '../models/averageRating.model';


export const onRatingUpdateHandler = async (change: functions.Change<DataSnapshot>, context: functions.EventContext) => {
    try {
        const itemId = context.params.itemId;
        const uid = context.params.uid;
        const previousRating = change.before.val();
        const updatedRating = change.after.val();

        const averageRatingDataSnapshot = admin.database().ref(`item_ratings/${itemId}/averageRatingData/`).get();

        const averageRatingData: AverageRating = (await averageRatingDataSnapshot).val();
        const newSum = averageRatingData.sumOfRatings - previousRating.rating + updatedRating.rating;
        const newRating = (newSum / averageRatingData.ratingCount).toString()

        const newRatingObj = {
            rating: newRating,
            sumOfRatings: newSum
        }

        await admin.database().ref(`item_ratings/${itemId}/averageRatingData/`).update(newRatingObj);

        await admin.database().ref(`user_ratings/${uid}/itemRatings/${itemId}`).update(updatedRating);
    } catch (e) {
        console.log(e);

    }
}
