pragma solidity >0.5.0 <0.6.0;
pragma experimental ABIEncoderV2;

contract PostManager {
    struct Post {
        uint timestamp;
        address owner;
        string text;
        string[] imageUrl;
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
        images = posts[_id].imageUrl;
    }
    
    function createPost(string memory _content, string[] memory _images) public {
        uint id = posts.push(Post(now, msg.sender, _content, _images)) - 1;
        emit NewPost(msg.sender, id);
    }
    
    constructor() internal {
        string[] memory images = new string[](1);
        images[0] = "https://upload.cc/i1/2021/05/31/0vubq6.png";
        createPost("Hello, world", images);
    }
}
