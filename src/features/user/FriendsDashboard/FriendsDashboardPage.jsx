// Import essential packages
import React from 'react';
import { Grid, Segment, Header, Card, Item } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase'
import Helmet from 'react-helmet';

// Import our modules
import PendingCard from './PendingCard';
import FriendList from './FriendList';
import { acceptFriendRequest, declineFriendRequest} from '../userActions'


const query = ({auth, userUid, match}) => {
	return [
		{
      collection: 'users',
      doc: auth.uid,
      subcollections: [{collection: 'sentFriendRequests'}],
      storeAs: 'sentFriendRequests'
    },
    {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{collection: 'pendingFriendRequests'}],
      storeAs: 'pendingFriendRequests'
    },
    {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{collection: 'myFriends'}],
      storeAs: 'myFriends'
		}
	];
};

const actions = {
	acceptFriendRequest,
	declineFriendRequest
};

const mapState = (state, ownProps) => {
	return {
		userUid: state.firebase.auth.id,
		profile: state.firebase.profile,
		sentFriendRequests: state.firestore.ordered.sentFriendRequests,
		pendingFriendRequests: state.firestore.ordered.pendingFriendRequests,
		myFriends: state.firestore.ordered.myFriends,
		auth: state.firebase.auth,
		acceptFriendRequest: state.acceptFriendRequest,
		declineFriendRequest: state.declineFriendRequest,
	};
}

const PeopleDashboard = ({pendingFriendRequests, myFriends, acceptFriendRequest, declineFriendRequest}) => {
  return (
		<div>
			<Helmet>
				<title>UnMe - Friends List</title>
			</Helmet>
			<Grid>
				<Grid.Column width={12}>
					<Segment>
						<Header dividing content="Pending Friend Requests" />
						<Card.Group itemsPerRow={5} stackable>
						{ pendingFriendRequests && 
								pendingFriendRequests.map(pendingFriendRequest => <PendingCard key={pendingFriendRequest.id} user={pendingFriendRequest} acceptFriendRequest={acceptFriendRequest} declineFriendRequest={declineFriendRequest} />)
						}
						{ ( !pendingFriendRequests || pendingFriendRequests.length === 0 ) &&
							<div style={{height: "100px"}}><p style={{marginLeft: "10px", marginTop: "30px"}}>No pending requests currently</p></div>
						}
						</Card.Group>
					</Segment>
				</Grid.Column>
				<Grid.Column width={4}>
					<Segment>
						<Header dividing content="My Friends" />
						<Item.Group link>
						{myFriends && myFriends.map(myFriend=> <FriendList key={myFriend.id} user={myFriend} />)}
						</Item.Group>
					</Segment>
				</Grid.Column>
			</Grid>
		</div>
  );
};

export default compose(connect(mapState, actions), firestoreConnect((auth, userUid, match) => query(auth, userUid, match)))(PeopleDashboard);
