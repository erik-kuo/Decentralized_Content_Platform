import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavbarStyle';

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink to='/'>
          {/* <img src={require('../../images/logo.svg')} alt='logo' /> */}
          <h1>Logo</h1>
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to='/new-post' activeStyle>
            Write a post
          </NavLink>
          <NavLink to='/posts' activeStyle>
            Personal posts
          </NavLink>
          <NavLink to='/stats' activeStyle>
            Stats
          </NavLink>
          <NavBtnLink to='/sign-in'>Sign In</NavBtnLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;