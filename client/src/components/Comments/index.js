import React, { useState, useEffect } from 'react'
import { Segment, Comment, Header, Form, Button, Checkbox, Input } from 'semantic-ui-react'
import uint8ArrayConcat from 'uint8arrays/concat';

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
  const [isPayable, setIsPayable] = useState(false);
  const [payAmount, setPayAmount] = useState();

  const handleClick = async () => {
    const { accounts, contracts } = props;
    if (isPayable){
      if (payAmount) {
        contracts[0].methods.createPayingComment(props.id, commentStr).send({from: accounts[0], value: payAmount});
      }
    } else {
      contracts[0].methods.createComment(props.id, commentStr).send({from: accounts[0]});
    }
    setCommentStr('');
  }

  const handleInputChange = (e, data) => {
    setCommentStr(data.value);
  }

  const getImage = async (cid) => {
    let content = []
    for await (const chunk of props.ipfs.cat(cid)) {
      content.push(chunk)
    }
    const imageRaw = uint8ArrayConcat(content)
    const buffer = new Blob([imageRaw.buffer])
    const imageUrl = URL.createObjectURL(buffer)
    // console.log(imageURL)
    return(imageUrl);
  }

  const getCommentList = async() => {
    const { contracts } = props;
    contracts[0].getPastEvents('NewComment', {filter: {postId: props.id}, fromBlock: 0, toBlock: 'latest'}, async (error, events) => {
      const idList = events.map(event => event.returnValues.commentId);
      let _lst = [];
      for (let idx=0; idx < idList.length; idx++) {
        const comment = await contracts[0].methods.getComment(idList[idx]).call();
        const nickname = await contracts[1].methods.getNickname(comment.owner).call();
        const imgHash = await contracts[1].methods.getPhoto(comment.owner).call();
        const imgUrl = await getImage(imgHash)
        const commentInfo = {
          owner : nickname,
          imgUrl: imgUrl,
          postTime: formatTimestamp(comment.postTime),
          content: comment.content,
        }
        _lst.push(commentInfo);
      }
      setContent(_lst.map((comment) =>
      <Comment>
        <Comment.Avatar src={comment.imgUrl} />
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

  const handleToggle = () => {
    setIsPayable(!isPayable);
  }

  const handlePayAmount = (e, data) => {
    setPayAmount(data.value);
  }

  useEffect( () =>{getCommentList()}, []);

  const { contracts } = props;
  contracts[0].events.NewComment({filter: {postId: props.id}, fromBlock: 0, toBlock: 'latest'}, (error, event) => {
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
        <Checkbox checked={isPayable} toggle label='Pay to owner' onChange={handleToggle}/>
        <Input disabled={!isPayable} placeholder='wei value' onChange={handlePayAmount}/>
        <Button content='Add Reply' labelPosition='left' icon='edit' primary floated='right' onClick={handleClick}/>
      </Form>
    </Comment.Group>
    )
}

export default Comments
