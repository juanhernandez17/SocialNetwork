// Import Essential Packages
import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { toastr } from 'react-redux-toastr'
import { connect } from 'react-redux';
import { withFirestore, firebaseConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';

// Import our modules
import PostDetailedHeader from './PostDetailedHeader';
import PostDetailedInfo from './PostDetailedInfo';
import PostComments from '../Commenting/PostComments';
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { objectToArray, createDataTree } from '../../../app/common/util/helpers';
import { addPostComment } from '../postActions';
import { openModal } from '../../modals/modalActions'


const mapState = (state, ownProps) => {
  var post = {};

  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    post = state.firestore.ordered.events[0];
  }

  return {
    requesting: state.firestore.status.requesting,
    post,
    loading: state.async.loading,
    auth: state.firebase.auth,
    eventChat:
      !isEmpty(state.firebase.data.event_chat) &&
      objectToArray(state.firebase.data.event_chat[ownProps.match.params.id])
  };
};

const actions = {
  addPostComment,
  openModal
};

class TextPostDetailedPage extends Component {
  state = {
    initialLoading: true
  }

  async componentDidMount() {
    const { firestore, match } = this.props;
    var post = await firestore.get(`events/${match.params.id}`);
    if ( !post.exists ) {
      toastr.error("I don't know how to say this, but...", "This post just doesn't exist!");
      this.props.history.push("/error");
    }
    await firestore.setListener(`events/${match.params.id}`);
    this.setState({
      initialLoading: false
    });
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  render() {
    const { match, requesting, openModal, loading, post, auth, addPostComment, eventChat } = this.props;
    const isPoster = post.hostUid === auth.uid;
    const chatTree = !isEmpty(eventChat) && createDataTree(eventChat);
    const authenticated = auth.isLoaded && !auth.isEmpty;
    const loadingEvent = requesting[`posts/${match.params.id}`]

    if (loadingEvent || this.state.initialLoading) return <LoadingComponent inverted={true}/>
    return (
      <Grid>
        <Grid.Column width={14}>
        <Segment.Group>
          <Segment attached="top">
            <PostDetailedHeader
              post={post}
              loading={loading}
              isPoster={isPoster}
              authenticated={authenticated}
              openModal={openModal}
            />
            </Segment>
            <Segment attached>
              <PostDetailedInfo post={post} />
            </Segment>
          </Segment.Group>
          {authenticated &&
          <PostComments eventChat={chatTree} addPostComment={addPostComment} eventId={post.id} type={post.type} />}
        </Grid.Column>
      </Grid>
    );
  }
}

export default compose(
  withFirestore,
  connect(mapState, actions),
  firebaseConnect(props => props.auth.isLoaded && !props.auth.isEmpty && [`event_chat/${props.match.params.id}`])
)(TextPostDetailedPage);
