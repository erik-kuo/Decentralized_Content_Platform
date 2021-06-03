var PostManager = artifacts.require("./PostManager.sol");
var Nickname = artifacts.require("./Nickname.sol");

module.exports = function(deployer) {
  deployer.deploy(PostManager);
  deployer.deploy(Nickname);
};