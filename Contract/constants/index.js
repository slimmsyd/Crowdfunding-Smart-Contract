const { ethers, utils, parseEther } = require("hardhat");
const LINK_TOKEN = "0x45442cb17bd3e3c0aeae92bf425473e582d5e740";
const VRF = "0x8C7382F9D8f56b33781fE506E897a4F1e2d17255";
const deployAddress = "0xC3D6029ff58efd79dC5b1a542f17e03333881C23"
const KEY_HASH =
  "0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4";
  const FEE = ethers.utils.parseEther("0.0001");

module.exports = {LINK_TOKEN, VRF, KEY_HASH, FEE}