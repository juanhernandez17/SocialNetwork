import { FETCH_CAL } from "./calendarConstants";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../async/asyncActions";
import firebase from "../../app/config/firebase";

export const getUserEvents = (userUid, activeTab) => async (
  dispatch,
  getState
) => {
  dispatch(asyncActionStart());
  const firestore = firebase.firestore();
  var eventsRef = firestore.collection("event_attendee");
  var query = eventsRef
        .where("userUid", "==", userUid)
        .orderBy("eventDate", "desc");
  try {
    var querySnap = await query.get();
    var calendar = [];

    for (var i = 0; i < querySnap.docs.length; i++) {
      var id = querySnap.docs[i].data().eventId
      var evt = await firestore
        .collection("events")
        .doc(id)
        .get();
      var dat = await evt.data();
      if (dat) {
        if (dat.end) {
          calendar.push({
            title: dat.title,
            start: dat.date.toDate(),
            end: dat.end.toDate(),
            cancelled: dat.cancelled,
            id: evt.id,
            ownerID: dat.hostUid
          });
        } else {
          calendar.push({
            title: dat.title,
            start: dat.date.toDate(),
            cancelled: dat.cancelled,
            allDay: true,
            id: evt.id,
            ownerID: dat.hostUid
          });
        }
      }
    }
    dispatch({ type: FETCH_CAL, payload: { calendar } });
    dispatch(asyncActionFinish());
    return calendar
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};
