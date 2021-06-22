import React, {Component, createRef, useState} from 'react'
import { Form, Container, Grid, Sticky, Ref, Input, Header, Button, Image } from 'semantic-ui-react';
import Posts from '../components/Posts';
import Profile from '../components/Profile';


const PersonalPosts = (props) => {

  const [nickname, setNickname] = useState('');
  const [intro, setIntro] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const handleNicknameClick = async () => {
    const { accounts, contracts } = props;
    contracts[1].methods.setNickname(nickname).send({from:accounts[0]});
    setNickname('');
  }
  const handleNicknameInputChange = (e, data) => {
    setNickname(data.value);
  }

  const handleIntroClick = async () => {
    const { accounts, contracts } = props;
    contracts[1].methods.setSelfIntro(intro).send({from:accounts[0]});
    setIntro('');
  }
  const handleIntroInputChange = (e, data) => {
    setIntro(data.value);
  }

  const fileInputRef = React.createRef();
  const uploadImage = async (e) => {
    const imageFile = e.target.files[0]
    const imagePreviewURL = URL.createObjectURL(imageFile)
    setImgUrl(imagePreviewURL);
  }
  const handleSubmit = async () => {
    /* Upload image to IPFS */
    const imageFile = await fetch(imgUrl).then(r => r.blob())

    const { path } = await props.ipfs.add(imageFile)
    console.log('Result CID', path)

    const { accounts, contracts } = props;
    contracts[1].methods.setPhoto(path).send({from: accounts[0]});
    setImgUrl('');
  }

  return (
    <Container textAlign='left'>
      <Grid relaxed>
        <Grid.Column width={4}>
          <Ref innerRef={createRef}>
              <Sticky offset={100}>
                <Profile contracts={props.contracts} ipfs={props.ipfs} address={props.accounts[0]}/>
                
              </Sticky>
          </Ref>
        </Grid.Column>

        <Grid.Column floated='right' width={8}>
          <Header as='h2'>All previous posts</Header>
          <Posts personal {...props}/>
        </Grid.Column>
        <Grid.Column floated='right' width={4}>
          <Header>Edit your profile here!</Header>
          <Form>
          <Form.Field>
            <label>Set nickname</label>
            <Input action={<Button content='Set' onClick={handleNicknameClick}/>} placeholder='Nickname...' onChange={handleNicknameInputChange}/>
          </Form.Field>
          <Form.Field>
            <label>Edit bio</label>
            
            <Input action={<Button content='Set' onClick={handleIntroClick}/>} placeholder='Something about you...' onChange={handleIntroInputChange}/>
          </Form.Field>
          
            <Form.Group>
              <Form.Field>
                <Button
                  floated='left'
                  content="Upload profile image"
                  labelPosition="left"
                  icon="file image"
                  onClick={() => fileInputRef.current.click()}
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  hidden
                  onChange={uploadImage}
                />
              </Form.Field>
              <Button type='submit' floated='right' onClick={handleSubmit}>Submit</Button>
            </Form.Group>
          </Form>
          { imgUrl ? (
            <Image src={imgUrl} size='small' circular centered/>
            ) : (
              null
            )
          }
        </Grid.Column>
      </Grid>
    </Container>
  );
}

export default PersonalPosts;