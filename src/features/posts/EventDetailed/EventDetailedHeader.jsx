import React from 'react';
import { Segment, Image, Item, Header, Button, Label, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';


const eventImageStyle = {
  filter: 'brightness(30%)'
};

const eventImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white'
};

const EventDetailedHeader = ({ openModal, authenticated, loading, event, isHost, isGoing, goingToEvent, cancelGoingToEvent }) => {
  return (
    <Segment.Group>
      <Helmet>
        <title>UnMe - Event: {event.title}</title>
      </Helmet>
      <Segment basic attached="top" style={{ padding: '0' }}>
        <Image
          src={`/assets/categoryImages/${event.category}.jpg`}
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
                  style={{ color: 'white' }}
                />
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom">
        <Grid>
          <Grid.Column width={12}>
          {!isHost && (
            <div>
                {isGoing && !event.cancelled &&
                <Button onClick={() => cancelGoingToEvent(event)}>Cancel Going</Button>}

                {!isGoing && authenticated && !event.cancelled &&
                <Button loading={loading} onClick={() => goingToEvent(event)} color="green">JOIN THIS EVENT</Button>}
                
                {!authenticated && !event.cancelled &&
                <Button loading={loading} onClick={() => openModal('UnauthModal')} color="green">JOIN THIS EVENT</Button>}
                
                {event.cancelled && !isHost &&
                <Label size='large' color='red' content='This event has been cancelled'/>}
            </div>
          )}
          </Grid.Column>
          <Grid.Column width={4}>
            <h3>
             
            </h3>
          </Grid.Column>
        </Grid>
        {isHost && (
          <Button
            as={Link}
            to={`/manage/event/${event.id}`}
            basic
            className="green-button"
          >
            Manage Event
          </Button>
        )}
        
      </Segment>

    </Segment.Group>
  );
};

export default EventDetailedHeader;
