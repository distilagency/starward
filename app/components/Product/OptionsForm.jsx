import React from 'react';

export function OptionsForm({ attributes, variationAttributes, productType, callback }) {
  if (productType === 'variable') {
    return (
      <form method="GET">
        { attributes.map(attribute => {
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
                    { attribute.options.map((option, i) => {
                      // Check if the current option is one of the variation options
                      if (variationAttributes[attribute.taxonomy].indexOf(option.slug) !== -1) {
                        return (
                          <label
                            className="swatch-option-container"
                            htmlFor={`radio-${i}`}
                            key={i}>
                            <input
                              type="radio"
                              id={`radio-${i}`}
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
                  { attribute.options.map((option, i) => {
                    // Check if the current option is one of the variation options
                    if (variationAttributes[attribute.taxonomy].indexOf(option.slug) !== -1) {
                      return (
                        <option
                          name={option.taxonomy}
                          value={option.slug}
                          key={i}>
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
        <button type="submit" className="add-to-cart">Add to cart</button>
      </form>
    );
  }
  if (productType === 'simple') {
    return (
      <form>
        <button type="submit" className="add-to-cart">Add to cart</button>
      </form>
    );
  }
  return null;
}
