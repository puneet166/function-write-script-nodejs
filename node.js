
const Web3 = require('web3');

const provider = new Web3.providers.HttpProvider('https://sepolia.infura.io/v3/a176e77c08344c9ca389ba1970d4bb1e');
const web3 = new Web3(provider);
// const ethNetwork = 'wss://rinkeby.infura.io/ws/v3/PROJECT-ID'
// const web3 = await new Web3(new Web3.providers.WebsocketProvider(ethNetwork))
const abi = [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WETH9","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"WETH9","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"path","type":"bytes"},{"internalType":"uint256","name":"amountIn","type":"uint256"}],"name":"quoteExactInput","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint160[]","name":"sqrtPriceX96AfterList","type":"uint160[]"},{"internalType":"uint32[]","name":"initializedTicksCrossedList","type":"uint32[]"},{"internalType":"uint256","name":"gasEstimate","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"tokenIn","type":"address"},{"internalType":"address","name":"tokenOut","type":"address"},{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint24","name":"fee","type":"uint24"},{"internalType":"uint160","name":"sqrtPriceLimitX96","type":"uint160"}],"internalType":"struct IQuoterV2.QuoteExactInputSingleParams","name":"params","type":"tuple"}],"name":"quoteExactInputSingle","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint160","name":"sqrtPriceX96After","type":"uint160"},{"internalType":"uint32","name":"initializedTicksCrossed","type":"uint32"},{"internalType":"uint256","name":"gasEstimate","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"path","type":"bytes"},{"internalType":"uint256","name":"amountOut","type":"uint256"}],"name":"quoteExactOutput","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint160[]","name":"sqrtPriceX96AfterList","type":"uint160[]"},{"internalType":"uint32[]","name":"initializedTicksCrossedList","type":"uint32[]"},{"internalType":"uint256","name":"gasEstimate","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"tokenIn","type":"address"},{"internalType":"address","name":"tokenOut","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint24","name":"fee","type":"uint24"},{"internalType":"uint160","name":"sqrtPriceLimitX96","type":"uint160"}],"internalType":"struct IQuoterV2.QuoteExactOutputSingleParams","name":"params","type":"tuple"}],"name":"quoteExactOutputSingle","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint160","name":"sqrtPriceX96After","type":"uint160"},{"internalType":"uint32","name":"initializedTicksCrossed","type":"uint32"},{"internalType":"uint256","name":"gasEstimate","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"int256","name":"amount0Delta","type":"int256"},{"internalType":"int256","name":"amount1Delta","type":"int256"},{"internalType":"bytes","name":"path","type":"bytes"}],"name":"uniswapV3SwapCallback","outputs":[],"stateMutability":"view","type":"function"}];
const address = "0xed1f6473345f45b75f8179591dd5ba1888cf2fb3";
// abi and address defined here
async function name()
{
    try{
const contract =  new web3.eth.Contract(abi, address);
const params = {
    tokenIn: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14", // Replace with the actual token address
    tokenOut: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984", // Replace with the actual token address
    amountIn: "100000000000000",
    fee: "500",
    sqrtPriceLimitX96: "0",
  };
// PRIVATE_KEY variable defined
const account = web3.eth.accounts.privateKeyToAccount("2849aff9df1298f56b99e75fa26900b13bf3b9566061cca7a3a98022a7e52071")

// define METHOD_NAME, ARG1, ARG2 here
const transaction = contract.methods.quoteExactInputSingle(params);

// define CONTRACT_ADDRESS
const options = {
        to: address,
        data: transaction.encodeABI(),
        // gas: web3.utils.toHex(500000),
        gasLimit:web3.utils.toHex(500000),

        gasPrice: web3.utils.toHex(200000000000) // or use some predefined value
    };

const signed  = await web3.eth.accounts.signTransaction(options, "0x2849aff9df1298f56b99e75fa26900b13bf3b9566061cca7a3a98022a7e52071");
const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);

console.log(receipt) // print receipt
}
catch(err)
{
    console.log("----------err-------",err);
}
}
name();
/*

gas: 119561
gasPrice: 1000000000
{
  blockHash: '0x0292aad...',
  blockNumber: ....,
  contractAddress: null,
  cumulativeGasUsed: 2930052,
  from: '0xc4789c....,
  gasUsed: 118627,
  logs: [],
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: '0xcfd....7',
  transactionHash: '0x535a...',
  transactionIndex: 9
}

*/
