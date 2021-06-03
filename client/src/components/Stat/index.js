import React from 'react'
import { Segment, Header, Divider, Statistic } from 'semantic-ui-react'

const Stat = () => (
  <div>
    
      <Statistic size='mini'>
        <Statistic.Value>22</Statistic.Value>
        <Statistic.Label>Faves</Statistic.Label>
      </Statistic>
      <Statistic size='mini'>
        <Statistic.Value>31,200</Statistic.Value>
        <Statistic.Label>Views</Statistic.Label>
      </Statistic>
      <Statistic size='mini'>
        <Statistic.Value>22</Statistic.Value>
        <Statistic.Label>Members</Statistic.Label>
      </Statistic>
    
  </div>
)

export default Stat

