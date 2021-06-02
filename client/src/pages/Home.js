import React, {useState} from 'react'
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
    console.log("Home", isOpen);
  };
  
  return (
    <div>
      <h1>View all posts.</h1>
    </div>
  );
}

export default Home;
