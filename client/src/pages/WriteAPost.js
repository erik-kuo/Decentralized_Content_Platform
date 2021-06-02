import React, { Component } from 'react'
import { Button, Container, Form, TextArea, Image, Grid } from 'semantic-ui-react'

class WriteAPost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imagePreviewURL:"",
    };
  }

  fileInputRef = React.createRef();

  uploadImage = async (e) => {
    const imageFile = e.target.files[0]
    const imagePreviewURL = URL.createObjectURL(imageFile)
    this.setState({ imagePreviewURL: imagePreviewURL});
  }

  handleSubmit = async () => {
    /* Upload image to IPFS */
    const imageFile = await fetch(this.state.imagePreviewURL).then(r => r.blob())

    const { path } = await this.props.ipfs.add(imageFile)
    console.log('Result CID', path)

    /* Do stuff with contract */
    // save text string to contract
    // save image ipfs path
  }

  render() {
    return (
      <Grid textAlign='center'>
        <Grid.Row>
          <h1>Write a post.</h1>
        </Grid.Row>
        <Grid.Row>
          <p>You can write a post with some images and submmit it here.</p>
        </Grid.Row>

        <Grid.Row>
          <Container text>
            <Form onSubmit={this.onSubmit}>
              <Form.Field>
                <h2>Content</h2>
                <TextArea placeholder='Write your content here...'/>
              </Form.Field>
              <Form.Field>
                <Button
                  floated='left'
                  content="Choose Image"
                  labelPosition="left"
                  icon="file image"
                  onClick={() => this.fileInputRef.current.click()}
                />
                <input
                  ref={this.fileInputRef}
                  type="file"
                  hidden
                  onChange={this.uploadImage}
                />
              </Form.Field>
              <Button type='submit' floated='right'>Submit</Button>
            </Form>
          </Container>
        </Grid.Row>
        
        <Grid.Row textAlign='left'>
          <h2>Image preview: </h2>
        </Grid.Row>

        <Grid.Row>
          { this.state.imagePreviewURL ? (
            <Image src={this.state.imagePreviewURL} size='medium'/>
            ) : (
              null
            )
          }
        </Grid.Row>
      </Grid>
    )
  }
}

export default WriteAPost
