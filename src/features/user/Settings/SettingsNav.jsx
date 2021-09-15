import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom'

const headerStyle = {
  backgroundColor: "#449951",
  color: "white"
  
};

const SettingsNav = () => {
  return (
      <Menu fluid vertical>
        <Menu.Item style={headerStyle}><b>Profile</b></Menu.Item>
        <Menu.Item as={NavLink} to='/settings/myProfile'><Icon name='user'/>My Profile</Menu.Item>
        <Menu.Item as={NavLink} to='/settings/photos'><Icon name='photo'/>My Photos</Menu.Item>
        <Menu.Item as={NavLink} to='/settings/account'><Icon name='setting'/>My Account</Menu.Item>
      </Menu>
  );
};

export default SettingsNav;
