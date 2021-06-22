import React, {createRef} from 'react'
import { Container, Rail, Sticky, Ref, Grid } from 'semantic-ui-react'
import Stats from '../components/Stats'
import Profile from '../components/Profile'

const PersonalStats = (props) => {
  return (
    
    <Container textAlign='left'>
      <Grid relaxed>
        <Grid.Column width={4}>
          <Ref innerRef={createRef}>
              <Sticky offset={100}>
                <Profile contracts={props.contracts} accounts={props.accounts} ipfs={props.ipfs}/>
              </Sticky>
          </Ref>
        </Grid.Column>
  
          <Grid.Column floated='right' width={12}>
            <Stats contracts={props.contracts} accounts={props.accounts}/>
          </Grid.Column>

        </Grid>
      </Container> 
    );

}

export default PersonalStats


