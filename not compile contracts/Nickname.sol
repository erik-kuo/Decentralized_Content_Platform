pragma solidity >0.5.0 <0.6.0;

contract Nickname {
    mapping(address => string) userNickname;
    
    function _toString(bytes memory _data) private pure returns(string memory) {
        bytes memory alphabet = "0123456789abcdef";
        
        bytes memory str = new bytes(2 + _data.length * 2);
        str[0] = "0";
        str[1] = "x";
        uint strlen = 8;
        if(_data.length < strlen) {
            strlen = _data.length;
        }
        for (uint i = 0; i < strlen; i++) {
            str[2+i*2] = alphabet[uint(uint8(_data[i] >> 4))];
            str[3+i*2] = alphabet[uint(uint8(_data[i] & 0x0f))];
        }
        return string(str);
    }
    
    function getNickname(address _user) view external returns(string memory) {
        if(keccak256(abi.encodePacked(userNickname[_user])) == keccak256(abi.encodePacked(""))) {
            return _toString(abi.encodePacked(_user));
        }
        else {
            return userNickname[_user];
        }
    }
    
    function setNickname(string calldata _nickname) external {
        userNickname[msg.sender] = _nickname;
    }
}
