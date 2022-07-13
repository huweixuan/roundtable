var Voting = artifacts.require("./Voting.sol");

module.exports = function(deployer) {
  deployer.deploy(Voting, ['张三', '李四', '王五', '赵六'].map(x => web3.utils.asciiToHex(x)), {
    gas: 6700000
  });
};