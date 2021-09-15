// Import essential packages
import React, { Component } from 'react';
import { Segment, Item, Icon, List, Button, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import format from 'date-fns/format'
import { objectToArray } from '../../../app/common/util/helpers'

// Import our modules
import EventListAttendee from './EventPostAttendee'
import { EVENT_POST_T, TEXT_POST_T } from '../postConstants';


/* Feed Item
 *  A single post rendered on the feed
 */
class FeedItem extends Component {
  handleFeedType = (event) => {
    var feedItem = {
      hostLink: "",
      manageLink: "",
      directLink: "",
      details: "",
      message: "",
      attendees: ""
    };
    switch ( event.type ) {
      case TEXT_POST_T:
        feedItem.manageLink = `manage/post/${event.id}`;
        feedItem.hostLink = `profile/${event.hostUid}`;
        feedItem.directLink = `post/${event.id}`;
        feedItem.details = (
          <span>
            <Icon name='clock' /> {format(event.date.toDate(), 'dddd Do MMMM, YYYY')} at {format(event.date.toDate(), 'hh:mm a')}
          </span>
        );
        feedItem.attendees = "";
        feedItem.message = "Posted by ";
        break;
      case EVENT_POST_T:
        feedItem.manageLink = `manage/event/${event.id}`;
        feedItem.hostLink = `profile/${event.hostUid}`;
        feedItem.directLink = `event/${event.id}`;
        feedItem.details = (
            <span>
              <Icon name="clock" /> {format(event.date.toDate(), 'dddd Do MMMM')} at {format(event.date.toDate(), 'hh:mm a')}
              <Icon name="marker" style={{marginLeft: '10px'}} /> {event.venue}
            </span>
          );
        feedItem.attendees = (
          <Segment secondary>
            <List horizontal>
            {event.attendees && objectToArray(event.attendees).map((attendee) => (
              <EventListAttendee key={attendee.id} attendee={attendee}/>
            ))}
            </List>
          </Segment>
        );
        feedItem.message = "Hosted by ";
        break;
      default:
        break;
    }
    return feedItem;
  }
  render() {
    const { event } = this.props;
    const feedItem = this.handleFeedType(event);
    return (
    <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={event.hostPhotoURL} />
              <Item.Content>
                <Item.Header as={Link} to={feedItem.directLink}>{event.title}</Item.Header>
                <Item.Description>
                  { feedItem.message } <Link to={feedItem.hostLink}>{event.hostedBy}</Link>
                </Item.Description>
                { event.cancelled &&
                <Label style={{top: '-40px'}} ribbon='right' color='red' content='This event has been cancelled'/> }
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          {feedItem.details}
        </Segment>
        { feedItem.attendees }
        <Segment clearing>
        <span>{event.description}</span>
          <Button as={Link} to={feedItem.directLink} className="green-button" basic floated="right" content="View" />
        </Segment>
      </Segment.Group>
    );
  }
}

export default FeedItem;
