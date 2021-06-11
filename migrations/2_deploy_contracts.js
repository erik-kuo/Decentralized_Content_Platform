var PostManager = artifacts.require("./PostManager.sol");
var Nickname = artifacts.require("./Nickname.sol");
var CommentMgr = artifacts.require("./CommentManager.sol");

module.exports = function(deployer) {
  deployer.deploy(PostManager);
  deployer.deploy(Nickname);
  deployer.deploy(CommentMgr);
};