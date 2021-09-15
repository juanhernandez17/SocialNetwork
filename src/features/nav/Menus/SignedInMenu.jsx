import React from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import getCurrentPageName from '../../../app/common/util/pageNameResolver';

const resolveNav = (nav) => {
  if ( nav === getCurrentPageName() ) {
    return "highlight-navlink"
  }
  else {
    return "navlink";
  }
};


const SignedInMenu = ({signOut, profile, auth}) => {
  return (
    <Menu.Item position="right">
      <Image avatar spaced="right" src={profile.photoURL || "/assets/user-white.svg"} />
      <Dropdown className="navbar-dropdown" pointing="top right" text={profile.displayName}>
        <Dropdown.Menu>
          <Dropdown.Item className={resolveNav('Feed')} as={Link} to={'/'} text="Feed" icon="feed" />
          <Dropdown.Item className={resolveNav('Calendar')} as={Link} to={'/calendar'} text="Calendar" icon="calendar" />
          <Dropdown.Item className={resolveNav('Friends')} as={Link} to={'/friends'} text="Friends" icon="group" />
          <Dropdown.Item className={resolveNav('Profile')} as={Link} to={`/profile/${auth.uid}`} text="Profile" icon="user" />
          <Dropdown.Item className={resolveNav('Settings')} as={Link} to='/settings' text="Settings" icon="setting" />
          <Dropdown.Item onClick={signOut} text="Sign Out" icon="power" />
        </Dropdown.Menu>
      </Dropdown>
   </Menu.Item>
  );
};

export default SignedInMenu;
