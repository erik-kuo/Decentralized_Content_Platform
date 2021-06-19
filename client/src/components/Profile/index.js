import React, {useState, useEffect} from 'react'
import { Card, Image, Header, Container } from 'semantic-ui-react'


const Profile = (props) => {

  const [name, setName] = useState('');
  const { contracts, accounts } = props;

  const getMyName = async() => {
    const name = await contracts[1].methods.getNickname(accounts[0]).call();
    setName(name);
  }
  useEffect(() => {getMyName()},[]);

  return (
    <Container textAlign='center'>
      <Image src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' size='small' circular centered/>
      <Header as='h3'>{name}</Header>
      <Container textAlign='center'>A philosohy student.</Container>
    </Container>
  )
}

export default Profile
