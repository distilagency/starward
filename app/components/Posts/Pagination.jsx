import React from 'react';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/Content/Loading';
import { BLOG_SLUG } from '../../config/app';

export const Pagination = props => {
  const { posts, currentPage, urlBase } = props;
  const { items, totalItems, totalPages } = posts;
  const activePage = currentPage ? parseInt(currentPage) : 1;
  const numPages = parseInt(totalPages);
  const pagesArr = numPages > 1 ? Array.apply(null, Array(numPages)).map((x, i) => i + 1) : [];
  if (pagesArr.length < 1)  return null;
  return (
    <nav className="page_nav">
      <ul>
        {pagesArr.map(page => (
          <li key={page} className={activePage === page ? 'page active' : 'page'}>
            <Link to={`/${urlBase}/page/${page}`}>
              {page}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
