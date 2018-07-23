import React from 'react';
import { FilterBlocks } from './FilterBlocks';

export const LayeredNavigation = (props) => {
  const { filters, urlBase, location } = props;
  const { attributes, subcategories, price } = filters;
  const hasAttributeFilters = attributes.some((attribute) => {
    return attribute.options != null;
  });
  const hasSubCategories = typeof subcategories !== 'undefined' && subcategories.length > 0;
  const hasPriceRange = price.min_price !== price.max_price;
  if (hasAttributeFilters || hasPriceRange || hasSubCategories) {
    return (
      <div className="layered-navigation">
        <h2>Layered Navigation</h2>
        <FilterBlocks
          filters={filters}
          urlBase={urlBase}
          location={location}
        />
      </div>
    );
  }
  return null;
};
