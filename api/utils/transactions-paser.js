const cheerio = require('cheerio');

const transactionParser = (rawData) => {
  const $ = cheerio.load(rawData);
  if ($('tbody .alert').length) {
    return [];
  }
  return $('tbody > tr')
    .map((_, element) => {
      const $element = $(element);
      const txnHash = $element.find('.myFnExpandBox_searchVal').text();
      const method = $element.find('td:eq(2) span').attr('title');
      const block = $element.find('td:eq(3) a').text();
      const time = $element.find('.showDate span').text();
      const from = $element.find('td:eq(6) span').attr('title');
      const to =
        $element.find('td:eq(8) span.hash-tag').text() ||
        $element.find('td:eq(8) a').attr('href').replace('/address/', '');
      const value = $element.find('td:eq(9)').text();
      const txFee = $element.find('td:eq(10) span').text();
      return {
        txnHash,
        method,
        block,
        time: time ? new Date(time) : undefined,
        from,
        to,
        value,
        txFee,
      };
    })
    .get();
};

module.exports = transactionParser;
