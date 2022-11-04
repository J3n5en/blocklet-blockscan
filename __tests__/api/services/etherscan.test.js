const etherScanServices = require('../../../api/services/etherscan.js');
const transactionsFetcher = require('../../../api/utils/transactions-fetcher.js');
const transactionsParser = require('../../../api/utils/transactions-parser.js');

jest.mock('../../../api/utils/transactions-fetcher.js');
jest.mock('../../../api/utils/transactions-parser.js');

describe('etherscan services tests', () => {
  test('should throw not supported error when pageSize is not valid', () => {
    expect(etherScanServices.getTransactionsByAddress('address', 1, 123123)).rejects.toEqual(
      new Error('pageSize: 123123 is not supported')
    );
  });

  test('should fetch transactions then parse transactions when pageSize is valid', async () => {
    transactionsFetcher.mockResolvedValue('rawData');
    etherScanServices.getTransactionsByAddress('address', 1, 10);
    await expect(transactionsFetcher).toHaveBeenCalledWith('address', 1, 10);
    expect(transactionsParser).toHaveBeenCalledWith('rawData');
  });
});
