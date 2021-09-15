import React, { Component } from "react";
import AgendaItem from "./agendaItem";

class calendarAgenda extends Component {
    render() {
      const { events, deleteEvent } = this.props
      // events.length && console.log('agg',events)
    return (
      <div>
        { events && events.map(event =>
          <AgendaItem
            key={event.id}
            event={event}
            deleteEvent={deleteEvent}
            owns={this.props.owns}
          />
        )}

      </div>
    );
  }
}

export default calendarAgenda;
