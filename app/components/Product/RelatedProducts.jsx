import React from 'react';
import { ProductListItem } from '../Products/ProductListItem';
// import { NavLink } from 'react-router-dom';
// import { STORE_PRODUCTS_SLUG } from '../../config/app';

// const RelatedProductsList = (props) => {
//   const { relatedProducts } = props;
//   return relatedProducts.map((relatedProduct) => {
//       const {
//         images,
//         id,
//         name,
//         regular_price: regularPrice,
//         sale_price: salePrice,
//         slug,
//       } = relatedProduct;
//       const relatedProductBaseImage = (images && images.length > 0) ? images[0] : null;
//       const price = salePrice ? <span className="price"><s>{`$${regularPrice}`}</s>{` ${salePrice}`}</span> : `$${regularPrice}`;
//       return (
//         <li className="related-product" key={id}>
//           <NavLink to={`/${STORE_PRODUCTS_SLUG}/${slug}`}>
//             { relatedProductBaseImage && <img src={`${relatedProductBaseImage.src}`} alt={relatedProductBaseImage.alt} />}
//             <h3 className="title">{name}</h3>
//             <div className="price">{price}</div>
//           </NavLink>
//         </li>
//       );
//     });
// };

export function RelatedProducts({ relatedProducts }) {
  if (!relatedProducts || relatedProducts.length < 1) return null;
  return (
    <section className="related-products">
      <h2>Related Products</h2>
      <ul className="related-products-list">
        {relatedProducts.map(relatedProduct => <ProductListItem {...relatedProduct} />)}
      </ul>
    </section>
  );
}
