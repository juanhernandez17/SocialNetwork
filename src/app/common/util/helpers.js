import moment from 'moment'
import { EVENT_POST_T } from '../../../features/posts/postConstants';

export const objectToArray = (object) => {
  if (object) {
    return Object.entries(object).map(e => Object.assign(e[1], {id: e[0]}))
  }
}

export const createNewPost = (user, photoURL, event, type) => {
  if ( type === EVENT_POST_T ) {
    event.date = moment(event.date).toDate();
    event.end = moment(event.end).toDate();
  }
  else {
    event.date = moment(new Date(Date.now())).toDate();
    var aDayFromNow = new Date(Date.now());
    aDayFromNow.setTime( aDayFromNow.getTime() + 86400000 )
    event.end = moment(aDayFromNow).toDate();
  }
  return {
    type: type,
    ...event,
    hostUid: user.uid,
    hostedBy: user.displayName,
    hostPhotoURL: photoURL || '/assets/user.png',
    created: moment(Date.now()).toDate(),
    attendees: ( type === EVENT_POST_T ) ? {
      [user.uid]: {
        going: true,
        joinDate: Date.now(),
        photoURL: photoURL || '/assets/user.png',
        displayName: user.displayName,
        host: true
      }
    } : null
  }
}

export const createDataTree = dataset => {
    var hashTable = Object.create(null);
    dataset.forEach(a => hashTable[a.id] = {...a, childNodes: []});
    var dataTree = [];
    dataset.forEach(a => {
        if (a.parentId) hashTable[a.parentId].childNodes.push(hashTable[a.id]);
        else dataTree.push(hashTable[a.id])
    });
    return dataTree
};