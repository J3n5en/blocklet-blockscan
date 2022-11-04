const axios = require('axios');

const transactionFetcher = require('../../../api/utils/transactions-fetcher.js');

jest.mock('axios');

describe('transactionFetcher tests', () => {
  test('should send a get request with correct options', () => {
    axios.mockResolvedValueOnce({ data: '' });
    transactionFetcher('address', 10, 100);
    expect(axios).toHaveBeenCalledWith({ params: { a: 'address', p: 10, ps: 100 }, url: 'https://etherscan.io/txs' });
  });

  test('should throw network error when axios rejected', () => {
    axios.mockRejectedValueOnce();
    expect(transactionFetcher('address', 10, 100)).rejects.toEqual(
      new Error('failed to fetch data from etherScan, please try again later.')
    );
  });
});
