import React, { Component } from 'react';
import { Segment, Grid, Icon } from 'semantic-ui-react';
import format from 'date-fns/format'

class EventInfoDetails extends Component {
  state = {
    showMap: false
  }

  componentWillUnmount() {
    this.setState({
      showMap: false
    })
  }

  showMapToggle = () => {
    this.setState(prevState => ({
      showMap: !prevState.showMap
    }))
  }

  render() {
    const { event } = this.props;
    var eventStart = event.start.toDate()
    var eventEnd = event.end.toDate()
    return (
      <Segment.Group>
        <Segment attached="top">
          <Grid>
            <Grid.Column width={1}>
              <Icon size="large" color="green" name="info" />
            </Grid.Column>
            <Grid.Column width={15}>
              <p>{event.description}</p>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached>
          <Grid verticalAlign="middle">
            <Grid.Column width={1}>
              <Icon name="calendar" size="large" color="green" />
            </Grid.Column>
            <Grid.Column width={15}>
              <span>Starts: {format(eventStart, 'dddd Do MMM')} at {format(eventStart, 'h:mm A')}</span>
            </Grid.Column>
            <Grid.Column width={1}>
              <Icon name="calendar outline" size="large" color="green" />
            </Grid.Column>
            <Grid.Column width={15}>
              <span>Ends: {format(eventEnd, 'dddd Do MMM')} at {format(eventEnd, 'h:mm A')}</span>
            </Grid.Column>
          </Grid>
        </Segment>
      </Segment.Group>
    );
  }
}

export default EventInfoDetails;
