import React, {createRef} from 'react'
import { Container, Grid, Sticky, Ref, Rail } from 'semantic-ui-react';
import Navbar from '../components/Navbar';
import Posts from '../components/Posts';
import Profile from '../components/Profile/Profile';

const PersonalPosts = () => {

  const contextRef = createRef()

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
