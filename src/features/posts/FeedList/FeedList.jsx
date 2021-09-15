// Import essential packages
import React, { Component } from 'react';
import FeedItem from './FeedItem';
import InfiniteScroll from 'react-infinite-scroller';
import { Segment } from 'semantic-ui-react';

/* Feed List
 *  A list which displays items on the feed
 */
class FeedList extends Component {
  render() {
    const { posts, getNextEvents, loading, morePosts } = this.props;
    
    // Filter out repeats
    var allPostsIDs = [];
    var allPosts = [];
    for ( let post of posts ) {
      if ( !allPostsIDs.includes(post.id) ) {
        allPostsIDs.push(post.id);
        allPosts.push(post);
      }
    } 
    
    return (
      <div>
        {posts &&
          ( posts.length > 0 ) ? 
          (
            <InfiniteScroll
              pageStart={0}
              loadMore={getNextEvents}
              hasMore={!loading && morePosts}
              initialLoad={false}
            >
              { allPosts.length >= 1 && allPosts.map(event => <FeedItem key={event.id} event={event}/>) }
            </InfiniteScroll>
          )
          :
          (
            <Segment.Group>
                <Segment attached='top'>
                  <h1>Sorry...</h1>
                </Segment>
                <Segment attached>
                  <p>
                    There's simply no posts available at the moment.
                  </p>
                </Segment>
            </Segment.Group>
          )
        }
      </div>
    );
  }
}

export default FeedList;
