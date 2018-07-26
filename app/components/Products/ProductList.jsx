import React from 'react';
import { ProductListItem } from './ProductListItem';
import { Pagination } from './Pagination';

export const ProductList = (props) => {
  const {
    products,
    urlBase,
    currentPage
  } = props;
  const { items, totalProducts } = products;
  const hasResults = products && items;
  return (
    <section className="products">
      <span className="results">{`${totalProducts || 0} Items Found`}</span>
      <ul className="products-list">
        {
          hasResults ?
            items.map(product => <ProductListItem key={product.slug} {...product} />) :
            <span>No Products Found</span>
        }
      </ul>
      { hasResults &&
        <Pagination
          urlBase={urlBase}
          products={products}
          currentPage={currentPage}
        />
      }
    </section>
  );
};
