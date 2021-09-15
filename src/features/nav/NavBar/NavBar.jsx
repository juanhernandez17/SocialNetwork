// Import essential packages
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase'
import { Menu, Container } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

// Import our modules
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';
import { openModal } from '../../modals/modalActions';


// Various functions & variables 

const actions = {
  openModal
};

const mapState = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

class NavBar extends Component {

  handleSignIn = () => {
    this.props.openModal('LoginModal')
  };

  handleRegister = () => {
    this.props.openModal('RegisterModal')
  };

  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push('/')
  };

  render() {

    const { auth, profile } = this.props;
    const authenticated = (auth.isLoaded && !auth.isEmpty);
    
    return (
      <Menu className="navbar" borderless fixed="top">
        <Container fluid>
          <Menu.Item as={Link} to="/" header>
            <svg 
                className="unme-logo"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                aria-labelledby="title"
              >
              <image width="48" height="48" href="/assets/logo.svg" />
            </svg>
          </Menu.Item>
          <Menu.Item>
            {/* <h1 className="white-text">
              { pagename }
            </h1> */}
          </Menu.Item>
          {authenticated ? (
            <SignedInMenu auth={auth} profile={profile} signOut={this.handleSignOut} />
          ) : (
            <SignedOutMenu register={this.handleRegister} signIn={this.handleSignIn} />
          )}
        </Container>
      </Menu>
    );
  }
}

export default withRouter(withFirebase(connect(mapState, actions)(NavBar)));
