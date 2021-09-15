import React from 'react'
import { Header, Segment, Feed, Sticky, Button, Icon } from 'semantic-ui-react'
import EventActivityItem from './ActivityItem'
import { Link } from 'react-router-dom';


const EventActivity = ({activities, contextRef}) => {
  return (
    <Sticky context={contextRef} offset={100}>
      <Button as={Link} to={"/createEvent"} basic className="darkgreen-button" fluid>
        <Icon name='plus' /> New Event
      </Button>
      <Button className="green-button" style={{marginTop: "10px"}} as={Link} to={"/createPost"} basic fluid>
        <Icon name='plus' /> New Text Post
      </Button>
      <Header attached='top' content='Recent Activity'/>
      <Segment attached>
        { activities  && (activities.length > 0) ? 
          (
            <Feed>
              { activities.map((activity) => (
                <EventActivityItem key={activity.id} activity={activity}/>
              ))}
            </Feed>
          )
          :
          (
            <p>No activity just yet...</p>
          )
        }
      </Segment>
    </Sticky>
  )
}

export default EventActivity
