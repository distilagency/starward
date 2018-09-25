import React from 'react';
import { ProductListItem } from './ProductListItem';
import { Pagination } from './Pagination';
import { Loading } from '../../Content/Loading';
import './ProductList.scss';

export const ProductList = (props) => {
  const {
    products,
    urlBase,
    currentPage,
    loading
  } = props;
  if (loading) return <section className="products"><Loading inline /></section>;
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
