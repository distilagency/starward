import React from 'react';
import { NavLink } from 'react-router-dom';
import PriceSlider from './PriceSlider';
import { AttributeFilter } from './AttributeFilter';
import { SubCategoriesFilter } from './SubCategoriesFilter';

function renderAttributeFilters(filters, filterType, urlBase, location) {
  // For attributes we loop over all attributes and render each one in its
  // own separate filter block
  return Object.keys(filters[filterType]).map((attribute) => {
    const attributeDetails = filters[filterType][attribute];
    return (
      <AttributeFilter
        attribute={attributeDetails}
        urlBase={urlBase}
        location={location}
        key={attribute}
      />
    );
  });
}

const RenderFilterBlocks = (props) => {
  const { filters, urlBase, location } = props;
  // Map over parent filter types index.e. Price, Attributes, Sub Categories
  if (!filters && filters.length < 1) return null;
  return (
    <div>
      <NavLink to={`/${urlBase}`}>Clear filters</NavLink>
      {Object.keys(filters).map((filterType) => {
        if (filterType === 'price') {
          return (
            <PriceSlider
              filter={filters[filterType]}
              key={filterType}
              location={location}
            />
          );
        }
        if (filterType === 'attributes') {
          return renderAttributeFilters(filters, filterType, urlBase, location);
        }
        if (filterType === 'subcategories') {
          return (
            <SubCategoriesFilter
              subcategories={filters[filterType]}
              key={filterType}
              urlBase={urlBase}
              location={location}
            />
          );
        }
        return <span />;
      })}
    </div>
  );
};

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
        <RenderFilterBlocks
          filters={filters}
          urlBase={urlBase}
          location={location}
        />
      </div>
    );
  }
  return null;
};
