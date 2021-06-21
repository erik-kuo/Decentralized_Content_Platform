var PostManager = artifacts.require("./PostManager.sol");
var Nickname = artifacts.require("./ProfileManager.sol");
var CommentedPostMgr = artifacts.require("./CommentedPostManager.sol");

module.exports = function(deployer) {
  deployer.deploy(PostManager);
  deployer.deploy(Nickname);
  deployer.deploy(CommentedPostMgr);
};