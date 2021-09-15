import React from "react";
import { Item } from "semantic-ui-react";
import { Link } from "react-router-dom";

const FriendList = ({user}) => {
  return (
    <Item as={Link} to={`/profile/${user.id}`}>
      <Item.Image
        size="mini"
        src={user.photoURL || '/assets/user.png'}
      />

      <Item.Content>
        <Item.Header>{user.displayName}</Item.Header>
      </Item.Content>
    </Item>
  );
};

export default FriendList;
