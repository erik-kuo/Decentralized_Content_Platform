import React from 'react'
import { Container, Grid } from 'semantic-ui-react';
import Navbar from '../components/Navbar';
import Posts from '../components/Posts';
import Profile from '../components/Profile/Profile';

const PersonalPosts = () => {

  return (
    <Container textAlign='left'>
      <Grid relaxed>
      <Grid.Row>
        <Grid.Column width={4}>
            <Profile/>
        </Grid.Column>
        <Grid.Column width={12}>
          <Posts/>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    </Container>
  );
}

export default PersonalPosts
