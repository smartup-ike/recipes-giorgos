import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

import { postCommentsHandler } from './handlers/create-comment-handler';
import { onRatingWriteHandler } from './handlers/write-user-rating';


export const onRatingUpdate = functions.database.ref('item_ratings/{itemId}/userRatings/{uid}').onWrite(onRatingWriteHandler)
export const onPostComment = functions.https.onCall(postCommentsHandler);
