import React from 'react';
import Post from '../Post/Post';
import { PostsContainer } from './PostsElements';

const Posts = () => {
    return (
        <>
            <PostsContainer>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            </PostsContainer>
        </>
    );
};

export default Posts;