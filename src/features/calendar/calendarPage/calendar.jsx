import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

class CalendarCom extends Component {

  render() {

    const Localizer = Calendar.momentLocalizer(moment);
    const DnDCalendar = Calendar;
    const {events} = this.props
    return (
      <DnDCalendar
        localizer={Localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        resizable
        style={{ height: "94vh", outline: '1px solid blue'}}
      />
    );
  }
}

export default CalendarCom;

