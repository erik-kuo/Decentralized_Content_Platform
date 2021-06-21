pragma solidity >0.5.0 <0.6.0;

contract ProfileManager {
    struct Profile {
        string nickname;
        string photo;
        string selfIntro;
    }
    mapping(address => Profile) profiles;
    
    string[] defaultImages = [ "QmZygsw7Z9TNYkmtqkjjtox5WU7pEMHwekAVGquC32vTCm", "QmcZcJ1QW4DejrPJrJndqkAUTp6mdWwhqYVRzJ56gHnJWW", "QmRMEkg2Bp66cEHg9DJszSCxBMqdhGpu2n8pK9PtzJZFW9", "QmZ1gW17xeGWUEj22moAZAvKDtAJ8C1ArDN7Dh929HnGPv", "QmavbPY8xHLmfZ11aCRsT4PDm8QKens5tSjPuwGeH6dime", "QmfK18P379oz4CFno34eXVH8bwzKqSAADjzoYejXowvk56" ];
    
    function _getDefaultNickname(address _user) private pure returns(string memory) {
        bytes memory addr = abi.encodePacked(_user);
        bytes memory alphabet = "0123456789abcdef";
        
        bytes memory str = new bytes(2 + addr.length * 2);
        str[0] = "0";
        str[1] = "x";
        uint strlen = 6;
        if(addr.length < strlen) {
            strlen = addr.length;
        }
        for (uint i = 0; i < strlen; i++) {
            str[2+i*2] = alphabet[uint(uint8(addr[i] >> 4))];
            str[3+i*2] = alphabet[uint(uint8(addr[i] & 0x0f))];
        }
        return string(str);
    }
    
    function getNickname(address _user) view external returns(string memory) {
        if(keccak256(abi.encodePacked(profiles[_user].nickname)) == keccak256(abi.encodePacked(""))) {
            return _getDefaultNickname(_user);
        }
        else {
            return profiles[_user].nickname;
        }
    }
    
    function setNickname(string calldata _nickname) external {
        profiles[msg.sender].nickname = _nickname;
    }
    
    function _getDefaultPhoto(address _user) private view returns(string memory) {
        return defaultImages[uint(keccak256(abi.encodePacked(_user))) % defaultImages.length];
    }
    
    function getPhoto(address _user) view external returns(string memory) {
        if(_user == address(0)) {
            return "QmVY8ezuCmn9cn7mugYTxk2QXVWnRiufaVtkLjFXPwzV9S";
        }
        else if(keccak256(abi.encodePacked(profiles[_user].photo)) == keccak256(abi.encodePacked(""))) {
            return _getDefaultPhoto(_user);
        }
        else {
            return profiles[_user].photo;
        }
    }
    
    function setPhoto(string calldata _image) external {
        profiles[msg.sender].photo = _image;
    }
    
    function getSelfIntro(address _user) view external returns(string memory) {
        return profiles[_user].selfIntro;
    }
    
    function setSelfIntro(string calldata _intro) external {
        profiles[msg.sender].selfIntro = _intro;
    }
}
