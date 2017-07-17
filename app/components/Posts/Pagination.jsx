import React from 'react';
import { Link } from 'react-router';
import { Loading } from '../../components/Content/Loading';
import { BLOG_SLUG } from '../../../config/app';

export const Pagination = props => {
  const { samePage, posts, currentPage, fetchMorePosts, starwardUpdating } = props;
  const { items, totalItems, totalPages } = posts;

  const fetchMoreButtonHandler = () => {
    if (!starwardUpdating) {
      fetchMorePosts(posts);
    }
  };

  const samePagePagination = (numPosts, totalPosts) => {
    if (numPosts < totalPosts) {
      if (starwardUpdating) {
        return (
          // fetching more posts, hide button, show loading spinner.
          <Loading fullscreen={false} />
        );
      } else {
        return (
          // More posts can be retrieved - show user button to fetch more.
          <div className="wrap">
            <div className="fetch-more-button" onClick={() => fetchMoreButtonHandler()}>
              View more
            </div>
          </div>
        );
      }
    } else {
      // No more posts to fetch, hide button.
      return <span />;
    }
  };

  const multiPagePagination = (activePage, numPages) => {
    const pagesArr = numPages > 1 ? Array.apply(null, Array(numPages)).map((x, i) => i + 1) : [];
    if (pagesArr.length < 1) {
      return <span />;
    }
    return (
      <ul>
        {pagesArr.map(page => (
          <li key={page} className={activePage === page ? 'page active' : 'page'}>
            <Link to={`/${BLOG_SLUG}/page/${page}`}>
              {page}
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <nav className="page_nav">
      { samePage ? samePagePagination(items.length, totalItems) : multiPagePagination((currentPage ? parseInt(currentPage) : 1), parseInt(totalPages)) }
    </nav>
  );
};
