import React from 'react';
import { Grid, Header, List, Segment } from 'semantic-ui-react';
import format from 'date-fns/format';

const UserDetailedDescription = ({ profile }) => {
  var createdAt;
  if (profile.createdAt) {
    createdAt = format(profile.createdAt.toDate(), 'D MMM YYYY');
  }
  return (
    <Grid.Column width={12}>
      <Segment>
        <Grid columns={2}>
          <Grid.Column width={10}>
            <Header content={`About ${profile.displayName}`} />
            <p>
              Occupation: <strong>{profile.occupation || 'tbn'}</strong>
            </p>
            <p>
              Originally from <strong>{profile.origin || 'tbn'}</strong>
            </p>
            <p>
              Member Since: <strong>{createdAt}</strong>
            </p>
            <p>{profile.description}</p>
          </Grid.Column>
          <Grid.Column width={6}>
            <Header content="Interests" />
            {profile.interests ?
            <List>
              {profile.interests &&
                profile.interests.map((interest, index) => (
                  <span key={index}>
                    <span style={{marginLeft: '5px'}}>{interest}{ index !== profile.interests.length-1 ? ',' : '' }</span>
                  </span>
                ))}
            </List> : <p>No interests</p>}
          </Grid.Column>
        </Grid>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedDescription;
