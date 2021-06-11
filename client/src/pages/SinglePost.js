import React, { Component } from 'react'
import { Container, Grid, Item, Image, Dimmer, Loader, Divider } from 'semantic-ui-react';
import uint8ArrayConcat from 'uint8arrays/concat';

import Comments from '../components/Comments';


class SinglePost extends Component {

  constructor(props) {
    super(props);
    // console.log(this.props);
    this.state={
      imgUrls: null,
    }
  }

  componentDidMount = async () => {
    this.getImgs();
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

  getImgs = async () => {
    const { imgHashs } = this.props.location.state;
    // console.log(imgHashs)
    let imgUrls = []
    for (const cid of imgHashs) {
      const url = await this.getImage(cid)
      imgUrls.push(url);
    }
    this.setState({ imgUrls })
    // console.log(this.state)
  }

  render () {
    const { owner, postTime, content, id } = this.props.location.state;
    let imgItems;
    if (!this.state.imgUrls) {
      imgItems =<Dimmer active>
                  <Loader size='mini'>Loading</Loader>
                </Dimmer>;
    } else {
      imgItems = <Image.Group>
        {this.state.imgUrls.map((src, idx) => <Image src={src} key={idx}/>)}
      </Image.Group>
    }
    return (
      <Container text>
        <Grid textAlign='left'>
          <Grid.Row>
            <h1>Post no. {id}</h1>
          </Grid.Row>
          <Grid.Row>
            <Item.Group>
              <Item>
                <Item.Image src='https://taiwan.sharelife.tw/tw-feat-pres-img/39276/2849100418245409.jpg'/>
                <Item.Content>
                  <Item.Header> {owner} </Item.Header>
                  <Item.Meta>
                    <span className='cinema'>{postTime}</span>
                  </Item.Meta>
                </Item.Content>
              </Item>
            </Item.Group>
          </Grid.Row>
          <Grid.Row>
            <p> {content} </p>
          </Grid.Row>
          <Grid.Row>
            {imgItems}
          </Grid.Row>
        </Grid>
        <Divider/>
        <Comments accounts={this.props.accounts} contracts={this.props.contracts} id={id}/>
      </Container>
    )
  }
}

export default SinglePost