pragma solidity >0.5.0 <0.6.0;
pragma experimental ABIEncoderV2;

import "./PostManager.sol";

contract CommentedPostManager is PostManager {
    struct Comment {
        uint postId;
        address owner;
        uint timestamp;
        string text;
        uint value;
    }
    Comment[] comments;
    
    uint commentCooldown = 5 seconds;
    mapping(address => uint) nextCommentTime;
    
    event NewComment(uint indexed postId, address indexed owner, uint commentId);
    
    function getCommentCount() view external returns(uint) {
        return comments.length;
    }
    
    function getCommentCountByPost(uint _postId) view external returns(uint) {
        require(_postId < getPostCount());
        
        uint result = 0;
        for(uint id=0; id<comments.length; id++) {
            if(comments[id].postId == _postId) {
                result++;
            }
        }
        return result;
    }
    
    function getProfitByPost(uint _postId) view external returns(uint) {
        require(_postId < getPostCount());
        
        uint result = 0;
        for(uint id=0; id<comments.length; id++) {
            if(comments[id].postId == _postId) {
                result += comments[id].value;
            }
        }
        return result;
    }
    
    function getComment(uint _id) view external returns(uint postId, address owner, uint postTime, string memory content, uint value) {
        require(_id < comments.length);
        
        postId = comments[_id].postId;
        owner = comments[_id].owner;
        postTime = comments[_id].timestamp;
        content = comments[_id].text;
        value = comments[_id].value;
    }
    
    function createComment(uint _postId, string calldata _content) external {
        require(_postId < getPostCount());
        require(nextCommentTime[msg.sender] <= now);
        
        uint id = comments.push(Comment(_postId, msg.sender, now, _content, 0)) - 1;
        nextCommentTime[msg.sender] = now + commentCooldown;
        
        emit NewComment(_postId, msg.sender, id);
    }
    
    function createPayingComment(uint _postId, string calldata _content) external payable {
        require(msg.value > 0 wei);
        require(_postId < getPostCount());
        require(posts[_postId].owner != msg.sender);
        require(nextCommentTime[msg.sender] <= now);
        
        uint id = comments.push(Comment(_postId, msg.sender, now, _content, msg.value)) - 1;
        nextCommentTime[msg.sender] = now + commentCooldown;
        
        address payable postOwner = _getPostOwner(_postId);
        postOwner.transfer(msg.value);
        
        emit NewComment(_postId, msg.sender, id);
    }
}
