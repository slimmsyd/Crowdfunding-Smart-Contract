const networkConfig = { 
    80001:  {
        name: "mumbai",
        ethUSDPriceFeed: "0x0715A7794a1dc8e42615F059dD6e406A6594651A"
    },
    4: {
        name: "rinkeby",
        ethUSDPriceFeed: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e"
    }


};

const developMentChain = ["hardhat", "localhost"]
const DECMIALS = 8;
const INITAL_ANSWER = 200000000
//so other files can work with it
module.exports = {
    networkConfig,
    developMentChain,
    DECMIALS,
    INITAL_ANSWER
}