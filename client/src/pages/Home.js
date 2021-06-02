import React, {useState} from 'react'
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Posts from '../components/Posts';
import Sidebar from '../components/Sidebar';

const Home = () => {  
  return (
    <div>
      <Posts/>
    </div>
    /*
    <div>
      <h1>View all posts.</h1>
    </div>
    */
  );
}

export default Home;
