pragma solidity >0.5.0 <0.6.0;

contract CommentManager {
    struct Comment {
        uint postId;
        address owner;
        uint timestamp;
        string text;
    }
    Comment[] comments;
    
    event NewComment(uint indexed postId, address indexed owner, uint commentId);
    
    function getCommentCount() view external returns(uint) {
        return comments.length;
    }
    
    function getComment(uint _id) view external returns(uint postId, address owner, uint postTime, string memory content) {
        require(_id < comments.length);
        
        postId = comments[_id].postId;
        owner = comments[_id].owner;
        postTime = comments[_id].timestamp;
        content = comments[_id].text;
    }
    
    function createComment(uint _postId, string calldata _content) external {
        uint id = comments.push(Comment(_postId, msg.sender, now, _content)) - 1;
        emit NewComment(_postId, msg.sender, id);
    }
}
