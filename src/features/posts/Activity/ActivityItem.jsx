import React, { Component } from 'react';
import { Feed } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import { TEXT_POST_T } from '../postConstants';

class EventActivityItem extends Component {
  renderSummary = (activity) => {
    // console.log(activity);
    switch (activity.type) {
      case 'newEvent':
        return (
          <div>
            New Event!{' '}
            <Feed.User as={Link} to={{ pathname: '/profile/' + activity.hostUid }}>
              {activity.hostedBy}
            </Feed.User>{' '}
            is hosting <Link to={{ pathname: '/event/' + activity.eventId }}>{activity.title}</Link>
          </div>
        );
      case 'cancelledEvent':
        return (
          <div>
            Event Cancelled!{' '}
            <Feed.User as={Link} to={{ pathname: '/profile/' + activity.hostUid }}>
              {activity.hostedBy}
            </Feed.User>{' '}
            has cancelled <Link to={{ pathname: '/event/' + activity.eventId }}>{activity.title}</Link>
          </div>
        );
      case TEXT_POST_T:
          return (
            <div>
              New Text Post by {' '}
              <Feed.User as={Link} to={{ pathname: "/profile/" + activity.hostUid }}>
                {activity.hostedBy}
              </Feed.User>
              {': '} <Link to={{ pathname: "/post/" + activity.eventId }}>{activity.title}</Link>
            </div>
          );
      default:
        return;
    }
  };

  render() {
    const { activity } = this.props;

    return (
      <Feed.Event>
        <Feed.Label>
          <img src={activity.photoURL || '/assets/user.png'} alt="" />
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>{this.renderSummary(activity)}</Feed.Summary>
          <Feed.Meta>
            <Feed.Date>{ activity.timestamp && distanceInWordsToNow(activity.timestamp)} ago</Feed.Date>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
    );
  }
}

export default EventActivityItem;
