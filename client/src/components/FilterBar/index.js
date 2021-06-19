import React, { Component } from "react";
import { Container, Menu, Segment, Sticky, Image } from 'semantic-ui-react'


class FilterBar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        activeItem: "All"
      };
    }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
    render() {
      const { activeItem } = this.state
  
      return (
        <Menu pointing secondary vertical fixed>
          <Menu.Item
            name='All'
            active={activeItem === 'All'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='Sport'
            active={activeItem === 'Sport'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='Movie'
            active={activeItem === 'Movie'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='Technology'
            active={activeItem === 'Technology'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='Art'
            active={activeItem === 'Art'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='Literature'
            active={activeItem === 'Literature'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='Others'
            active={activeItem === 'Others'}
            onClick={this.handleItemClick}
          />
          
        </Menu>
      )
    }
  }
  
  export default FilterBar;