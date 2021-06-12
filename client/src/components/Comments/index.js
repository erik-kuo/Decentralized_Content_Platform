import React, { useState, useEffect } from 'react'
import { Segment, Comment, Header, Form, Button } from 'semantic-ui-react'

const formatTimestamp = (_timestamp) => {
  const time = new Date(_timestamp*1000);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const year = time.getFullYear();
  const month = months[time.getMonth()];
  const date = time.getDate();
  const hour = time.getHours();
  const minute = time.getMinutes();
  const timeStr = month + ' ' + date + ', ' + year + ' at ' + hour + ':' + minute;
  return timeStr;
}

const Comments = (props) => {
  const [content, setContent] = useState(
    <Segment>
      There isn't any comment yet. Be the first one!
    </Segment>);
  const [commentStr, setCommentStr] = useState('');

  const handleClick = async () => {
    const { accounts, contracts } = props;
    contracts[2].methods.createComment(props.id, commentStr).send({from: accounts[0]});
    setCommentStr('');
  }

  const handleInputChange = (e, data) => {
    setCommentStr(data.value);
  }

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
      setContent(_lst.map((comment) =>
      <Comment>
        <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
        <Comment.Content>
          <Comment.Author as='a'>{comment.owner}</Comment.Author>
          <Comment.Metadata>
            {comment.postTime}
          </Comment.Metadata>
          <Comment.Text>{comment.content}</Comment.Text>
          <Comment.Actions>
            <Comment.Action>Reply</Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>));
    });
  }

  useEffect( () =>{getCommentList()}, []);

  const { contracts } = props;
  contracts[2].events.NewComment({filter: {postId: props.id}, fromBlock: 0, toBlock: 'latest'}, (error, event) => {
    getCommentList();
  })

  return (
    <Comment.Group minimal>
      <Header as='h3' dividing>
        Comments
      </Header>

      {content}

      <Form reply>
        <Form.TextArea placeholder='Write your comment here...' onChange={handleInputChange} value={commentStr}/>
        <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={handleClick}/>
      </Form>
    </Comment.Group>
    )
}

export default Comments
