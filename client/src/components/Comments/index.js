import React, { useState, useEffect } from 'react'
import { Item, Segment } from 'semantic-ui-react'

import WriteAComment from './WriteAComment'

const formatTimestamp = (_timestamp) => {
  const time = new Date(_timestamp*1000);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const year = time.getFullYear();
  const month = months[time.getMonth()];
  const date = time.getDate();
  const timeStr = month + ' ' + date + ', ' + year;
  return timeStr;
}

const Comments = (props) => {
  const [commentList, setCommentList] = useState([]);

  const getCommentList = async() => {
    const { contracts } = props;
    contracts[2].getPastEvents('NewComment', {filter: {postId: props.id}, fromBlock: 0, toBlock: 'latest'}, async (error, events) => {
      const idList = events.map(event => event.returnValues.commentId);
      let _lst = [];
      for (let idx=0; idx < idList.length; idx++) {
        const comment = await contracts[2].methods.getComment(idx).call();
        const nickname = await contracts[1].methods.getNickname(comment.owner).call();
        const commentInfo = {
          owner : nickname,
          postTime: formatTimestamp(comment.postTime),
          content: comment.content,
        }
        _lst.push(commentInfo);
      }
      setCommentList([..._lst]);
    });
  }

  useEffect( () =>{getCommentList()}, []);

  let content;
  if (commentList.length == 0) {
    content =
    <Segment>
      There isn't any comment yet. Be the first one!
    </Segment>;
    
  } else {
    console.log(commentList[0]);
    content =
    <Item.Group divided>
      {commentList.map((comment) => <Item>
        <Item.Content>
          <Item.Header>{ comment.owner }</Item.Header>
          <Item.Description>{ comment.content }</Item.Description>
          <Item.Extra>{ formatTimestamp(comment.postTime) }</Item.Extra>
        </Item.Content>
      </Item>)}
    </Item.Group>;
  }
  return (
    <React.Fragment>
      <WriteAComment {...props}/>
      {content}
    </React.Fragment>
    )
}

export default Comments
