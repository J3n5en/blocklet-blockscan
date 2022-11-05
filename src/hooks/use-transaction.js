import useSWR from 'swr';

import fetcher from '../libs/fetcher.js';

const useTransaction = (address, page = 1, pageSize = 10) => {
  const { data: transactions, error } = useSWR(
    address && page && pageSize ? `/api/txs?a=${address}&page=${page}&pageSize=${pageSize}` : null,
    fetcher
  );
  return { transactions, error, isLoading: !transactions && !error };
};

export default useTransaction;
