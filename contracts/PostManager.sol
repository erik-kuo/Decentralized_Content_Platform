pragma solidity >0.5.0 <0.6.0;
pragma experimental ABIEncoderV2;

contract PostManager {
    struct Post {
        uint timestamp;
        address owner;
        string text;
        string[] imageHash;
        uint category;
    }
    Post[] posts;
    
    uint postCooldown = 5 seconds;  // 因應demo特別改短，原先設定為30 seconds
    mapping(address => uint) nextPostTime;
    
    event NewPost(address indexed owner, uint postId, uint indexed category);
    
    function getPostCount() view public returns(uint) {
        return posts.length;
    }
    
    function _getPostOwner(uint _id) view internal returns(address payable) {
        require(_id < posts.length);
        
        return  address(uint160(posts[_id].owner));
    }
    
    function getPost(uint _id) view external returns(address owner, uint postTime, string memory content, string[] memory images, uint category) {
        require(_id < posts.length);
        
        owner = posts[_id].owner;
        postTime = posts[_id].timestamp;
        content = posts[_id].text;
        images = posts[_id].imageHash;
        category = posts[_id].category;
    }
    
    function createPost(string memory _content, string[] memory _images, uint _category) public {
        require(nextPostTime[msg.sender] <= now);
        
        uint id = posts.push(Post(now, msg.sender, _content, _images, _category)) - 1;
        nextPostTime[msg.sender] = now + postCooldown;
        
        emit NewPost(msg.sender, id, _category);
    }
    
    constructor() public {
        string[] memory images = new string[](1);
        images[0] = "QmZygsw7Z9TNYkmtqkjjtox5WU7pEMHwekAVGquC32vTCm";
        posts.push(Post(now, address(0), "一名顧客點了一份炒飯，酒吧陷入火海。", images, 6));
        emit NewPost(address(0), 0, 6);
    }
}
