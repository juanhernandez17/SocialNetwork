/*	~/src/features/posts/postActions.js        */
/*=============================================*/
/*               Imports                       */

// Import Essential Packages
import { toastr } from "react-redux-toastr";
import {
  FETCH_T_POSTS,
  FETCH_E_POSTS,
  TEXT_POST_T,
  EVENT_POST_T
} from "./postConstants";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../async/asyncActions";
import { createNewPost } from "../../app/common/util/helpers";
import moment from "moment";
import compareAsc from "date-fns/compare_asc";

// Import our modules
import firebase from "../../app/config/firebase";

/*=============================================*/
/*              Functions                      */

// When a post is created, we need to update the activity feed

// Every new activity is generated through this simple function
const createNewActivity = (event, id, type) => {
  return {
    type: type,
    eventDate: event.date,
    eventEnd: event.end,
    hostedBy: event.hostedBy,
    title: event.title,
    photoURL: event.hostPhotoURL,
    timestamp: Date(Date.now()),
    hostUid: event.hostUid,
    eventId: id
  };
};

// This function is called every time a post is made
//  to update the activity bar
const updateFeed = (dispatch, getState, firestore, post, id) => {
  // we need to evaluate a type, which will change from EVENT_POST_T to `newEvent`, if
  //  the post type was tyep `EVENT_POST_T` to begin with
  const type = post.type === EVENT_POST_T ? "newEvent" : post.type;

  // We need to log a time regardless if we are updating an event post or not
  const timestamp = Date(Date.now());
  if (type === TEXT_POST_T) {
    post.end = timestamp;
    post.date = timestamp;
  }

  // create a new activity from our generator, given the post, it's id, and the type
  const newActivity = createNewActivity(post, id, type);

  // attempt to push the activity to our database
  try {
    firestore.add(`activity`, newActivity);
  } catch (error) {
    console.log("Error adding activity", error);
  }
};

// There are types of posts so far: Event and Text
// This one is an TextPost
export const createTextPost = post => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const user = firestore.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;

    var newPost = createNewPost(user, photoURL, post, TEXT_POST_T);
    try {
      var createdPost = await firestore.add(`events`, newPost);
      updateFeed(dispatch, getState, firestore, newPost, createdPost.id);
      toastr.success("Success", "Post has been created");
      return createdPost;
    } catch (error) {
      console.log(error);
      toastr.error("Oops", "Something went wrong");
      return null;
    }
  };
};

// This one is an EventPost
export const createEventPost = event => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const user = firestore.auth().currentUser;
    const photoURL = getState().firebase.profile.photoURL;
    var newEvent = createNewPost(user, photoURL, event, EVENT_POST_T);
    try {
      var createdEvent = await firestore.add(`events`, newEvent);
      await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
        eventId: createdEvent.id,
        userUid: user.uid,
        eventDate: event.date,
        eventEnd: event.end,
        host: true
      });
      updateFeed(dispatch, getState, firestore, newEvent, createdEvent.id);
      toastr.success("Success", "Event has been created");
    } catch (error) {
      toastr.error("Oops", "Something went wrong");
    }
  };
};

export const updateEventPost = event => {
  return async (dispatch, getState) => {
    dispatch(asyncActionStart());
    const firestore = firebase.firestore();
    if (
      event.date &&
      event.date !== getState().firestore.ordered.events[0].date
    ) {
      event.date = moment(event.date).toDate();
    }
    if (event.end && event.end !== getState().firestore.ordered.events[0].end) {
      event.end = moment(event.end).toDate();
    }
    try {
      var eventDocRef = firestore.collection("events").doc(event.id);
      var dateEqual = compareAsc(
        getState().firestore.ordered.events[0].date.toDate(),
        event.date
      );
      var enddateEqual = compareAsc(
        getState().firestore.ordered.events[0].end.toDate(),
        event.end
      );

      if (enddateEqual !== 0 || dateEqual !== 0) {
        if (enddateEqual !== 0) {
          var batch = firestore.batch();
          await batch.update(eventDocRef, event);

          var eventAttendeeRef = firestore.collection("event_attendee");
          var eventAttendeeQuery = await eventAttendeeRef.where(
            "eventId",
            "==",
            event.id
          );
          var eventAttendeeQuerySnap = await eventAttendeeQuery.get();

          for (var i = 0; i < eventAttendeeQuerySnap.docs.length; i++) {
            var eventAttendeeDocRef = await firestore
              .collection("event_attendee")
              .doc(eventAttendeeQuerySnap.docs[i].id);
            await batch.update(eventAttendeeDocRef, {
              eventEnd: event.end
            });
          }
          await batch.commit();
        }
        if (dateEqual !== 0) {
          batch = firestore.batch();
          await batch.update(eventDocRef, event);

          eventAttendeeRef = firestore.collection("event_attendee");
          eventAttendeeQuery = await eventAttendeeRef.where(
            "eventId",
            "==",
            event.id
          );
          eventAttendeeQuerySnap = await eventAttendeeQuery.get();

          for (let i = 0; i < eventAttendeeQuerySnap.docs.length; i++) {
            eventAttendeeDocRef = await firestore
              .collection("event_attendee")
              .doc(eventAttendeeQuerySnap.docs[i].id);
            await batch.update(eventAttendeeDocRef, {
              eventDate: event.date
            });
          }
          await batch.commit();
        }
      } else {
        await eventDocRef.update(event);
      }
      dispatch(asyncActionFinish());
      toastr.success("Success", "Event has been updated");
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
      toastr.error("Oops", "Something went wrong");
    }
  };
};

