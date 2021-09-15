import React, { Component } from 'react';
import { Segment, Header, Comment } from 'semantic-ui-react';
import PostCommentsForm from './PostCommentsForm';
import { Link } from 'react-router-dom';
import distanceInWords from 'date-fns/distance_in_words';
import { TEXT_POST_T, EVENT_POST_T } from '../postConstants';


class PostComments extends Component {
  state = {
    showReplyForm: false,
    selectedCommentId: null
  };

  handleOpenReplyForm = id => () => {
    this.setState({
      showReplyForm: true,
      selectedCommentId: id
    });
  };

  handleCloseReplyForm = () => {
    this.setState({
      selectedCommentId: null,
      showReplyForm: false
    });
  };

  handleHeaderDisplay = (type) => {
    switch (type) {
      case EVENT_POST_T:
        return (
          <Header>Event Conversation</Header>
        );
      case TEXT_POST_T:
        return (
          <Header>Post Comments</Header>
        );
      default:
        return (
          <Header>Comments</Header>
        );
    }
  }

  render() {
    const { addPostComment, eventId, eventChat, type } = this.props;
    const { showReplyForm, selectedCommentId } = this.state;
    var headerDisplay = this.handleHeaderDisplay(type);
    return (
      <div>
        <Segment textAlign="center" attached="top" inverted color="green" style={{ border: 'none' }}>
          { headerDisplay }
        </Segment>

        <Segment attached>
          <Comment.Group>
            {eventChat &&
              eventChat.map(comment => (
                <Comment key={comment.id}>
                  <Comment.Avatar src={comment.photoURL || '/assets/user.png'} />
                  <Comment.Content>
                    <Comment.Author as={Link} to={`/profile/${comment.uid}`}>
                      {comment.displayName}
                    </Comment.Author>
                    <Comment.Metadata>
                      <div>{distanceInWords(comment.date, Date.now())} ago</div>
                    </Comment.Metadata>
                    <Comment.Text>{comment.text}</Comment.Text>
                    <Comment.Actions>
                      <Comment.Action onClick={this.handleOpenReplyForm(comment.id)}>Post a reply</Comment.Action>
                      {showReplyForm &&
                        selectedCommentId === comment.id && (
                          <PostCommentsForm
                            form={`reply_${comment.id}`}
                            addPostComment={addPostComment}
                            eventId={eventId}
                            closeForm={this.handleCloseReplyForm}
                            parentId={comment.id}
                          />
                        )}
                    </Comment.Actions>
                  </Comment.Content>

                  {comment.childNodes &&
                    comment.childNodes.map(child => (
                      <Comment.Group>
                        <Comment key={child.id}>
                          <Comment.Avatar src={child.photoURL || '/assets/user.png'} />
                          <Comment.Content>
                            <Comment.Author as={Link} to={`/profile/${child.uid}`}>
                              {child.displayName}
                            </Comment.Author>
                            <Comment.Metadata>
                              <div>{distanceInWords(child.date, Date.now())} ago</div>
                            </Comment.Metadata>
                            <Comment.Text>{child.text}</Comment.Text>
                            <Comment.Actions>
                              <Comment.Action onClick={this.handleOpenReplyForm(child.id)}>Reply</Comment.Action>
                              {showReplyForm &&
                                selectedCommentId === child.id && (
                                  <PostCommentsForm
                                    form={`reply_${child.id}`}
                                    addPostComment={addPostComment}
                                    eventId={eventId}
                                    closeForm={this.handleCloseReplyForm}
                                    parentId={child.parentId}
                                  />
                                )}
                            </Comment.Actions>
                          </Comment.Content>
                        </Comment>
                      </Comment.Group>
                    ))}
                </Comment>
              ))}
          </Comment.Group>
          <PostCommentsForm parentId={0} form={'newComment'} addPostComment={addPostComment} eventId={eventId} />
        </Segment>
      </div>
    );
  }
}

export default PostComments;
