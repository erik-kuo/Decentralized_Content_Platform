import React, { Component } from 'react'
import { Dimmer, Loader, Item } from 'semantic-ui-react'
import PostCard from '../PostCard'

class Posts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Posts: [],
    }
  }

  componentDidMount = async () => {
    this.getPosts();
  }

  getPosts = async () => {
    const {contracts} = this.props;
    const totalPostNum = await this.props.contracts[0].methods.getPostCount().call();
    let Posts = [];
    for (let idx=0; idx < totalPostNum; idx++) {
      const post = await contracts[0].methods.getPost(idx).call();
      const nickname = await contracts[1].methods.getNickname(post.owner).call();
      const postInfo = {
        owner: nickname,
        postTime: post.postTime,
        content: post.content,
        imgHashs: post.images,
        id: idx
      }
      Posts.push(postInfo);
    }
    this.setState({Posts});
  }
  
  render () {
    if (!this.state.Posts.length) {
      return(
        <Dimmer active>
          <Loader size='mini'>Loading</Loader>
        </Dimmer>
      )
    } else {
      return(
        <Item.Group divided link>
          {this.state.Posts.map((post) => <PostCard post={post} ipfs={this.props.ipfs}/>)}
        </Item.Group>
      )
    }
  }
}

export default Posts
