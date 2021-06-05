import React, {useState} from 'react'
import { Advertisement, Container, Grid } from 'semantic-ui-react';
import Posts from '../components/Posts';

const Home = (props) => {  
  return (
    <Container textAlign='left'>
        <Posts {...props}/>
    </Container>
  );
}

export default Home;
