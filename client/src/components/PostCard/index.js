import React, { Component } from 'react';
import { Item, Label } from 'semantic-ui-react'
import { Link as LinkR } from 'react-router-dom';
import uint8ArrayConcat from 'uint8arrays/concat';

// const description = [
//     'Cute dogs come in a variety of shapes and sizes. Some cute dogs are cute for their adorable faces, others for their',
//     'tiny stature, and even others for their massive size.',
//   ].join(' ')



class PostCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pathStr: '/singlepost/'+this.props.post.id,
      imageUrl: null,
    }
  }


componentDidMount = async () => {
  this.getImage(this.props.post.imgHashs[0]);
}

  getImage = async (cid) => {
    let content = []
    for await (const chunk of this.props.ipfs.cat(cid)) {
      content.push(chunk)
    }
    const imageRaw = uint8ArrayConcat(content)
    const buffer = new Blob([imageRaw.buffer])
    const imageUrl = URL.createObjectURL(buffer)
    // console.log(imageURL)
    this.setState({imageUrl})
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
  
  render() {

    const tag = ['Others', 'Sport', 'Movie', 'Technology', 'Art', 'Literature'];
    

    return (
      <Item
        name='singlepost'
        as={LinkR}
        to={{
          pathname: this.state.pathStr,
          state: { owner: this.props.post.owner,
            postTime: this.formatTimestamp(this.props.post.postTime),
            content: this.props.post.content,
            imgHashs: this.props.post.imgHashs,
            id: this.props.post.id,
            attribute: this.props.post.category
          },
        }}
      >
        <Item.Image src={this.state.imageUrl} />
    
        <Item.Content>
          <Item.Header>{this.props.post.owner}</Item.Header>
          <Item.Meta>
            <span className='cinema'>{this.formatTimestamp(this.props.post.postTime)}</span>
          </Item.Meta>
          <Item.Description>{this.props.post.content.slice(0,100)}</Item.Description>
          <Item.Extra>
            <Label>{tag[this.props.post.category]}</Label>
          </Item.Extra>
        </Item.Content>
      </Item>
    )
  }
}

export default PostCard;