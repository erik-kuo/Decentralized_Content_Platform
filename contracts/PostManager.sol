pragma solidity >0.5.0 <0.6.0;
pragma experimental ABIEncoderV2;

contract PostManager {
    struct Post {
        uint timestamp;
        address owner;
        string text;
        string[] imageHash;
    }
    Post[] posts;
    
    event NewPost(address indexed owner, uint postId);
    
    function getPostCount() view public returns(uint) {
        return posts.length;
    }
    
    function getPost(uint _id) view external returns(address owner, uint postTime, string memory content, string[] memory images) {
        require(_id < posts.length);
        
        owner = posts[_id].owner;
        postTime = posts[_id].timestamp;
        content = posts[_id].text;
        images = posts[_id].imageHash;
    }
    
    function createPost(string memory _content, string[] memory _images) public {
        uint id = posts.push(Post(now, msg.sender, _content, _images)) - 1;
        emit NewPost(msg.sender, id);
    }
    
    constructor() public {
        string[] memory images = new string[](1);
        images[0] = "QmZygsw7Z9TNYkmtqkjjtox5WU7pEMHwekAVGquC32vTCm";
        createPost("Hello, world", images);
    }
}