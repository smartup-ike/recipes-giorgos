import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

import { postCommentsHandler } from './handlers/postCommentHandler';
import { onRatingCreateHandler } from './handlers/create-user-rating';
import { onRatingUpdateHandler } from './handlers/update-user-rating';

export const onRatingCreate = functions.database.ref('item_ratings/{itemId}/userRatings/{uid}').onCreate(onRatingCreateHandler)
export const onRatingUpdate = functions.database.ref('item_ratings/{itemId}/userRatings/{uid}').onUpdate(onRatingUpdateHandler)
export const onPostComment = functions.https.onCall(postCommentsHandler);
