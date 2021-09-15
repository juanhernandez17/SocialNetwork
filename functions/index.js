const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const newActivity = (event, id) => {
  return {
    type: event.type,
    eventDate: event.date,
    eventEnd: event.end,
    hostedBy: event.hostedBy,
    title: event.title,
    photoURL: event.hostPhotoURL,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    hostUid: event.hostUid,
    eventId: id
  };
};

exports.cancelActivity = functions.firestore.document('events/{eventId}').onUpdate((event, context) => {
  let updatedEvent = event.after.data();
  let previousEventData = event.before.data();
  console.log({ event });
  console.log({ context });
  console.log({ updatedEvent });
  console.log({ previousEventData });

  if (!updatedEvent.cancelled || updatedEvent.cancelled === previousEventData.cancelled) {
    return false;
  }

  const activity = newActivity('cancelledEvent', updatedEvent, context.params.eventId);

  console.log({ activity });

  return admin
    .firestore()
    .collection('activity')
    .add(activity)
    .then(docRef => {
      return console.log('Activity created with id: ', docRef.id);
    })
    .catch(err => {
      return console.log('Error adding activity', err);
    });
});

//Block of code to handle requests
exports.userRequesting = functions.firestore
  .document('users/{requestSenderUid}/sentFriendRequests/{requestRecipientUid}')
  .onCreate((event, context) => {
    console.log('v555');
    const requestSenderUid = context.params.requestSenderUid;
    const requestRecipientUid = context.params.requestRecipientUid;

    const senderDoc = admin
      .firestore()
      .collection('users')
      .doc(requestSenderUid);

    console.log(senderDoc);

    return senderDoc.get().then(doc => {
      let userData = doc.data();
      console.log({ userData });
      let requestSender = {
        displayName: userData.displayName,
        photoURL: userData.photoURL || '/assets/user.png',
        // city: userData.city || 'unknown city'
      };
      return admin
        .firestore()
        .collection('users')
        .doc(requestRecipientUid)
        .collection('pendingFriendRequests')
        .doc(requestSenderUid)
        .set(requestSender);
    });
  });

  //Block of code to handle canceling friend requests
  exports.userToCancelFriendRequest = functions.firestore
  .document('users/{requestSenderUid}/sentFriendRequests/{requestRecipientUid}')
  .onDelete((event, context) => {
    return admin
      .firestore()
      .collection('users')
      .doc(context.params.requestRecipientUid)
      .collection('pendingFriendRequests')
      .doc(context.params.requestSenderUid)
      .delete()
      .then(() => {
        return console.log('doc deleted');
      })
      .catch(err => {
        return console.log(err);
      });
  });

  //Block of code to handle accepting friend requests
  exports.confirmRequest = functions.firestore
  .document('users/{requestRecipientUid}/myFriends/{requestSenderUid}')
  .onCreate((event, context) => {
    console.log('v501st');
    const requestRecipientUid = context.params.requestRecipientUid;
    const requestSenderUid = context.params.requestSenderUid;

    const recipientDoc = admin
      .firestore()
      .collection('users')
      .doc(requestRecipientUid);

    console.log(recipientDoc);

    return recipientDoc.get().then(doc => {
      let userData = doc.data();
      console.log({ userData });
      let requestRecipient = {
        displayName: userData.displayName,
        photoURL: userData.photoURL || '/assets/user.png',
        // city: userData.city || 'unknown city'
      };
      return admin
        .firestore()
        .collection('users')
        .doc(requestSenderUid)
        .collection('myFriends')
        .doc(requestRecipientUid)
        .set(requestRecipient);
    });
  });

  //Block of code to handles decline friend request and delete pending/sent requestion leftover
  exports.userToDeclineRequest = functions.firestore
  .document('users/{requestRecipientUid}/pendingFriendRequests/{requestSenderUid}')
  .onDelete((event, context) => {
    return admin
      .firestore()
      .collection('users')
      .doc(context.params.requestSenderUid)
      .collection('sentFriendRequests')
      .doc(context.params.requestRecipientUid)
      .delete()
      .then(() => {
        return console.log('doc deleted');
      })
      .catch(err => {
        return console.log(err);
      });
  });

  //Block of code that handles removing a friend from each others lists
  exports.removeFriendship = functions.firestore
  .document('users/{removerUid}/myFriends/{removeFriendUid}')
  .onDelete((event, context) => {
    return admin
      .firestore()
      .collection('users')
      .doc(context.params.removeFriendUid)
      .collection('myFriends')
      .doc(context.params.removerUid)
      .delete()
      .then(() => {
        return console.log('doc deleted');
      })
      .catch(err => {
        return console.log(err);
      });
  });
