const fs = require('fs');

const transactionParser = require('../../../api/utils/transactions-paser.js');

describe('transactionParser tests', () => {
  test('should return empty when rawData is not valid', () => {
    expect(transactionParser('123123').length).toBe(0);
  });

  test('should return 10 transactions when rawData contains 10 transactions', () => {
    const rawData = fs.readFileSync('__fixtures__/10Transactions.html');
    expect(transactionParser(rawData).length).toBe(10);
  });

  test('should return correct data when parse a valid rawData', () => {
    const rawData = `<table><tbody><tr>
  <td></td>
  <td><span class='hash-tag'><ahref='/tx/0xe8e78a9df5db826d5d5ad745988f881b167f19ddf40dcaf3408b5a293253d2f3' class='myFnExpandBox_searchVal'>0xe8e78a9df5db826d5d5ad745988f881b167f19ddf40dcaf3408b5a293253d2f3</a></span></td>
  <td><span title="Multicall">Multicall</span></td>
  <td><a href='/block/15848839'>15848839</a></td>
  <td class='showDate'><span>2022-10-28 20:06:11</span></td>
  <td class='showAge'><span title='2022-10-28 20:06:11'>6 days 15 hrs ago</span></td>
  <td><span class='hash-tag' title='0xeb2a81e229b68c1c22b6683275c00945f9872d90'>0xeb2a81e229b68c1c22b6683275c00945f9872d90</span></td>
  <td class='text-center'></td>
  <td><span ><a class='hash-tag' href='/address/0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45'</a></td>
  <td>0<b>.</b>1 Ether</td>
  <td class='showTxnFee'><span>0<b>.</b>00375268</span></td>
  <td class='showGasPrice'><span >22<b>.</b>04981949</span></td>
</tr></tbody></table>
  `;
    const transactions = transactionParser(rawData);
    expect(transactions.length).toBe(1);
    expect(transactions[0]).toEqual({
      txnHash: '0xe8e78a9df5db826d5d5ad745988f881b167f19ddf40dcaf3408b5a293253d2f3',
      method: 'Multicall',
      block: '15848839',
      time: new Date('2022-10-28T12:06:11.000Z'),
      from: '0xeb2a81e229b68c1c22b6683275c00945f9872d90',
      to: '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45',
      value: '0.1 Ether',
      txFee: '0.00375268',
    });
  });

  test('should return hash address when to address has alias', () => {
    const rawData = `<table><tbody><tr>
  <td></td>
  <td><span class='hash-tag'><ahref='/tx/0xe8e78a9df5db826d5d5ad745988f881b167f19ddf40dcaf3408b5a293253d2f3' class='myFnExpandBox_searchVal'>0xe8e78a9df5db826d5d5ad745988f881b167f19ddf40dcaf3408b5a293253d2f3</a></span></td>
  <td><span title="Multicall">Multicall</span></td>
  <td><a href='/block/15848839'>15848839</a></td>
  <td class='showDate'><span>2022-10-28 20:06:11</span></td>
  <td class='showAge'><span title='2022-10-28 20:06:11'>6 days 15 hrs ago</span></td>
  <td><span class='hash-tag' title='0xeb2a81e229b68c1c22b6683275c00945f9872d90'>0xeb2a81e229b68c1c22b6683275c00945f9872d90</span></td>
  <td class='text-center'></td>
  <td><span><a class='hash-tag text-truncate' href='/address/0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45' title='Uniswap V3: Router 2 (0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45)'>Uniswap V3: Router 2</a></td>
  <td>0<b>.</b>1 Ether</td>
  <td class='showTxnFee'><span>0<b>.</b>00375268</span></td>
  <td class='showGasPrice'><span >22<b>.</b>04981949</span></td>
</tr></tbody></table>
  `;
    const transactions = transactionParser(rawData);
    expect(transactions.length).toBe(1);
    expect(transactions[0].to).toEqual('0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45');
  });

  test('should return empty when there are no matching entries', () => {
    const rawData = `<table><tbody><tr>
    <td><span class="alert">There are no matching entries<span></td>  
    </tr></tbody></table>
  `;
    const transactions = transactionParser(rawData);
    expect(transactions.length).toBe(0);
  });
});
