import React from 'react';
import { ProductVariationOption } from './ProductVariationOption';
import { SwatchOption } from './SwatchOption';
import { QuantitySelector } from './QuantitySelector';
import './PurchaseOptions.scss';

export const PurchaseOptions = (props) => {
  const {
    attributes,
    variationAttributes,
    productType,
    inStock,
    quantity,
    activeVariation,
    selectedOptions,
    increaseQuantityHandler,
    decreaseQuantityHandler,
    optionSelectHandler,
    addToCartHandler,
  } = props;
  const isVariable = (productType === 'variable');
  return (
    <div className="purchase-options">
      { isVariable && (
        attributes.map((attribute) => {
          // Check if this attribute is a variation attribute
          if (variationAttributes && (attribute.taxonomy in variationAttributes)) {
            if (attribute.swatches) {
              return (
                <SwatchOption
                  key={attribute.name}
                  attribute={attribute}
                  variationAttributes={variationAttributes}
                  selectedOptions={selectedOptions}
                  optionSelectHandler={optionSelectHandler} />
              );
            }
            return (
              <ProductVariationOption
                key={attribute.name}
                attribute={attribute}
                variationAttributes={variationAttributes}
                selectedOptions={selectedOptions}
                optionSelectHandler={optionSelectHandler} />
              );
          }
          return null;
        })
      )}
      <div className="quantity-selector-container">
        <span className="selector-title">Quantity</span>
        <QuantitySelector
          quantity={quantity}
          increaseQuantityHandler={increaseQuantityHandler}
          decreaseQuantityHandler={decreaseQuantityHandler} />
      </div>
      <button
        className="add-to-cart-button"
        disabled={!inStock || (isVariable && !activeVariation)}
        onClick={event => addToCartHandler(event)}>
        Add to cart
      </button>
    </div>
  );
};
