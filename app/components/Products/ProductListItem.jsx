import React from 'react';
import { Link } from 'react-router-dom';
import { WP_URL, SHOP_PRODUCTS_SLUG } from '../../config/app';
import './ProductListItem.scss';

export const ProductListItem = (props) => {
  const {
    slug,
    name,
    images,
    regular_price: regularPrice,
    sale_price: salePrice,
    price_html: priceHtml,
    active,
    on_sale: onSale
  } = props;
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
    <li className={`product-list-item ${active ? 'active' : ''}`}>
      { onSale && <span className="sale-flag button orange">Sale!</span> }
      { images && images.length > 0 &&
        <div className="inner-image" style={{backgroundImage: `url('${WP_URL}${images[0].src}')`}}>
          <div className="hover-buttons">
            <Link to={`/${SHOP_PRODUCTS_SLUG}/${slug}`} className="button light">
              Details
            </Link>
            <Link to={`/${SHOP_PRODUCTS_SLUG}/${slug}`} className="button cyan">
              Buy
            </Link>
          </div>
        </div>
      }
      <h3 className="product-title">{name}</h3>
      {price}
    </li>
  );
};
