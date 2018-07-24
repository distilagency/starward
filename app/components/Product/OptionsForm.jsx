import React from 'react';

export function OptionsForm(props) {
  const {
    id,
    attributes,
    variationAttributes,
    productType,
    callback,
    addToCartHandler,
    inStock
  } = props;
  if (productType === 'variable') {
    return (
      <form method="GET">
        { attributes.map((attribute) => {
          // Check if this attribute is a variation attribute
          if (attribute.taxonomy in variationAttributes) {
            // Check if the attribute has COLOR SWATCHES
            // If it does, use radio buttons
            // (styling in public/assets/sass/helpers/_swatch-options.scss)
            if (attribute.swatches) {
              return (
                <ul className="attribute-options" key={attribute.name}>
                  <h3>{attribute.name}</h3>
                  <div className="swatch-options">
                    { attribute.options.map((option, index) => {
                      // Check if the current option is one of the variation options
                      if (variationAttributes[attribute.taxonomy].indexOf(option.slug) !== -1) {
                        return (
                          <label
                            className="swatch-option-container"
                            htmlFor={`radio-${index}`}
                            key={option.slug}>
                            <input
                              type="radio"
                              id={`radio-${index}`}
                              name={option.taxonomy}
                              value={option.slug}
                              style={{
                                position: 'absolute',
                                opacity: 0,
                                cursor: 'pointer'
                              }}
                              onClick={callback}
                            />
                            <span
                              className="mark"
                              style={{
                                backgroundColor: attribute.swatches[option.name]
                              }}
                            />
                          </label>
                        );
                      }
                      // If the current option IS NOT a variation option DO NOT display it
                      return null;
                    })}
                  </div>
                </ul>
              );
            }
            // Use a select dropdown for attributes that are not of type color
            return (
              <div className="attribute-options" key={attribute.name}>
                <h3>{attribute.name}</h3>
                <select
                  name={attribute.taxonomy}
                  onChange={callback}>
                  <option value="">Select a {attribute.slug}</option>
                  { attribute.options.map((option) => {
                    // Check if the current option is one of the variation options
                    if (variationAttributes[attribute.taxonomy].indexOf(option.slug) !== -1) {
                      return (
                        <option
                          name={option.taxonomy}
                          value={option.slug}
                          key={option.slug}>
                          {option.name}
                        </option>
                      );
                    }
                    // If the current option IS NOT a variation option DO NOT display it
                    return null;
                  })}
                </select>
              </div>
            );
          }
          // If this attribute IS NOT a variation attribute DO NOT display it
          return null;
        })}
        <button type="submit" disabled={!inStock} className="add-to-cart" onClick={event => addToCartHandler(event, id, 1)}>Add to cart</button>
      </form>
    );
  }
  if (productType === 'simple') {
    return (
      <form>
        <button type="submit" disabled={!inStock} className="add-to-cart" onClick={event => addToCartHandler(event, id, 1)}>Add to cart</button>
      </form>
    );
  }
  return null;
}
