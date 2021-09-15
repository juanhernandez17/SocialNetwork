import './calendarPage.css'
import CalendarCom from "./calendar";
import { connect } from "react-redux";
import { firestoreConnect, isEmpty } from "react-redux-firebase";
import React, { Component } from "react";
import {Link} from 'react-router-dom'
import { Grid, Container, Button } from "semantic-ui-react";
import NavBar from "../../nav/NavBar/NavBar";
import {  getUserEvents} from "../calendarActions";
import CalendarAgenda from "../calendarAgenda/calendarAgenda";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const mapState = (state, ownProps) => {
  var userUid = null;
  var profile = {};

  if (ownProps.match.params.id === state.auth.uid) {
    profile = state.firebase.profile
  } else {
    profile = !isEmpty(state.firestore.ordered.profile) && state.firestore.ordered.profile[0];
    userUid = ownProps.match.params.id;
  }
  return {
    profile,
    userUid,
    calendar: state.calendar,
    eventsLoading: state.async.loading,
    auth: state.firebase.auth,
    photos: state.firestore.ordered.photos,
    requesting: state.firestore.status.requesting,
    following: state.firestore.ordered.following
  }
}

const actions = {
  getUserEvents
};
class CalendarPage extends Component {
  state = {
    initialLoading: true
  }
  async componentDidMount() {
    await this.props.getUserEvents(this.props.auth.uid, null)
    this.setState({
      initialLoading: false
    })
  }
  render() {
    const { calendar } = this.props;
    if (this.state.initialLoading) return <LoadingComponent inverted={true}/>
    return (
      <div>
        <NavBar />
        <Container className="main">
          <Grid divided stackable>
            <Grid.Row>
              <Grid.Column only="computer tablet" width={3}>
                <h1>Your Events</h1>
              </Grid.Column>
              <Grid.Column only="computer tablet" width={10}>
                <h1>Your Calendar</h1>
              </Grid.Column>
              <Grid.Column width={3} only="computer tablet">
                <Button
                  floated={'right'}
                  as={Link}
                  to={'/createEvent'}
                  positive
                  props={this.props}
                  content="Create Event"
                />
              </Grid.Column>
              <Grid.Column only="mobile" width={3}>
                <Button
                  floated={'right'}
                  as={Link}
                  to={'/createEvent'}
                  positive
                  content="Create Event"
                />
                <h1>Your Events</h1>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className="gridrow">
              <Grid.Column computer={3} className="agenda">
                {calendar && (
                  <CalendarAgenda
                    events={calendar}
                    owns={this.props.auth.uid}
                  />
                )}
              </Grid.Column>
              <Grid.Column only="mobile">
                <h1>Your Calendar</h1>
              </Grid.Column>
              <Grid.Column computer={13}>
                {calendar && <CalendarCom events={calendar} />}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default connect(
  mapState,
  actions
)(
  firestoreConnect([
    // { collection: 'calendars' }
  ])(CalendarPage)
);
