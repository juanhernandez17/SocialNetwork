// Import essential packages
import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import Helmet from 'react-helmet';

// Import our modules
  // actions:
import { updatePassword } from '../../auth/authActions';
import { updateProfile } from '../userActions'
  // renderables:
import AccountPage from './AccountPage';
import PhotosPage from './MyPhotos';
import MyProfile from './MyProfile';


const actions = {
  updatePassword,
  updateProfile
};

const mapState = (state) => ({
  providerId: state.firebase.auth.providerData[0].providerId,
  user: state.firebase.profile
})


const ProfileSettingsPage = ({ updatePassword, providerId, user, updateProfile }) => {
  return (
    <div>
      <Helmet>
        <title>UnMe - Settings</title>
      </Helmet>
      <div>
        <Switch>
          <Redirect exact from="/settings" to="/settings/myProfile" />
          <Route path="/settings/myProfile" render={() => <MyProfile updateProfile={updateProfile} initialValues={user}/>} />
          <Route path="/settings/photos" component={PhotosPage} />
          <Route
            path="/settings/account"
            render={() => <AccountPage updatePassword={updatePassword} providerId={providerId} />}
          />
        </Switch>
      </div>
    </div>
  );
}

export default connect(mapState, actions)(ProfileSettingsPage);