import React, { Component } from 'react'
import { List, Image, Popup } from 'semantic-ui-react'

class AttendingList extends Component {
  render() {
    const {people} = this.props;
    return (
      <List.Item>
       <Popup
            trigger={<Image as='a' size="mini" circular src={people.pic} />}
            content={people.name}
          />


      </List.Item>
    )
  }
}

export default AttendingList