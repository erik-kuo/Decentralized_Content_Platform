import React, { useState } from 'react'
import { Input, Button, Grid } from 'semantic-ui-react'

const WriteAComment = (props) => {
  const [commentStr, setCommentStr] = useState('');

  const handleClick = async () => {
    const { accounts, contracts } = props;
    contracts[2].methods.createComment(props.id, commentStr).send({from: accounts[0]});
    setCommentStr('');
  }

  const handleInputChange = (e, data) => {
    setCommentStr(data.value);
  }
  
  return (
    <Input fluid action={<Button content='Send' onClick={handleClick}/>} placeholder='Write your comment here...' onChange={handleInputChange} value={commentStr}/>
  )
}

export default WriteAComment
