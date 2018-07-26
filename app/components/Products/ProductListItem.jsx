import React from 'react';
import { NavLink } from 'react-router-dom';
import { ProductImage } from './ProductImage';

export const ProductListItem = (props) => {
  const {
    slug,
    name,
    images,
    regular_price: regularPrice,
    sale_price: salePrice,
    price_html: priceHtml
  } = props;
  console.log(`props @ ProductListItem ${name}`, props);
  let price = <div className="price" dangerouslySetInnerHTML={{ __html: priceHtml }} />;
  if (salePrice || regularPrice) {
    price = salePrice ? (
      <div className="price">
        <del>
          <span className="woocommerce-Price-amount amount">
            <span className="woocommerce-Price-currencySymbol">$</span>{`${parseFloat(regularPrice).toFixed(2)}`}
          </span>
        </del>
        <span>{' '}</span>
        <ins>
          <span className="woocommerce-Price-amount amount">
            <span className="woocommerce-Price-currencySymbol">$</span>{`${parseFloat(salePrice).toFixed(2)}`}
          </span>
        </ins>
      </div>
    ) : (
      <div className="price">
        <span className="woocommerce-Price-amount amount">
          <span className="woocommerce-Price-currencySymbol">$</span>
          {`${parseFloat(regularPrice).toFixed(2)}`}
        </span>
      </div>
    );
  }
  return (
    <li className="product">
      <NavLink to={`/products/${slug}`}>
        { images.length > 0 &&
          <ProductImage baseImage={images[0]} />
        }
        <h3>{name}</h3>
        {price}
      </NavLink>
    </li>
  );
};
