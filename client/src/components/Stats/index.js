import React from 'react'
import { Segment, Header, Divider } from 'semantic-ui-react'
import Stat from '../Stat'

const Stats = () => {
    return (
  
      <Segment textAlign='left'>
        <Header as='h3'>Post 0</Header>
          <Stat/>
        <Divider section />
        <Header as='h3'>Post 1</Header>
          <Stat/>
        <Divider section />
        <Header as='h3'>Post 2</Header>
          <Stat/>
        <Divider section />
        <Header as='h3'>Post 3</Header>
          <Stat/>
        <Divider section />
        <Header as='h3'>Post 4</Header>
          <Stat/>
      </Segment>
  
    )
  }
  export default Stats