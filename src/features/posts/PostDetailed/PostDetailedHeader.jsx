// Import essential packages
import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import format from 'date-fns/format';
import { Link } from 'react-router-dom';


/* Post Detailed Info
 *  A simpler version of the Event Detailed Info
 */
class PostDetailedHeader extends Component {
  render() {
    const { post } = this.props;
    var date;
    if ( post.date ) {
        date = post.date.toDate();
    }
    else {
        date = "No timestamp found"
    }
    return (
      <Grid>
        <Grid.Column width={2}>
          <Image size="tiny" circular src={post.hostPhotoURL} as={Link} to={`/profile/${post.hostUid}`} />  
        </Grid.Column>
        <Grid.Column width={9}>
          <h3><a href={`/profile/${post.hostUid}`}>{post.hostedBy}</a></h3>
          <h1 className="post-title">{post.title}</h1>
        </Grid.Column>
        <Grid.Column width={5}>
          <p>{ format(date, 'dddd Do MMMM, YYYY') } at {format(date, 'hh:mm a') }</p>
        </Grid.Column>
      </Grid>
    );
  }
}

export default PostDetailedHeader;
