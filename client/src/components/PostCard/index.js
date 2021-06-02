import React from 'react';
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'
import styled from 'styled-components';
import { NavLink } from '../Navbar/NavbarElements';
import { Link as LinkR } from 'react-router-dom';

const description = [
    'Cute dogs come in a variety of shapes and sizes. Some cute dogs are cute for their adorable faces, others for their',
    'tiny stature, and even others for their massive size.',
  ].join(' ')



const PostCard = () => {
    
    return (
    <Item
        name='singlepost'
        as={LinkR}
        to='/singlepost'>
    <Item.Image src='https://taiwan.sharelife.tw/tw-feat-pres-img/39276/2849100418245409.jpg' />

    <Item.Content>
      <Item.Header as='a'>12 Years a Slave</Item.Header>
      <Item.Meta>
        <span className='cinema'>Union Square 14</span>
      </Item.Meta>
      <Item.Description>{description}</Item.Description>
      <Item.Extra>
        <Label>IMAX</Label>
        <Label icon='globe' content='Additional Languages' />
      </Item.Extra>
    </Item.Content>
  </Item>
    );
}

export default PostCard;