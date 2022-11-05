import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function Pagination({ onChange, hasNext = false, isLoading = false, defaultPage = 1, defaultPageSize = 50 }) {
  const [page, setPage] = useState(defaultPage);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const avaliablePageSize = [10, 25, 50, 100];

  useEffect(() => {
    onChange?.(page, pageSize);
  }, [page, pageSize, onChange]);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <select
        name="pageSize"
        title="pageSize"
        value={pageSize}
        onChange={(e) => setPageSize(+e.target.value)}
        style={{ width: '100px', height: '50px', textAlign: 'center' }}>
        {avaliablePageSize.map((size) => (
          <option value={size}>{size}</option>
        ))}
      </select>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
        <button
          title="prev"
          type="button"
          disabled={page <= 1 || isLoading}
          onClick={() => setPage(page - 1)}
          style={{ width: '100px', height: '50px' }}>
          ←
        </button>
        <p>{page}</p>
        <button
          title="next"
          type="button"
          disabled={!hasNext || isLoading}
          onClick={() => setPage(page + 1)}
          style={{ width: '100px', height: '50px' }}>
          →
        </button>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  onChange: PropTypes.func,
  hasNext: PropTypes.bool,
  isLoading: PropTypes.bool,
  defaultPage: PropTypes.number,
  defaultPageSize: PropTypes.oneOf([10, 25, 50, 100]),
};

Pagination.defaultProps = {
  onChange: () => undefined,
  hasNext: false,
  isLoading: false,
  defaultPage: 1,
  defaultPageSize: 50,
};

export default Pagination;
