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
    const {contracts, accounts} = this.props;
    
    if (this.props.personal) {
      console.log('personal!');
      contracts[0].getPastEvents('NewPost', {filter: {owner: accounts[0]}, fromBlock: 0, toBlock: 'latest'}, async (error, events) => {
        console.log(events);
        const idList = events.map(event => event.returnValues.postId);
        console.log(idList);
        let Posts = []
        for (let idx = 0; idx < idList.length; idx++) {
          const post = await contracts[0].methods.getPost(idList[idx]).call();
          console.log(post)
          const nickname = await contracts[1].methods.getNickname(post.owner).call();
          const postInfo = {
            owner: nickname,
            postTime: post.postTime,
            content: post.content,
            imgHashs: post.images,
            id: idList[idx]
          }
        Posts.push(postInfo);
        }
      this.setState({Posts});
      })
    }
    else {
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
      console.log(Posts);
      this.setState({Posts});
    }
  }

  
  
  render () {
    if (!this.state.Posts.length) {
      if (this.props.personal) {
        return(
          <p> Write your first post! </p>
        )
      }
      else {
        return(
          <Dimmer active>
            <Loader size='mini'>Loading</Loader>
          </Dimmer>
        )
      }
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
