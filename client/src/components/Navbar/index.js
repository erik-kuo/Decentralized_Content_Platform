import React from 'react';
import { FaBars } from 'react-icons/fa';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  MobileIcon,
  NavbarContainer
  // NavBtn,
  //NavBtnLink
} from './NavbarElements';

const Navbar = ({toggle}) => {
  return (
    <>
      <Nav>
        <NavbarContainer>
          <NavLink to='/'>
            {/* <img src={require('../../images/logo.svg')} alt='logo' /> */}
            <h1>Logo</h1>
          </NavLink>
          <MobileIcon onClick={toggle}>
            <FaBars />
          </MobileIcon>
          <NavMenu>
            <NavLink to='/new-post' activeStyle>Write a post</NavLink>
            <NavLink to='/posts' activeStyle>Personal posts</NavLink>
            <NavLink to='/stats' activeStyle>Stats</NavLink>
          </NavMenu>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;