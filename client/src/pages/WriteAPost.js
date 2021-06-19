import React, { Component } from 'react'
import { Button, Container, Form, TextArea, Image, Grid } from 'semantic-ui-react'

class WriteAPost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      textStr:"",
      imagePreviewURL:"",
      value:"0"
    };
  }

  fileInputRef = React.createRef();

  uploadImage = async (e) => {
    const imageFile = e.target.files[0]
    const imagePreviewURL = URL.createObjectURL(imageFile)
    this.setState({ imagePreviewURL: imagePreviewURL});
  }

  handleContent = (e, data) => {
    this.setState({ textStr: data.value })
  }

  handleSubmit = async () => {
    /* Upload image to IPFS */
    const imageFile = await fetch(this.state.imagePreviewURL).then(r => r.blob())

    const { path } = await this.props.ipfs.add(imageFile)
    console.log('Result CID', path)

    /* Do stuff with contract */
    // save text string to contract
    // save image ipfs path

    // attribute
    const attribute = parseInt(this.state.value);

    const { accounts, contracts } = this.props;
    contracts[0].methods.createPost(this.state.textStr, [path], attribute).send({from: accounts[0]});
    this.setState({ textStr:"", imagePreviewURL:"" })
  }

  handleAttribute = (e, { value }) => this.setState({ value })

  render() {
    const { value } = this.state
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Container text textAlign='left'>
              <Form width>
                <Form.Field>
                  <h2>What's on your mind?</h2>
                  <p>You can write a post with an image and submit it here.</p>
                  <TextArea placeholder='Write your content here...' value={this.state.textStr} onChange={this.handleContent}/>
                </Form.Field>

                <Form.Group inline>
                  <label>Add a tag for your post:</label>
                  <Form.Radio
                    label='Sport'
                    value='1'
                    checked={value === '1'}
                    onChange={this.handleAttribute}
                  />
                  <Form.Radio
                    label='Movie'
                    value='2'
                    checked={value === '2'}
                    onChange={this.handleAttribute}
                  />
                  <Form.Radio
                    label='Technology'
                    value='3'
                    checked={value === '3'}
                    onChange={this.handleAttribute}
                  />
                  <Form.Radio
                    label='Art'
                    value='4'
                    checked={value === '4'}
                    onChange={this.handleAttribute}
                  />
                  <Form.Radio
                    label='Literature'
                    value='5'
                    checked={value === '5'}
                    onChange={this.handleAttribute}
                  />
                  <Form.Radio
                    label='Others'
                    value='0'
                    checked={value === '0'}
                    onChange={this.handleAttribute}
                  />
                  </Form.Group>

                  <Form.Group>
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
                <Button type='submit' floated='right' onClick={this.handleSubmit}>Submit</Button>
                </Form.Group>
              </Form>
            </Container>
          </Grid.Row>
          
          <Grid.Row>
            { this.state.imagePreviewURL ? (
              <Image src={this.state.imagePreviewURL} size='medium' centered/>
              ) : (
                null
              )
            }
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

export default WriteAPost
