// Import essential packages
import React from 'react';
import { Helmet } from 'react-helmet';
import { Segment } from 'semantic-ui-react';


/* Not Found Page:
 *  Simply displays the error page. No way back now boys.
 */
const NotFound = () => {
  return (
    <div>
      <Helmet>
        <title>UnMe - Uh Oh!</title>
      </Helmet>
      <Segment.Group>
        <Segment attached='top'>
          <h1>Oopsies!</h1>
        </Segment>
        <Segment secondary>
          <h2>Error 404: Not Found</h2>
        </Segment>
        <Segment clearing>
          <h3>
            Sorry bud. Try going back <a href="/">home</a>.
          </h3>
        </Segment>
      </Segment.Group>
    </div>
  );
};

export default NotFound;
