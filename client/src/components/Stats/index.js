import React , {useState, useEffect}from 'react'
import { Segment, Header, Divider } from 'semantic-ui-react'
import Stat from '../Stat'

const Stats = (props) => {
  
  const [statList, setStatList] = useState([]);

  const getStats = async () => {
    const {contracts, accounts} = props;
    contracts[0].getPastEvents('NewPost', {filter: {owner: accounts[0]}, fromBlock: 0, toBlock: 'latest'}, async (error, events) => {
      const idList = events.map(event => event.returnValues.postId);
      let _stats = []
      for (let idx = 0; idx < idList.length; idx++) {
        // const commentCount = await contracts[2].methods.getCommentCountByPost(idList[idx]).call();
        // console.log(commentCount);
        // const profit = await contracts[2].methods.getProfitByPost(idList[idx]).call();
        const statInfo = {
          postId: idList[idx],
          // commentCount: commentCount,
          // profit: profit,
        }
      _stats.push(statInfo);
      }
      // console.log(_stats);
      // setStatList([..._stats]);
    })
  }

  useEffect(() => {getStats();}, []);

  if (!statList.length) {
    return(
      <p>Write your first post!</p>
    )
  } else {
    return (
      <Segment textAlign='left'>
        {statList.map((statInfo, index) => <Stat stat={statInfo} last={index===statList.length-1}/>)}
        {/* <Header as='h3'>Post 0</Header>
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
          <Divider section />
        <Header as='h3'>Post 4</Header>
          <Stat/>
          <Divider section />
        <Header as='h3'>Post 4</Header>
          <Stat/>
          <Divider section />
        <Header as='h3'>Post 4</Header>
          <Stat/>
          <Divider section />
        <Header as='h3'>Post 4</Header>
          <Stat/>
          <Divider section />
        <Header as='h3'>Post 4</Header>
          <Stat/> */}
          
      </Segment>
  
    )
  }  
}
export default Stats