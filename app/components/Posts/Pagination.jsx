import React from 'react';
import { Link } from 'react-router';

export const Pagination = props => {
  const { totalPages, urlBase, currentPage } = props;
  const pages = parseInt(totalPages);
  const pagesArr = pages > 1 ? Array.apply(null, Array(pages)).map((x, i) => i + 1) : [];
  if (pagesArr.length < 1) {
    return <span />;
  }
  return (
    <nav className="page_nav">
      <ul>
        {pagesArr.map(page => (
          <li key={page} className={parseInt(currentPage) === page ? 'page active' : 'page'}>
            <Link to={`/${urlBase}/page/${page}`}>
              {page}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
