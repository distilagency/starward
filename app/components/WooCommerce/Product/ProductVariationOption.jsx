import React from 'react';
import './ProductVariationOption.scss';

export const ProductVariationOption = (props) => {
  const {
    attribute,
    variationAttributes,
    selectedOptions,
    optionSelectHandler
  } = props;
  const activeValue = selectedOptions[attribute.taxonomy] || null;
  const activeOption = attribute.options.find(option => (option.value === activeValue));
  const placeholderText = `Select a ${attribute.slug}`;
  return (
    <div className="attribute-options">
      <span className="attribute-title">{attribute.name}</span>
      <select onChange={event => optionSelectHandler(attribute.taxonomy, event.target.value)}>
        <option value="" selected={!activeOption}>{placeholderText}</option>
        {attribute.options.map((option) => {
          if (variationAttributes[attribute.taxonomy].indexOf(option.slug) !== -1) {
            return (
              <option
                key={option.slug}
                value={option.slug}
                selected={activeOption === option.slug}>
                {option.name}
              </option>
            );
          }
          return null;
        })}
      </select>
    </div>
  );
};
