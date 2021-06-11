import React, {contextRef, useState} from 'react'
import { Container, Grid, Sticky, Ref, Rail, Input, Header, Button } from 'semantic-ui-react';
import Posts from '../components/Posts';
import Profile from '../components/Profile';

const PersonalPosts = (props) => {

  const [nickname, setNickname] = useState('');

  const handleClick = async () => {
    const { accounts, contracts } = props;
    contracts[1].methods.setNickname(nickname).send({from:accounts[0]});
    setNickname('');
  }
  const handleInputChange = (e, data) => {
    setNickname(data.value);
  }

  return (
    <Container textAlign='left'>
      <Grid relaxed>
        <Grid.Column width={4}>
          <Ref innerRef={contextRef}>
            <Rail>
              <Sticky context={contextRef} offset={100}>
                <Profile/>
              </Sticky>
            </Rail>
          </Ref>
        </Grid.Column>

        <Grid.Column floated='right' width={8}>
          <Header>Your Posts</Header>
          <Posts {...props}/>
        </Grid.Column>
        <Grid.Column floated='right' width={4}>
          <Header>Set your Nickname</Header>
          <Input action={<Button content='Set' onClick={handleClick}/>} placeholder='Nickname...' onChange={handleInputChange}/>
        </Grid.Column>
      </Grid>
    </Container>
  );
}

export default PersonalPosts
