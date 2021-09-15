import React from 'react';
import { Button, Grid, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const buttonBufferStyle = {
    marginTop: "5px"
};

const UserDetailedSidebar = ({ isCurrentUser, profile, sendFriendRequest, recievedMyRequest, cancelFriendRequest, acceptFriendRequest, sentMeFriendRequest, isMyFriend, removeFriend, declineFriendRequest}) => {
  return (
    <Grid.Column width={4}>
      <Segment>
        {isCurrentUser && <Button as={Link} to="/settings" color="green" fluid content="Edit Profile" />}
        {!isCurrentUser && sentMeFriendRequest && !isMyFriend && <Button onClick={() => {acceptFriendRequest(profile); declineFriendRequest(profile)}} color="green" fluid content="Accept Friend Request" />}
        {!isCurrentUser && sentMeFriendRequest && !isMyFriend && <Button onClick={() => declineFriendRequest(profile)} color="red" fluid content="Decline Friend Request" style={buttonBufferStyle }/>}
        {!isCurrentUser && isMyFriend && <Button onClick={() => removeFriend(profile)} color="red" fluid content="Remove From Friends List" />}
        {!isCurrentUser && !recievedMyRequest && !sentMeFriendRequest && !isMyFriend && <Button onClick={() => sendFriendRequest(profile)} color="teal" fluid content="Send Friend Request" />}
        {!isCurrentUser && recievedMyRequest && !sentMeFriendRequest && !isMyFriend && <Button onClick={() => cancelFriendRequest(profile)} color="yellow" fluid  content="Cancel Friend Request" />}
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedSidebar;

