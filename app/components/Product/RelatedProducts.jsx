import React from 'react';
import { NavLink } from 'react-router-dom';
import { STORE_PRODUCTS_SLUG } from '../../config/app';
import { WP_URL } from '../../../server/config/app';

export function RelatedProducts({ relatedProducts }) {
  if (relatedProducts) {
    return (
      <div className="related-products">
        <h2>Related Products</h2>
        { relatedProducts.map(relatedProduct => {
            const {
              images,
              id,
              name,
              regular_price: relatedProductRegularPrice,
              sale_price: relatedProductSalePrice,
              price,
              slug,
            } = relatedProduct;
            const relatedProductBaseImage = (images && images.length > 0) ? images[0] : null;
            return (
              <NavLink to={`/${STORE_PRODUCTS_SLUG}/${slug}`} className="related-product" key={id}>
                { relatedProductBaseImage && <img src={`${WP_URL}${relatedProductBaseImage.src}`} alt={relatedProductBaseImage.alt} />}
                <h3 key={id}>{name}</h3>
                <div className="price">{price}</div>
              </NavLink>
            );
          })
        }
      </div>
    );
  }
  return null;
}
