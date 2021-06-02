import React from 'react'
import {PostContainer, PostImg, PostInfo} from './PostElements';

const Post = () => {
    return (
       <PostContainer>
           <PostImg src='https://taiwan.sharelife.tw/tw-feat-pres-img/39276/2849100418245409.jpg'></PostImg>
           <PostInfo>
                <div className='postCat'>
                    <span className='postCat'>Music</span>
                    <span className='postCat'>Life</span>
                </div>
                <div className='postTitle'>
                    ABCCCS
                </div>
           </PostInfo>
           <p className='postdescription'>abdaeorihuahruighliuhwliuhluhliuhlwaiuh</p>
       </PostContainer>
    );
}

export default Post;
