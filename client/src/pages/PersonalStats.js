import React, {contextRef} from 'react'
import { Container, Rail, Sticky, Ref, Grid } from 'semantic-ui-react'
import Stats from '../components/Stats'
import Profile from '../components/Profile'

const PersonalStats = () => {
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
            <Stats/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </Container>
    );

}

export default PersonalStats


