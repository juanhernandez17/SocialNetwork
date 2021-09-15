// Import essential packages
import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';

// Import our modules
import TextArea from '../../../app/common/form/TextArea';


class PostCommentsForm extends Component {
  handleCommentSubmit = values => {
    const { addPostComment, reset, eventId, closeForm, parentId } = this.props;
    addPostComment(eventId, values, parentId);
    reset();
    if (parentId !== 0) {
        closeForm();
    }
  };

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.handleCommentSubmit)}>
        <Field name="comment" type="text" component={TextArea} rows={2} />
        <Button content="Comment" labelPosition="left" icon="edit" basic className="green-button" primary />
      </Form>
    );
  }
}

export default reduxForm({ Fields: 'comment' })(PostCommentsForm);
