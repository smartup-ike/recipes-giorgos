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

        await admin.database().ref(`item_ratings/${itemId}/averageRatingData`).transaction((averageRatingData: AverageRating | null) => {
            const newRatingData: AverageRating = {
                rating: '',
                sumOfRatings: averageRatingData?.sumOfRatings ?? 0,
                ratingCount: averageRatingData?.ratingCount ?? 0,
            };

            if (previousRating) {
                newRatingData.sumOfRatings -= previousRating.rating;
            } else {
                newRatingData.ratingCount++;
            }

            newRatingData.sumOfRatings += updatedRating.rating;
            newRatingData.rating = (newRatingData.sumOfRatings / newRatingData.ratingCount).toString();

            return newRatingData;
        });

        await admin.database().ref(`user_ratings/${uid}/itemRatings/${itemId}`).set(updatedRating);

    } catch (e) {
        console.log(e);

    }
}
