import React from 'react'
import { Segment, Header, Divider, Statistic } from 'semantic-ui-react'

const Stat = (props) => {
  console.log(props);
  return(
  <div>
    <Header as='h3'>Post {props.stat.postId}</Header>
      <Statistic size='mini'>
        <Statistic.Value>{props.stat.commentCount}</Statistic.Value>
        <Statistic.Label>comments</Statistic.Label>
      </Statistic>
      <Statistic size='mini'>
        <Statistic.Value>{props.stat.profit}</Statistic.Value>
        <Statistic.Label>Profit</Statistic.Label>
      </Statistic>
    {props.last ? (
        null
      ) : (
        <Divider section/>
      )
    }
  </div>
  )
}

export default Stat

