import React, { Component } from "react";
import { Button, Modal, Segment, Grid, Header, List } from "semantic-ui-react";
import { objectToArray } from "../../../app/comm/util/helpers";
import AttendingList from "./attendingList";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import { withFirestore, firestoreConnect, isEmpty } from "react-redux-firebase";
import { compose } from "redux";
import format from "date-fns/format";
import { deleteEvent }from '../calendarActions'
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { openModal } from "../../modals/modalActions";
import EventInfoHeader from "./eventInfoHeader";
import EventInfoDetails from "./eventInfoDetails";
const mapState = (state, ownProps) => {
  var event = {};

  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0];
  }

  return {
    requesting: state.firestore.status.requesting,
    event,
    loading: state.async.loading,
    auth: state.firebase.auth,
    eventChat:
      !isEmpty(state.firebase.data.event_chat) &&
      objectToArray(state.firebase.data.event_chat[ownProps.match.params.id])
  };
};

const actions = {
  openModal,
  deleteEvent
};

class EventInfo extends Component {
  state = {
    initialLoading: true
  };

  async componentDidMount() {
    const { firestore, match } = this.props;

    var event = await firestore.get(`events/${match.params.id}`);

    if (!event.exists) {
      toastr.error("Not found", "This event does not exits");
      this.props.history.push("/404");
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
    const { match, requesting, openModal, loading, event, auth, deleteEvent, history } = this.props;
    const isHost = event.ownerID === auth.uid;
    const loadingEvent = requesting[`events/${match.params.id}`];

    if (loadingEvent || this.state.initialLoading)
      return <LoadingComponent inverted={true} />;

    return (
      <Grid>
        <Grid.Column width={6}>
          {/* <EventDetailedSidebar attendees={attendees} /> */}
        </Grid.Column>
        <Grid.Column width={10}>
          <EventInfoHeader
            event={event}
            loading={loading}
            isHost={isHost}
            history={history}
            // isGoing={isGoing}
            // goingToEvent={goingToEvent}
            // cancelGoingToEvent={cancelGoingToEvent}
            // authenticated={authenticated}
            deleteEvent={deleteEvent}
            openModal={openModal}
          />
          <EventInfoDetails event={event} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapState,
  actions
)(
  firestoreConnect([
    // { collection: 'calendars' }
  ])(EventInfo)
);
