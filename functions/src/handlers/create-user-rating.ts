import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin';
import { DataSnapshot } from 'firebase-admin/database';
import { AverageRating } from '../models/averageRating.model';

export const onRatingCreateHandler = async (snap: DataSnapshot, context: functions.EventContext) => {
    try {
        const itemId = context.params.itemId;
        const uid = context.params.uid;

        const getAverageRatingData = admin.database().ref(`item_ratings/${itemId}/averageRatingData`).get();
        const getNewUserRating = admin.database().ref(`item_ratings/${itemId}/userRatings/${uid}`).get();

        const averageRatingData: AverageRating = (await getAverageRatingData).val();
        const newRatingData = (await getNewUserRating).val();

        const newSum = averageRatingData.sumOfRatings + newRatingData.rating;
        const newRatingCount = averageRatingData.ratingCount + 1;

        const newRatingObj = {
            ratingCount: newRatingCount,
            sumOfRatings: newSum,
            rating: (newSum / newRatingCount).toString()
        };

        await admin.database().ref(`item_ratings/${itemId}/averageRatingData/`).set(newRatingObj)

    } catch (e) {
        console.log(e);
    }
};
