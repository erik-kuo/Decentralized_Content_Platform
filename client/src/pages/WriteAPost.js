import React, { Component } from 'react'

class WriteAPost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imagePreviewURL:"",
    };
  }

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
      <div>
        <h1>Write a post.</h1>
        <p>You can write a post with some images and submmit it here.</p>
        <div class="ui left corner labeled input">
          <input type="text" placeholder="Search..."/>
          <div class="ui left corner label">
            <i class="asterisk icon"></i>
          </div>
        </div>
        <div className="input-group mb-3">
          <input type="file" className="input-image form-control" id="image" onChange={this.uploadImage} />
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
        <h2>Image preview: </h2>
        { this.state.imagePreviewURL ? (
          <div className='col-4' >{/*style={{float: 'right', padding: '10px'}}*/}
            <img src={this.state.imagePreviewURL} className="rounded w-100" />
          </div>
          ) : (
            null
          )
        }
      </div>
    )
  }
}

export default WriteAPost
