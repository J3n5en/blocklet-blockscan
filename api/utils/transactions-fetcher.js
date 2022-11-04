const axios = require('axios');

const transactionFetcher = async (address, page, pageSize) => {
  try {
    const { data } = await axios({
      url: 'https://etherscan.io/txs',
      params: {
        a: address,
        ps: pageSize,
        p: page,
      },
    });
    return data;
  } catch (error) {
    throw Error('failed to fetch data from etherScan, please try again later.');
  }
};

module.exports = transactionFetcher;
