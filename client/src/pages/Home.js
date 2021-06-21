import React, {setState, useState, createRef, useEffect} from 'react'
import { Menu, Container, Grid, Ref, Sticky } from 'semantic-ui-react';
import Posts from '../components/Posts';

const Home = (props) => {

  const [filter, setFilter] = useState(0);
  const [activeItem, setActiveItem] = useState('All');

  const handleItemClick = (e, { name, tag }) => {
    setActiveItem(name);
    setFilter(tag);
  }

  console.log(filter);

  return (
    <Container textAlign='center'>
      <Grid relaxed>
        <Grid.Column width={4}>
          <Ref innerRef={createRef}>
            <Sticky offset={100}>
              <Menu pointing secondary vertical fixed>
                <Menu.Item
                  name='All'
                  active={activeItem === 'All'}                  
                  tag={0}
                  onClick={handleItemClick}
                />
                <Menu.Item
                  name='Sport'
                  active={activeItem === 'Sport'}
                  tag={1}
                  onClick={handleItemClick}
                />
                <Menu.Item
                  name='Movie'
                  active={activeItem === 'Movie'}
                  tag={2}
                  onClick={handleItemClick}
                />
                <Menu.Item
                  name='Technology'
                  active={activeItem === 'Technology'}
                  tag={3}
                  onClick={handleItemClick}
                />
                <Menu.Item
                  name='Art'
                  active={activeItem === 'Art'}
                  tag={4}
                  onClick={handleItemClick}
                />
                <Menu.Item
                  name='Literature'
                  active={activeItem === 'Literature'}
                  tag={5}
                  onClick={handleItemClick}
                />
                <Menu.Item
                  name='Others'
                  active={activeItem === 'Others'}
                  tag={6}
                  onClick={handleItemClick}
                />
                
              </Menu>
            </Sticky>
          </Ref>
        </Grid.Column>

        <Grid.Column  width={12}>
          <Container textAlign='left'>
            <Posts withTag={filter} {...props}/>
          </Container>
        </Grid.Column>
      </Grid>
    </Container>

  );
}

export default Home;