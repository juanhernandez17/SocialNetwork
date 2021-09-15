import React from "react";
import { Segment, Image, Item, Header, Button /*, Label*/ } from "semantic-ui-react";
// import { Link } from "react-router-dom";
import format from "date-fns/format";
const eventImageStyle = {
  filter: "brightness(30%)"
};

const eventImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white"
};

const EventInfoHeader = ({
  openModal,
  deleteEvent,
  authenticated,
  loading,
  event,
  isHost,
  isGoing,
  goingToEvent,
  cancelGoingToEvent,
  history
}) => {
  const handledelete = () => {
    deleteEvent(event);
    history.goBack();
  };
  var eventDate;
  if (event.start) {
    eventDate = event.start.toDate();
  }
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={event.headImage}
          fluid
          style={eventImageStyle}
        />

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={event.title}
                  style={{ color: "white" }}
                />
                <p>{format(eventDate, "dddd MMMM Do")}</p>
                <p>
                  Hosted by <strong>{event.Host}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom">
        {!isHost && (
          <div>
            {isGoing && !event.cancelled && <Button>Cancel Going</Button>}

            {!isGoing && authenticated && !event.cancelled && (
              <Button loading={loading} color="teal">
                JOIN THIS EVENT
              </Button>
            )}
          </div>
        )}

        {isHost && (
          <div>
            <Button
              onClick={() =>
                openModal("CreateEventModal", { ...event, type: "edit" })
              }
              color="green"
            >
              Manage Event
            </Button>
            <Button
              onClick={handledelete}
              floated="right"
              color="red"
              size="tiny"
              content="Delete Event"
            />
          </div>
        )}
        {!isHost && (
          <div>
            <Button
              disabled
              onClick={() =>
                openModal("CreateEventModal", { ...event, type: "edit" })
              }
              color="green"
            >
              Manage Event
            </Button>
            <Button
              onClick={handledelete}
              floated="right"
              color="red"
              size="tiny"
              content="Delete Event"
            />
          </div>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default EventInfoHeader;
