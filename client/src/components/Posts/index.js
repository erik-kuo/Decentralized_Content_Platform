import React from 'react'
import { Button, Icon, Image, Item, Label } from 'semantic-ui-react'
import PostCard from '../PostCard'

const Posts = () => (
  <Item.Group divided link>
      <PostCard/>
      <PostCard/>
      <PostCard/>
      <PostCard/>
      <PostCard/>
      <PostCard/>
      <PostCard/>
      <PostCard/>
  </Item.Group>
)

export default Posts
