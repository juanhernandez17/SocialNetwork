import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import { Link } from 'react-router-dom'
// import EventInfo from "../eventInfo/eventInfo";
import format from "date-fns/format";
// import firebase from "../../../app/config/firebase";
import { connect } from "react-redux";
import { cancelToggle } from "../../posts/postActions";
const actions = {
  cancelToggle
};
class AgendaItem extends Component {
  render() {
    const { event } = this.props;
    const startdate = event.start;
    const owner = (this.props.owns === event.ownerID);
    return (
      <Card raised className='eventcard'>
        <Card.Header className="cardhead" textAlign="center" content={event.title} />
        <Card.Content textAlign="center">
          {format(startdate, "M/DD/YYYY")}
          <br />
          {format(startdate, "hh:mm aa")}
        </Card.Content>
        <Card.Content extra>
          {/* {owner && <Button animated
            onClick={() => cancelToggle(!event.cancelled, event.id)}
            type='button'
            size='small'
            color={event.cancelled ? 'green' : 'red'}
            floated='right'
            >
            <Button.Content visible>
              <Icon name={event.cancelled ? 'check' : 'delete'} />
            </Button.Content>
            <Button.Content hidden>
              {event.cancelled ? 'Activate' : 'Cancel'}
            </Button.Content>
          </Button>} */}
           {owner &&<Button floated="right" as={Link}
            to={`/manage/event/${event.id}`} color="blue" size="small" icon="edit" />}
          <Button as={Link} to={`/event/${event.id}`} floated="right" color="teal" size="small" icon="info" />
        </Card.Content>
      </Card>
    );
  }
}
export default connect(
  null,
  actions
)(AgendaItem);
