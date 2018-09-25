import React from 'react';
import { Link } from 'react-router-dom';
import { SHOP_PRODUCTS_SLUG } from '../../../config/app';
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
  const primaryImage = images && images.length > 0 ? images[0] : false;
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
      <Link to={`/${SHOP_PRODUCTS_SLUG}/${slug}`}>
        {primaryImage && <img className="product-image" src={primaryImage.src} alt={primaryImage.alt} />}
      </Link>
      <h3 className="product-title">{name}</h3>
      {price}
    </li>
  );
};
