import React, {useState} from 'react'
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
    //console.log(isOpen);
  };
  
  return (
    <>
      <Sidebar onClick={isOpen} toggle={toggle}/>
      <Navbar toggle={toggle}/>
    </>
  );
}

export default Home;
