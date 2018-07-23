import React from 'react';
import { ProductListItem } from './ProductListItem';
import { Pagination } from './Pagination';
import { PRODUCTS_PER_PAGE } from '../../config/app';

export const ProductList = (props) => {
  const {
    products,
    urlBase,
    currentPage,
    starwardUpdating
  } = props;
  const { items, totalProducts } = products;
  if (!products || products.length < 1) {
    return <h3>No Products Found</h3>;
  }
  // If no page parameter, then the page is the first page
  const activePage = !currentPage ? 1 : currentPage;
  // Get index of first product on page
  const firstProductIndex = activePage !== 1 ? ((PRODUCTS_PER_PAGE * (activePage - 1)) + 1) : 1;
  // Get index of last product on page
  const lastProductIndex = (firstProductIndex + (items.length - 1));
  return (
    <section className="products">
      { items.length > 0 &&
        <div>Showing {firstProductIndex}-{lastProductIndex} of {totalProducts} results</div>
      }
      <section className="products-list">
        {items.length < 1 ? <h2>No Products Found</h2> : null}
        {items.map((product, index) => <ProductListItem key={index} {...product} />)}
      </section>
      <Pagination
        urlBase={urlBase}
        products={products}
        currentPage={currentPage}
        // fetchMorePosts={fetchMorePosts}
        starwardUpdating={starwardUpdating}
      />
    </section>
  );
};
