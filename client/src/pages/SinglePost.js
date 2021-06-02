import React from 'react'


const SinglePost = (props) => {
  const { id } = props.match.params;
  console.log(id);
  return (
    <div>
      <h1>Post no. {id}</h1>
    </div>
  )
}

export default SinglePost