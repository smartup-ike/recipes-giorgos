// import * as functions from 'firebase-functions';

// import * as admin from 'firebase-admin';
// import { ratingData } from '../models/ratingData.model';

// export const rateRecipeHandler = async (data: ratingData) => {
//   /*add rating to:

//     user_ratings/{uid}/itemRatings/{itemID}
//     item_ratings/{itemID}/userRatings/{uid}
//     item_ratings/{itemID}/averageRatingData/rating + ratingCount + sumOfRatings ???

//   */

//   const uid = data.uid;
//   const itemID = data.itemID;
//   const rating = data.rating;

//   console.log(data);

//   admin
//     .database()
//     .ref(`user_ratings/${uid}/itemRatings/${itemID}`)
//     .update(rating)
//     .then(() => {
//       console.log('User Rating updated');
//     });

//   admin
//     .database()
//     .ref(`item_ratings/${itemID}/userRatings/${uid}`)
//     .update(rating)
//     .then(() => {
//       console.log('Item ratings user ratings updated');
//     });

//   admin
//     .database()
//     .ref(`item_ratings/${itemID}`)
//     .once('value')
//     .then((snapshot) => {
//       let snap = snapshot.val();
//     });

//   return true;
// };
