// Import essential pacakges
import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable'
import { Helmet } from 'react-helmet';

// Import our componenents
import LoadingComponent from './LoadingComponent'
import { UserIsAuthenticated } from '../../features/auth/authWrapper';
import getCurrentPageName from '../common/util/pageNameResolver';

// Since we want to load certain components asyncronously we
//  need to load them this way
const AsyncFeedDashboard = Loadable({
  loader: () => import('../../features/posts/FeedDashboard/FeedDashboardPage'),
  loading: LoadingComponent
});

const AsyncCalendarPage = Loadable({
  loader: () => import('../../features/calendar/calendarPage/calendarPage'),
  loading: LoadingComponent
});

const AsyncNavBar  = Loadable({
  loader: () => import('../../features/nav/NavBar/NavBar'),
  loading: LoadingComponent
});

const AsyncEventPostForm = Loadable({
  loader: () => import('../../features/posts/PostForms/EventPostFormPage'),
  loading: LoadingComponent
});

const AsyncTextPostForm = Loadable({
  loader: () => import('../../features/posts/PostForms/TextPostFormPage'),
  loading: LoadingComponent
});

const AsyncSettingsDashboard = Loadable({
  loader: () => import('../../features/user/Settings/ProfileSettingsPage'),
  loading: LoadingComponent
});

const AsyncUserDetailedPage = Loadable({
  loader: () => import('../../features/user/UserDetailed/UserDetailedPage'),
  loading: LoadingComponent
});

const AsyncPeopleDashboard = Loadable({
  loader: () => import('../../features/user/FriendsDashboard/FriendsDashboardPage'),
  loading: LoadingComponent
});

const AsyncEventDetailedPage = Loadable({
  loader: () => import('../../features/posts/EventDetailed/EventDetailedPage'),
  loading: LoadingComponent
});

const AsyncPostDetailedPage = Loadable({
  loader: () => import('../../features/posts/PostDetailed/PostDetailedPage'),
  loading: LoadingComponent
});

const AsyncModalManager = Loadable({
  loader: () => import('../../features/modals/ModalManager'),
  loading: LoadingComponent
});

const AsyncNotFound = Loadable({
  loader: () => import('../../app/layout/NotFound'),
  loading: LoadingComponent
});


/* App Component:
 *  Our main application component. We store all routes here, as well as the 
 *  navbar, which renders at all times.
 */
class App extends Component {

  render() {
    return (
      <div>
        <AsyncModalManager/>
        <Route
          render={() => (
            <div>
              <AsyncNavBar pagename={getCurrentPageName()} />
              <Helmet>
                <title>UnMe</title>
              </Helmet>
              <Container className="main">
                <Switch>
                  <Route exact path="/" component={AsyncFeedDashboard} />
                  <Route path="/post/:id" component={AsyncPostDetailedPage} />
                  <Route path="/event/:id" component={AsyncEventDetailedPage} />
                  <Route path="/manage/event/:id" component={UserIsAuthenticated(AsyncEventPostForm)} />
                  <Route path="/manage/post/:id" component={UserIsAuthenticated(AsyncTextPostForm)} />
                  <Route path="/friends" component={UserIsAuthenticated(AsyncPeopleDashboard)} />
                  <Route path="/calendar" component={UserIsAuthenticated(AsyncCalendarPage)} />
                  <Route path="/profile/:id" component={UserIsAuthenticated(AsyncUserDetailedPage)} />
                  <Route path="/settings" component={UserIsAuthenticated(AsyncSettingsDashboard)} />
                  <Route path="/createEvent" component={UserIsAuthenticated(AsyncEventPostForm)} />
                  <Route path="/createPost" component={UserIsAuthenticated(AsyncTextPostForm)} />
                  <Route path="/error" component={AsyncNotFound} />
                  <Route component={AsyncNotFound} />
                </Switch>
              </Container>
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;
