import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';


class PostDetailedInfo extends Component {
  render() {
    const { post } = this.props;
    return (
      <Segment.Group>
        <Segment>
          <p>{post.description}</p>
        </Segment>
      </Segment.Group>
    );
  }
}

export default PostDetailedInfo;
