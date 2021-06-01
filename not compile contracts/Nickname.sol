pragma solidity >=0.5.0 <0.6.0;

contract Nickname {
    mapping(address => string) userNickname;
    
    function getNickname(address _user) view external returns(string memory) {
        if(userNickname[_user] == "") {
            return abi.encodePacked(_user);
        }
        else {
            return userNickname[_user];
        }
    }
    
    function setNickname(string memory _nickname) external {
        userNickname[msg.sender] = _nickname;
    }
}
