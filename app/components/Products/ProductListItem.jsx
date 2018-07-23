import React from 'react';
import { Link } from 'react-router';
import { ProductImage } from './ProductImage.jsx';
// import { baseUrl, STORE_PRODUCTS_SLUG } from '../../config/app';

export const ProductListItem = props => {
  const {
    slug,
    name,
    description,
    id,
    regular_price,
    sale_price,
    price_html,
    images,
    attributes
  } = props;
  return (
    <div className="product">
      <Link to={`/products/${slug}`}>
        { images.length > 0 &&
          <ProductImage baseImage={images[0]} />
        }
        <h3>{name}</h3>
        <div dangerouslySetInnerHTML={{ __html: price_html }} />
        { attributes.map(attribute => {
          // Check if the attribute has swatches
          if (attribute.swatches) {
            return (
              <ul className="attribute-options" key={attribute.name}>
                { attribute.options.map((option, i) => {
                  return (
                    <li
                      key={i}
                      style={{
                        backgroundColor: attribute.swatches[option.name],
                        width: '20px',
                        height: '20px',
                        display: 'inline-block'
                      }}
                    />
                  );
                })}
              </ul>
            );
          }
          // Default
          return (
            <ul className="attribute-options" key={attribute.name}>
              { attribute.options.map((option, i) => {
                return <li key={i}>{option.name}</li>;
              })}
            </ul>
          );
        })}
      </Link>
    </div>
  );
};
