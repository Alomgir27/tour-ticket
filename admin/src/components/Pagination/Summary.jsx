import React from 'react';

export default function Summary(props) {
  const { total, from, to } = props;

  return (
    <div className="col-12 text-center text-sm-start col-sm-auto col-lg mb-3">
      Showing{' '}
      <span className="fw-semibold">{from}</span>{' '}
      to{' '}
      <span className="fw-semibold">{to}</span>{' '}
      of{' '}
      <span className="fw-semibold">{total}</span>{' '}
      results
    </div>
  );
}
