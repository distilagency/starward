import React from 'react';
import { NavLink } from 'react-router-dom';
import PriceSlider from './PriceSlider';
import { SubCategoriesFilter } from './SubCategoriesFilter';
import { AttributeFilters } from './AttributeFilters';
import { Title } from '../../Content/Title';

export const LayeredNavigation = (props) => {
  const {
    filters,
    location,
    categoryName,
    urlBase
  } = props;
  const { attributes, subcategories, price } = filters;
  const hasAttributeFilters = attributes.some((attribute) => {
    return attribute.options != null;
  });
  const hasSubCategories = typeof subcategories !== 'undefined' && subcategories.length > 0;
  const hasPriceRange = price.min_price !== price.max_price;
  if (hasAttributeFilters || hasPriceRange || hasSubCategories) {
    return (
      <aside className="layered-navigation">
        <Title title={categoryName} />
        <div className="header">
          <span className="title">Refine</span>
          <NavLink to={`/${urlBase}`}>Clear all</NavLink>
        </div>
        {Object.keys(filters).map((filterType) => {
          if (filterType === 'price') {
            return (
              <PriceSlider
                key={filterType}
                filter={filters[filterType]}
                location={location}
              />
            );
          }
          if (filterType === 'attributes') {
            return (
              <AttributeFilters
                key={filterType}
                filters={filters}
                filterType={filterType}
                location={location}
              />
            );
          }
          if (filterType === 'subcategories') {
            return (
              <SubCategoriesFilter
                key={filterType}
                subcategories={filters[filterType]}
                location={location}
              />
            );
          }
          return null;
        })}
      </aside>
    );
  }
  return null;
};
