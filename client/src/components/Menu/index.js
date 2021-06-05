import React, { Component } from 'react'
import { Container, Menu, Segment, Sticky } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

export default class MyMenu extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu fixed='top' inverted pointing secondary style={{backgroundColor: 'black'}}>
        <Container>
          <Menu.Item
            header
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
            as={NavLink}
            exact to='/'
          >
            Home
          </Menu.Item>

          <Menu.Menu position='right'>
            <Menu.Item
              name='newpost'
              active={activeItem === 'newpost'}
              onClick={this.handleItemClick}
              as={NavLink}
              to='/new-post'
            >
              Write A Post
            </Menu.Item>

            <Menu.Item
              name='posts'
              active={activeItem === 'posts'}
              onClick={this.handleItemClick}
              as={NavLink}
              to='/posts'
            >
              Personal Posts
            </Menu.Item>

            <Menu.Item
              name='stats'
              active={activeItem === 'stats'}
              onClick={this.handleItemClick}
              as={NavLink}
              to='/stats'
            >
              Statistics
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    )
  }
}