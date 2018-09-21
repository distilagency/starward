import React from 'react';
import './PurchaseOption.scss';

const handleChange = (value, taxonomy, optionSelectHandler) => {
  const { value: selectedValue } = value;
  optionSelectHandler(taxonomy, selectedValue);
};

export const PurchaseOption = (props) => {
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
        <option value="" disabled>{placeholderText}</option>
        {attribute.options.map((option) => {
          if (variationAttributes[attribute.taxonomy].indexOf(option.slug) !== -1) {
            return (
              <option value={option.slug} selected={activeOption === option.slug}>
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
