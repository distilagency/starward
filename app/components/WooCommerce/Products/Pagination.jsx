import React from 'react';
import { NavLink } from 'react-router-dom';

// Regular pagination method
const MultiPagePagination = (props) => {
  const { activePage, urlBase, numPages } = props;
  const pagesArr = numPages > 1 ? Array.apply(null, Array(numPages)).map((x, index) => index + 1) : [];
  if (pagesArr.length < 1) {
    return <span />;
  }
  return (
    <ul>
      {pagesArr.map(page => (
        <li key={page} className={activePage === page ? 'page active' : 'page'}>
          <NavLink to={`/${urlBase}/page/${page}`}>
            {page}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export const Pagination = (props) => {
  const { urlBase, products, currentPage } = props;
  const { totalPages } = products;
  return (
    <nav className="page_nav">
      <MultiPagePagination
        activePage={currentPage ? parseInt(currentPage) : 1}
        urlBase={urlBase}
        numPages={parseInt(totalPages)}
      />
    </nav>
  );
};
