import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export const Pagination = props => {
  const { total_items, total_pages, url_base } = props;
  const pages = parseInt(total_pages);
  const items = parseInt(total_items);
  const pages_arr = pages > 1 ? Array.apply(null, Array(pages)).map((x, i) => i + 1) : [];
  if(pages_arr.length < 1){
    return <span></span>;
  }
  return (
    <nav className="page_nav">
      <ul>
        {pages_arr.map(page => (
          <Link key={page} to={`/${url_base}/page/${page}`}>
            <li>{page}</li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  total_items: PropTypes.string,
  total_pages: PropTypes.string,
  url_base: PropTypes.string.isRequired,
};
