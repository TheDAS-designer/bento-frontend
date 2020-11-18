import BigNumber from 'bignumber.js/bignumber'

export const SUBTRACT_GAS_LIMIT = 100000

const ONE_MINUTE_IN_SECONDS = new BigNumber(60)
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS.times(60)
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS.times(24)
const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS.times(365)

export const INTEGERS = {
  ONE_MINUTE_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
  ONE_DAY_IN_SECONDS,
  ONE_YEAR_IN_SECONDS,
  ZERO: new BigNumber(0),
  ONE: new BigNumber(1),
  ONES_31: new BigNumber('4294967295'), // 2**32-1
  ONES_127: new BigNumber('340282366920938463463374607431768211455'), // 2**128-1
  ONES_255: new BigNumber(
    '115792089237316195423570985008687907853269984665640564039457584007913129639935',
  ), // 2**256-1
  INTEREST_RATE_BASE: new BigNumber('1e18'),
}

export const addressMap = {
  // uniswapFactory: '0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95',
  // uniswapFactoryV2: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
  // YFI: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
  // YCRV: '0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8',
  // UNIAmpl: '0xc5be99a02c6857f9eac67bbce58df5572498f40c',
  WETH: '0x5eCA15B12d959dfcf9c71c59F8B467Eb8c6efD0b',
  // UNIRouter: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  // LINK: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
  // MKR: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
  // SNX: '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F',
  // COMP: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
  // LEND: '0x80fB784B7eD66730e8b1DBd9820aFD29931aab03',
  // SUSHIYCRV: '0x2C7a51A357d5739C5C74Bf3C96816849d2c9F726',
  NAP: '0xb4a94DA855Da0B1174Bf10E9900D7001332C01Dd',
}

export const contractAddresses = {
  sushi: {
    1: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2',
    //42: '0xb4a94DA855Da0B1174Bf10E9900D7001332C01Dd'
  },
  masterChef: {
    1: '0xc2edad668740f1aa35e4d8f227fb8e17dca888cd',
    //42: '0xBCcA45FA41c7eF29cB7B7e6d8b129FA5Eeaf6432'
  },
  weth: {
    1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    42: '0xd0a1e359811322d97991e03f863a0c30c2cf029c'
  },
  bento: {
    1: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2',
    //42: '0xe7221fd1f893342a433ebd4bcb9B672822fC7401',
   // 42: '0xeAD76d0E8902992420564F67F04Fb32232C27158',
    42: '0x55A02E7a4ecD418FE3bd7A3516D98B5d8d531dfb',
  },
  bentoMiner: {
    1: '0xc2edad668740f1aa35e4d8f227fb8e17dca888cd',
    //42: '0xFFa9CDE0e63dcA206A559e825DE02EE9041e89Af'
    //42: '0xfB9e1591f67d4f9c32995252aEfe8A6EE798fAd7',
    42: '0xb99771f8981E2bFD283aA6710d0f62E4D2aD9bCD'
  },
}

/*
UNI-V2 LP Address on mainnet for reference
==========================================
0  USDT 0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852
1  USDC 0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc
2  DAI  0xa478c2975ab1ea89e8196811f51a7b7ade33eb11
3  sUSD 0xf80758ab42c3b07da84053fd88804bcb6baa4b5c
4  COMP 0xcffdded873554f362ac02f8fb1f02e5ada10516f
5  LEND 0xab3f9bf1d81ddb224a2014e98b238638824bcf20
6  SNX  0x43ae24960e5534731fc831386c07755a2dc33d47
7  UMA  0x88d97d199b9ed37c29d846d00d443de980832a22
8  LINK 0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974
9  BAND 0xf421c3f2e695c2d4c0765379ccace8ade4a480d9
10 AMPL 0xc5be99a02c6857f9eac67bbce58df5572498f40c
11 YFI  0x2fdbadf3c4d5a8666bc06645b8358ab803996e28
12 SUSHI 0xce84867c3c02b05dc570d0135103d3fb9cc19433


kovan NAP    0x4268A742ae9bA78B07d1679665B208392f63f746 
kovan bento  0x88c663A367647252Aa9192078A9Ae11D7f4ccFa3
*/

export const supportedPools = [
  
  {
    pid: 0,
    lpAddresses: {
      1: '',
      //42: '0x0a82cf35a793bcb46d5b66c02b41920d2411477f'
      42: '0xa47ddb60f8927e5d4e16206cfd5b1ad3b114a6a1'
    },
    tokenAddresses: {
      1: '',
     // 42: '0xeAD76d0E8902992420564F67F04Fb32232C27158'
     42: '0x55A02E7a4ecD418FE3bd7A3516D98B5d8d531dfb',
    },
    originalGovAddress: {
      1: '',
      42: '0x665a5f09716d63D9256934855b0CE2056a5C4Cf8'
    },
    govAddresses: {
      1:'',
      //42: '0xfB9e1591f67d4f9c32995252aEfe8A6EE798fAd7',
      42: '0xb99771f8981E2bFD283aA6710d0f62E4D2aD9bCD',
    },
    name: 'UNION',
    symbol: 'UIN',
    tokenSymbol: 'UIN',
    icon: '🦾',
  },
  {
    pid: 1,
    lpAddresses: {
      1: '0xce84867c3c02b05dc570d0135103d3fb9cc19433',
      42: '0x4268A742ae9bA78B07d1679665B208392f63f746',
    },
    tokenAddresses: {
      1: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2',
      42: '0xb4a94DA855Da0B1174Bf10E9900D7001332C01Dd'
    },
    originalGovAddress: {
      1: '',
      42: '0x665a5f09716d63D9256934855b0CE2056a5C4Cf8'
    },
    govAddresses: {
      1:'',
      //42: '0xfB9e1591f67d4f9c32995252aEfe8A6EE798fAd7',
      42: '0xb99771f8981E2bFD283aA6710d0f62E4D2aD9bCD',
    },
    name: 'NAP',
    symbol: 'NAP',
    tokenSymbol: 'BENTO',
    icon: '🥮',//🥮
  },
  {
    pid: 1,
    lpAddresses: {
      1: '',
      42: '0x4268A742ae9bA78B07d1679665B208392f63f746'
    },
    tokenAddresses: {
      1: '',
      42: '0x0AA2bD81e77aecfD9B3FA17035FeCaF0b61CA89A'
    },
    originalGovAddress: {
      1: '',
      42: '0x3D6dA2F3EdD4dEE80E35E0369a42334B6f08D454'
    },
    govAddresses: {
      1:'',
      //42: '0xfB9e1591f67d4f9c32995252aEfe8A6EE798fAd7',
      42: '0xb99771f8981E2bFD283aA6710d0f62E4D2aD9bCD',
    },
    name: 'COMP',
    symbol: 'COMP',
    tokenSymbol: 'BENTO',
    icon: '🍤',//🍤
  },
  
  
  // {
  //   pid: 1,
  //   lpAddresses: {
  //     1: '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc',
  //   },
  //   tokenAddresses: {
  //     1: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  //   },
  //   name: 'UNI',
  //   symbol: 'UNI',
  //   tokenSymbol: 'BENTO',
  //   icon: '🐌',
  // },
]
