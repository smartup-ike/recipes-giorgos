import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin';
import { DataSnapshot } from 'firebase-admin/database';
import { AverageRating } from '../models/averageRating.model';

export const onRatingCreateHandler = async (snap: DataSnapshot, context: functions.EventContext) => {
    try {
        const itemId = context.params.itemId;
        const uid = context.params.uid;

        const averageRatingDataSnapshot = admin.database().ref(`item_ratings/${itemId}/averageRatingData/`).get();
        const newUserRatingSnapshot = admin.database().ref(`item_ratings/${itemId}/userRatings/${uid}`).get();

        const averageRatingData: AverageRating = (await averageRatingDataSnapshot).val();
        const newRatingData = (await newUserRatingSnapshot).val();

        const newSum = averageRatingData.sumOfRatings + newRatingData.rating;
        const newRatingCount = averageRatingData.ratingCount + 1;

        const newRatingObj = {
            ratingCount: newRatingCount,
            sumOfRatings: newSum,
            rating: (newSum / newRatingCount).toString()
        };

        await admin.database().ref(`item_ratings/${itemId}/averageRatingData/`).update(newRatingObj)

    } catch (e) {
        console.log(e);
    }
};
