// Import essential packages
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withFirestore } from 'react-redux-firebase';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan } from 'revalidate';
import { Helmet } from 'react-helmet';

// Import our modules
import { createTextPost, cancelToggle } from '../postActions';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';


const greenTextStyle = {
  color: "#449951"
};

const mapState = (state, ownProps) => {
  var post = {};

  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    post = state.firestore.ordered.events[0];
  }

  return {
    initialValues: post,
    post,
    loading: state.async.loading
  };
};

const actions = {
  createTextPost,
  cancelToggle
};

const validate = combineValidators({
  title: isRequired({ message: 'The post title is required' }),
  description: composeValidators(
    isRequired({ message: 'Please include a body to your text post  ' }),
    hasLengthGreaterThan(4)({
      message: 'Description needs to be at least 5 characters'
    })
  )()
});

class TextPostForm extends Component {

  async componentDidMount() {
    const {firestore, match} = this.props;
    await firestore.setListener(`events/${match.params.id}`);
  }

  async componentWillUnmount() {
    const {firestore, match} = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  onFormSubmit = (values) => {
    if ( this.props.initialValues.id ) {
      // this.props.updateTextPost(values);
    }
    else {
      this.props.createTextPost(values);
      this.props.history.push("/");
    }
  };

  render() {
    const { invalid, submitting, pristine, post, cancelToggle, loading } = this.props;
    return (
    <div>
      <Grid>
        <Helmet>
          <title>UnME - New Text Post</title>
        </Helmet>
        <Grid.Column width={10}>
          <Segment>
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Header sub style={greenTextStyle} content="Post Title" />
              <Field
                name="title"
                type="text"
                component={TextInput}
                placeholder="Give your post a title"
              />
              <Header sub style={greenTextStyle} content="Post Contents" />
              <Field
                name="description"
                type="text"
                component={TextArea}
                rows={5}
                placeholder="Text Post Body"
              />
              <Button
                loading={loading}
                disabled={invalid || submitting || pristine}
                positive
                type="submit"
              >
                Submit
              </Button>
              <Button disabled={loading} onClick={this.props.history.goBack} type="button">
                Cancel
              </Button>
              {post.id &&
              <Button
                onClick={() => cancelToggle(!post.cancelled, post.id)}
                type='button'
                color={post.cancelled ? 'green' : 'red'}
                floated='right'
                content={post.cancelled ? 'Reactivate Event' : 'Cancel Event'}
              />}
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
    );
  }
}

export default withFirestore(
  connect(mapState, actions)(
    reduxForm({ form: 'eventPostForm', enableReinitialize: true, validate })(
      TextPostForm
    )
  )
);
