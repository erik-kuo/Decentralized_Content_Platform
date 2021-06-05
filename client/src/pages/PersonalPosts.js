import React, {createRef} from 'react'
import { Container, Grid, Sticky, Ref, Rail } from 'semantic-ui-react';
import Navbar from '../components/Navbar';
import Posts from '../components/Posts';
import Profile from '../components/Profile/Profile';

const PersonalPosts = (props) => {

  const contextRef = createRef()

  return (
    <Container textAlign='left'>
      <Grid relaxed>
        <Grid.Row>
          <Ref innerRef={contextRef}>
            <Rail width={4}>
              <Sticky context={contextRef} offset={100}>
                <Profile/>
              </Sticky>
            </Rail>
          </Ref>

          <Grid.Column floated='right' width={12}>
            <Posts {...props}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default PersonalPosts
