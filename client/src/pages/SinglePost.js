import React, { Component } from 'react'
import { Container, Grid, Item, Image, Dimmer, Loader } from 'semantic-ui-react';
import uint8ArrayConcat from 'uint8arrays/concat';


class SinglePost extends Component {

  constructor(props) {
    super(props);
    this.id = this.props.match.params.id;
    this.state = {
      owner: null,
      postTime: null,
      content: null,
      imageUrls: null,
    }
  }

  componentDidMount = async () => {
    this.getPost();
  }

  getImage = async (cid) => {
    let content = []
    for await (const chunk of this.props.ipfs.cat(cid)) {
      content.push(chunk)
    }
    const imageRaw = uint8ArrayConcat(content)
    const buffer = new Blob([imageRaw.buffer])
    const imageURL = URL.createObjectURL(buffer)
    // console.log(imageURL)
    return imageURL
  }

  formatTimestamp = (_timestamp) => {
    const time = new Date(_timestamp*1000);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const year = time.getFullYear();
    const month = months[time.getMonth()];
    const date = time.getDate();
    const timeStr = month + ' ' + date + ', ' + year;
    return timeStr;
  }

  getPost = async () => {
    const { contracts } = this.props;
    const post = await contracts[0].methods.getPost(this.id).call();
    let imgURLs = []
    for (const cid of post.images) {
      const url = await this.getImage(cid)
      imgURLs.push(url);
    }
    const postTimeStr = this.formatTimestamp(post.postTime)
    this.setState({
      owner: post.owner,
      postTime: postTimeStr,
      content: post.content,
      imageUrls: imgURLs,
    })
    console.log(this.state)
  }

  render () {
    let imgItems;
    if (!this.state.imageUrls) {
      imgItems =<Dimmer active>
                  <Loader size='mini'>Loading</Loader>
                </Dimmer>;
    } else {
      imgItems = <Image.Group>
        {this.state.imageUrls.map((src, idx) => <Image src={src} key={idx}/>)}
      </Image.Group>
    }
    return (
      <Container text>
        <Grid textAlign='left'>
          <Grid.Row>
            <h1>Post no. {this.id}</h1>
          </Grid.Row>
          <Grid.Row>
            <Item.Group>
              <Item>
                <Item.Image src='https://taiwan.sharelife.tw/tw-feat-pres-img/39276/2849100418245409.jpg'/>
                <Item.Content>
                  <Item.Header> {this.state.owner} </Item.Header>
                  <Item.Meta>
                    <span className='cinema'>{this.state.postTime}</span>
                  </Item.Meta>
                </Item.Content>
              </Item>
            </Item.Group>
          </Grid.Row>
          <Grid.Row>
            <p> {this.state.content} </p>
          </Grid.Row>
          <Grid.Row>
            {imgItems}
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

export default SinglePost