import React from 'react';
import { Link } from 'react-router';
import { Loading } from '../../components/Content/Loading';
import { STORE_SLUG } from '../../config/app';

// Infinite scroll loading
const SamePagePagination = (props) => {
  const {
    numProducts,
    totalProducts,
    starwardUpdating,
    products,
    fetchMorePosts
  } = props;
  const fetchMoreButtonHandler = (event) => {
    if (event) event.preventDefault();
    if (!starwardUpdating) {
      fetchMorePosts(products);
    }
  };
  if (numProducts < totalProducts) {
    if (starwardUpdating) {
      return (
        // fetching more posts, hide button, show loading spinner.
        <Loading fullscreen={false} />
      );
    }
    return (
      // More posts can be retrieved - show user button to fetch more.
      <Link to="#fetch-more" className="fetch-more-button" onClick={fetchMoreButtonHandler}>
        View more
      </Link>
    );
  }
  // No more posts to fetch, hide button.
  return <span />;
};

// Regular pagination method
const MultiPagePagination = (props) => {
  const { activePage, urlBase, numPages } = props;
  const pagesArr = numPages > 1 ? Array.apply(null, Array(numPages)).map((x, i) => i + 1) : [];
  if (pagesArr.length < 1) {
    return <span />;
  }
  return (
    <ul>
      {pagesArr.map(page => (
        <li key={page} className={activePage === page ? 'page active' : 'page'}>
          <Link to={`/${urlBase}/page/${page}`}>
            {page}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export const Pagination = props => {
  const { samePage, urlBase, products, currentPage, fetchMoreProducts, starwardUpdating } = props;
  const { items, totalProducts, totalPages } = products;
  if (samePage) {
    return (
      <nav className="page_nav">
        <SamePagePagination
          numProducts={items.length}
          totalProducts={totalProducts}
          starwardUpdating={starwardUpdating}
          products={products}
          fetchMoreProducts={fetchMoreProducts}
        />
      </nav>
    );
  }
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







// export const Pagination = props => {
//   const { products, urlBase, currentPage, starwardUpdating } = props;
//   const { items, totalProducts, totalPages } = products;
//
//   // const fetchMoreButtonHandler = (event) => {
//   //   if (event) event.preventDefault();
//   //   if (!starwardUpdating) {
//   //     fetchMorePosts(posts);
//   //   }
//   // };
//
//   // const samePagePagination = (numPosts, totalPosts) => {
//   //   if (numPosts < totalPosts) {
//   //     if (starwardUpdating) {
//   //       return (
//   //         // fetching more posts, hide button, show loading spinner.
//   //         <Loading fullscreen={false} />
//   //       );
//   //     } else {
//   //       return (
//   //         // More posts can be retrieved - show user button to fetch more.
//   //         <Link to="#fetch-more" className="fetch-more-button" onClick={(event) => fetchMoreButtonHandler(event)}>
//   //           View more
//   //         </Link>
//   //       );
//   //     }
//   //   } else {
//   //     // No more posts to fetch, hide button.
//   //     return <span />;
//   //   }
//   // };
//
//   const multiPagePagination = (activePage, numPages) => {
//     const pagesArr = numPages > 1 ? Array.apply(null, Array(numPages)).map((x, i) => i + 1) : [];
//     // console.log(pagesArr);
//     if (pagesArr.length < 1) {
//       return <span />;
//     }
//     return (
//       <ul>
//         {pagesArr.map(page => (
//           <li key={page} className={activePage === page ? 'page active' : 'page'}>
//             <Link to={`/${urlBase}/page/${page}`}>
//               {page}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     );
//   };
//
//   return (
//     <nav className="page_nav">
//       { multiPagePagination((currentPage ? parseInt(currentPage) : 1), parseInt(totalPages)) }
//     </nav>
//   );
// };
