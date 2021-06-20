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

  componentDidUpdate = async (prevProps) => {
    if (prevProps.withTag !== this.props.withTag) {
      this.getPosts();
    }
  }

  getPosts = async () => {
    const {contracts, accounts} = this.props;

    if (typeof this.props.withTag !== 'undefined') {
      console.log('withTag');
      const cat = this.props.withTag;
      console.log('tag', cat, cat===6);

      // if (cat === 6) {
      //   const totalPostNum = await this.props.contracts[0].methods.getPostCount().call();
      //   let Posts = [];
      //   for (let idx=0; idx < totalPostNum; idx++) {
      //     const post = await contracts[0].methods.getPost(idx).call();
      //     const nickname = await contracts[1].methods.getNickname(post.owner).call();
      //     const postInfo = {
      //       owner: nickname,
      //       postTime: post.postTime,
      //       content: post.content,
      //       imgHashs: post.images,
      //       id: idx,
      //       category: post.category
      //     }
      //     Posts.push(postInfo);
      //   }
      // this.setState({Posts});
      // }

      // else {

        contracts[0].getPastEvents('NewPost', {filter: {category: cat}, fromBlock: 0, toBlock: 'latest'}, async (error, events) => {

          const idList = events.map(event => event.returnValues.postId);
          console.log(idList)
          let Posts = []
          for (let idx = 0; idx < idList.length; idx++) {
            const post = await contracts[0].methods.getPost(idList[idx]).call();

            const nickname = await contracts[1].methods.getNickname(post.owner).call();
            const postInfo = {
              owner: nickname,
              postTime: post.postTime,
              content: post.content,
              imgHashs: post.images,
              id: idList[idx],
              category: post.category
            }
          Posts.push(postInfo);
          }
        this.setState({Posts});
        })

      // }
    }
    
    if (this.props.personal) {

      contracts[0].getPastEvents('NewPost', {filter: {owner: accounts[0]}, fromBlock: 0, toBlock: 'latest'}, async (error, events) => {
        const idList = events.map(event => event.returnValues.postId);
        let Posts = []
        for (let idx = 0; idx < idList.length; idx++) {
          const post = await contracts[0].methods.getPost(idList[idx]).call();
          const nickname = await contracts[1].methods.getNickname(post.owner).call();
          const postInfo = {
            owner: nickname,
            postTime: post.postTime,
            content: post.content,
            imgHashs: post.images,
            id: idList[idx],
            category: post.category
          }
        Posts.push(postInfo);
        }
      this.setState({Posts});
      })
    }
    /*
    else {
      console.log('notag or personal');
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
          id: idx,
          category: post.category
        }
        Posts.push(postInfo);
      }
      this.setState({Posts});
    }*/
  }

  
  
  render () {

    if (!this.state.Posts.length) {
      if (this.props.personal) {
        return(
          <p>Write your first post!</p>
        )
      }
      else {
        return(
          <p>No posts yet...</p>
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
