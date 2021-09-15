// Import essential packages
import React, { Component } from 'react';
import { Grid , Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getEventPosts, getTextPosts } from '../postActions';
import { Helmet } from 'react-helmet';

// Import our modules
import FeedList from '../FeedList/FeedList';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import EventActivity from '../Activity/ActivityList';


// Variables and Functions
const query = [
  {
    collection: 'activity',
    orderBy: ['timestamp', 'desc'],
    limit: 5
  }
]

const mapState = (state) => ({
  events: state.events,
  loading: state.async.loading,
  activities: state.firestore.ordered.activity
});

const actions = {
  getEventPosts,
  getTextPosts
};

/* Feed Dashboard
 *  Renders the current feed of events, which will expire by date, and text
 *  posts, which will render in order of date, but not expire.
 */
class FeedDashboard extends Component {
  state = {
    morePosts: false,
    loadingInitial: true,
    loadedEvents: [],
    contextRef: {}
  };

  availablePosts = 0;

  async componentDidMount() {
    var nextEvent = await this.props.getEventPosts(null);
    var nextPosts = await this.props.getTextPosts(null);

    if ( nextEvent && nextEvent.docs && nextEvent.docs.length > 1 )  {
      this.setState({
        morePosts: true,
        loadingInitial: false
      });
      this.availablePosts += nextEvent.docs.length;
    }
    if ( nextPosts && nextPosts.docs && nextPosts.docs.length > 1 ) {
      this.setState({
        morePosts: true,
        loadingInitial: false
      });
      this.availablePosts += nextPosts.docs.length;
    }
    
    // if ( this.availablePosts === 0 ) {
    //   this.setState({
    //     morePosts: false,
    //     loadingInitial: false
    //   });
    // }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.events !== nextProps.events) {
      this.setState({
        loadedEvents: [...this.state.loadedEvents, ...nextProps.events]
      });
    }
  }

  getNextPosts = async () => {
    const { events } = this.props;
    var lastEvent = events && events[events.length - 1];
    var nextEvents = await this.props.getEventPosts(lastEvent);
    var nextPosts = await this.props.getTextPosts(lastEvent);

    var everyPost = [];
    if ( nextEvents && nextEvents.docs && nextEvents.docs.length <= 1 ) {
      this.setState({
        morePosts: false
      });
      everyPost = [...nextEvents];
    }
    if ( nextPosts && nextPosts.docs && nextPosts.docs.length <= 1 ) {
      this.setState({
        morePosts: false
      });
      everyPost = [...everyPost, ...nextPosts];
    }
    return everyPost;
  };

  handleContextRef = contextRef => this.setState({contextRef})

  render() {
    const { loading, activities } = this.props;
    const { morePosts, loadedEvents } = this.state;
    if (this.state.loadingInitial) { 
       return <LoadingComponent inverted={true} />;
    }

    loadedEvents.sort((a, b) => a.date.seconds - b.date.seconds);

    return (
      <div className="top-buff">
        <Helmet>
          <title>UnME - Feed</title>
        </Helmet>
        <Grid>
          <Grid.Column width={10}>
            <div ref={this.handleContextRef}>
              <FeedList
                loading={loading}
                morePosts={morePosts}
                posts={loadedEvents}
                getNextEvents={this.getNextPosts}
              /> 
            </div>
          </Grid.Column>

          <Grid.Column width={6}>
            <EventActivity activities={activities} contextRef={this.state.contextRef} />
          </Grid.Column>

          <Grid.Column width={10}>
            <Loader active={loading}/>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default connect(mapState, actions)(firestoreConnect(query)(FeedDashboard));
