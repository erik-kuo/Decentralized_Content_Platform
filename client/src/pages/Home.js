import React, {useState} from 'react'
import { BrowserRouter } from 'react-router-dom';
import { Advertisement, Container, Grid } from 'semantic-ui-react';
import Navbar from '../components/Navbar';
import Posts from '../components/Posts';
import Sidebar from '../components/Sidebar';

const Home = (props) => {  
  return (
    <Container textAlign='left'>
        <Posts/>
    </Container>
    /*
    <div>
      <h1>View all posts.</h1>
    </div>
    */
  );
}

export default Home;
