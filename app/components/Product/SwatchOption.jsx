import React from 'react';
import './SwatchOption.scss';

const handleChange = (event, optionSelectHandler) => {
  const { name, value } = event.target;
  optionSelectHandler(name, value);
};

export const SwatchOption = (props) => {
  const {
    attribute,
    variationAttributes,
    selectedOptions,
    optionSelectHandler
  } = props;
  const activeValue = selectedOptions[attribute.taxonomy] || null;
  return (
    <div className="attribute-options" key={attribute.name}>
      <span className="attribute-title">{attribute.name}</span>
      <div className="swatch-options">
        { attribute.options.map((option, index) => {
          // Check if the current option is one of the variation options
          const isActive = (activeValue === option.slug);
          if (variationAttributes[attribute.taxonomy].indexOf(option.slug) !== -1) {
            return (
              <label
                className={`swatch-option-container ${isActive ? 'active' : ''}`}
                htmlFor={`radio-${index}`}
                key={option.slug}>
                <input
                  type="radio"
                  id={`radio-${index}`}
                  name={option.taxonomy}
                  value={option.slug}
                  onClick={event => handleChange(event, optionSelectHandler)}
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
          return null;
        })}
      </div>
    </div>
  );
};
