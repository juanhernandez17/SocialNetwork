export const userDetailedQuery = ({ auth, userUid, match }) => {
  if (userUid !== null) {
    return [
      {
        collection: 'users',
        doc: userUid,
        storeAs: 'profile'
      },
      {
        collection: 'users',
        doc: userUid,
        subcollections: [{ collection: 'photos' }],
        storeAs: 'photos'
      },
      {
        collection: 'users',
        doc: auth.uid,
        subcollections: [{collection: 'sentFriendRequests', doc: match.params.id}],
        storeAs: 'sentFriendRequests'
      },
      {
        collection: 'users',
        doc: auth.uid,
        subcollections: [{collection: 'pendingFriendRequests', doc: match.params.id}],
        storeAs: 'pendingFriendRequests'
      },
      {
        collection: 'users',
        doc: auth.uid,
        subcollections: [{collection: 'myFriends', doc: match.params.id}],
        storeAs: 'myFriends'
      }
    ];
  }
  else {
    return [
      {
        collection: 'users',
        doc: auth.uid,
        subcollections: [{ collection: 'photos' }],
        storeAs: 'photos'
      }
    ];
  }
};
