// Import essential packges
import React, { Component } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { Link } from 'react-router-dom';


// Sytle constants
const textStyle = { marginLeft: "-5px" };
const buttonStyle = { width: "45px", height: "30x", marginLeft: "-5px" };

/* Pending Card:
 *  Display a pending friend request
 */
class PendingCard extends Component {
  constructor(props) {
    super(props);
    this.declineFriendRequest = props.declineFriendRequest;
    this.acceptFriendRequest = props.acceptFriendRequest;
  }

  accepted = (user) => {
    this.acceptFriendRequest(user);
    this.declineFriendRequest(user);
  };

  declined = (user) => {
    this.declineFriendRequest(user);
  };

  render() {
    const { user } = this.props;
    return (
      <Card>
        <Image src={user.photoURL || "/assets/user.png"} as={Link} to={`/profile/${user.id}`}/>
        <Card.Content textAlign="center">
          <Card.Header content={user.displayName} style={textStyle} />
          <Button.Group>
            <Button
              positive
              style={buttonStyle}
              icon="check"
              onClick={() => this.accepted(user)}
            />
            <Button
              negative
              style={buttonStyle}
              icon="close"
              onClick={ () => this.declined(user)}
            />
          </Button.Group>
        </Card.Content>
      </Card>
    );
  }
}
export default PendingCard;