export const cancelToggle = (cancelled, eventId) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();
  const message = cancelled
    ? "Are you sure you want to cancel the event?"
    : "This reactivate the event - are you sure?";
  try {
    toastr.confirm(message, {
      onOk: () =>
        firestore.update(`events/${eventId}`, {
          cancelled: cancelled
        })
    });
  } catch (error) {
    console.log(error);
  }
};

export const getTextPosts = lastPost => async (dispatch, getState) => {
  const firestore = firebase.firestore();
  const eventsRef = firestore.collection("events");
  var today = new Date(Date.now());
  try {
    dispatch(asyncActionStart());
    var startAfter;
    if (lastPost !== null) {
      startAfter = await firestore
        .collection("events")
        .doc(lastPost.id)
        .get();
    }

    var queryPosts;
    if (lastPost !== null && startAfter !== null) {
      queryPosts = eventsRef
        .where("end", ">=", today)
        .where("type", "==", TEXT_POST_T)
        .orderBy("end")
        .startAfter(startAfter)
        .limit(2);
    } else {
      queryPosts = eventsRef
        .where("end", ">=", today)
        .where("type", "==", TEXT_POST_T)
        .orderBy("end")
        .limit(2);
    }

    var querySnap = await queryPosts.get();

    if (querySnap.docs.length === 0) {
      dispatch(asyncActionFinish());
      return querySnap;
    }

    // put all the posts into a list, attempting to filter
    //  out repeats
    var posts = [];
    var postsIDs = [];
    for (var i = 0; i < querySnap.docs.length; i++) {
      var post = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
      if (!postsIDs.includes(post.id)) {
        postsIDs.push(post.id);
        posts.push(post);
      }
    }

    // return the assembled list
    dispatch({ type: FETCH_T_POSTS, payload: { posts } });
    dispatch(asyncActionFinish());
    return querySnap;
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

export const getEventPosts = lastPost => async (dispatch, getState) => {
  var today = new Date(Date.now());
  const firestore = firebase.firestore();
  const eventsRef = firestore.collection("events");
  try {
    dispatch(asyncActionStart());
    var startAfter;
    if (lastPost !== null) {
      startAfter = await firestore
        .collection("events")
        .doc(lastPost.id)
        .get();
    }
    var queryEvents;

    if (lastPost !== null && startAfter !== null) {
      queryEvents = eventsRef
        .where("end", ">=", today)
        .where("type", "==", EVENT_POST_T)
        .orderBy("end")
        .startAfter(startAfter)
        .limit(2);
    } else {
      queryEvents = eventsRef
        .where("end", ">=", today)
        .where("type", "==", EVENT_POST_T)
        .orderBy("end")
        .limit(2);
    }

    var querySnap = await queryEvents.get();

    if (querySnap.docs.length === 0) {
      dispatch(asyncActionFinish());
      return querySnap;
    }

    // put all the events into a list, while
    //  attempting to filter out repeats
    var events = [];
    var eventIDs = [];
    for (var i = 0; i < querySnap.docs.length; i++) {
      var event = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
      if (!eventIDs.includes(event.id)) {
        eventIDs.push(event.id);
        events.push(event);
      }
    }

    // return the list
    dispatch({ type: FETCH_E_POSTS, payload: { events } });
    dispatch(asyncActionFinish());
    return querySnap;
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

export const addPostComment = (eventId, values, parentId) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const profile = getState().firebase.profile;
  const user = firebase.auth().currentUser;
  var newComment = {
    parentId: parentId,
    displayName: profile.displayName,
    photoURL: profile.photoURL || "/assets/user.png",
    uid: user.uid,
    text: values.comment,
    date: Date.now()
  };
  try {
    await firebase.push(`event_chat/${eventId}`, newComment);
  } catch (error) {
    console.log(error);
    toastr.error("Oops", "Could not add comment");
  }
};
