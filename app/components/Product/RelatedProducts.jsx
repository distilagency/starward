import React from 'react';
import { ProductListItem } from '../Products/ProductListItem';

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
