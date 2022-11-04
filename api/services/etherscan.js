const transactionFetcher = require('../utils/transactions-fetcher.js');
const transactionParser = require('../utils/transactions-parser.js');

const getTransactionsByAddress = async (address, page = 1, pageSize = 50) => {
  if (![10, 25, 50, 100].includes(pageSize)) {
    throw Error(`pageSize: ${pageSize} is not supported`);
  }
  const transactionsRawData = await transactionFetcher(address, page, pageSize);
  return transactionParser(transactionsRawData);
};

module.exports = {
  getTransactionsByAddress,
};
