import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../components/pagination.jsx';

import useTransaction from '../hooks/use-transaction.js';
import logo from '../logo.svg';

function Home() {
  const formRef = useRef(null);
  const [address, setAddress] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const { transactions, error, isLoading } = useTransaction(address, page, pageSize);

  const onPageChange = (newPage, newPageSize) => {
    setPage(newPage);
    setPageSize(newPageSize);
    formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setAddress(e.target.address.value);
    setPage(1);
  };
  return (
    <header className="app-header">
      <img src={logo} className="app-logo" alt="logo" />
      <form action="#" ref={formRef} onSubmit={onSubmit} style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <span>address:</span>
        <input defaultValue="" id="address" name="address" type="text" style={{ width: '380px' }} />
        <input type="submit" value="search" />
      </form>
      {!!address && (
        <div>
          <pre style={{ textAlign: 'left' }}>
            <code>address:{address}</code>
            <br />
            <code>{isLoading ? 'loading...' : `transactions = ${JSON.stringify(transactions, null, 2)}`}</code>
          </pre>
          {error && <p style={{ color: 'red' }}>{error.response.data.error || error.message}</p>}
          <Pagination
            defaultPage={page}
            isLoading={isLoading}
            onChange={onPageChange}
            defaultPageSize={pageSize}
            hasNext={!!transactions?.length}
          />
        </div>
      )}
      <Link className="app-link" to="/about">
        About
      </Link>
      <a className="app-link" href="https://docs.arcblock.io/abtnode/" target="_blank" rel="noopener noreferrer">
        Learn Blocklet
      </a>
    </header>
  );
}

export default Home;
