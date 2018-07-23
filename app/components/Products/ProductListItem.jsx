import React from 'react';
import { NavLink } from 'react-router-dom';
import { ProductImage } from './ProductImage';

export const ProductListItem = (props) => {
  const {
    slug,
    name,
    images,
    attributes,
    price_html,
    // description,
    // id,
    // regular_price,
    // sale_price,
  } = props;
  return (
    <li className="product">
      <NavLink to={`/products/${slug}`}>
        { images.length > 0 &&
          <ProductImage baseImage={images[0]} />
        }
        <h3>{name}</h3>
        <div dangerouslySetInnerHTML={{ __html: price_html }} />
        { attributes.map((attribute) => {
          // Check if the attribute has swatches
          if (attribute.swatches) {
            return (
              <ul className="attribute-options" key={attribute.name}>
                { attribute.options.map((option) => {
                  return (
                    <li
                      key={option.name}
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
              { attribute.options.map((option) => {
                return <li key={option.name}>{option.name}</li>;
              })}
            </ul>
          );
        })}
      </NavLink>
    </li>
  );
};
