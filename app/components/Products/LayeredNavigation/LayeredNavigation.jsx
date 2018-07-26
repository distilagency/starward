import React, { Component } from 'react';
import qs from 'query-string';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { PriceSlider } from './PriceSlider';
import { SubCategoriesFilter } from './SubCategoriesFilter';
import { AttributeFilters } from './AttributeFilters';
import { Title } from '../../Content/Title';

class LayeredNavigation extends Component {
  changeQueries = (newParams) => {
    const { history, location } = this.props;
    const currentParams = qs.parse(location.search);
    history.push({
      search: qs.stringify({
        ...currentParams,
        ...newParams
      })
    });
  }

  render() {
    const {
      filters,
      location,
      history,
      categoryName,
      urlBase
    } = this.props;
    const { attributes, subcategories, price } = filters;
    const hasAttributeFilters = attributes.some((attribute) => {
      return attribute.options != null;
    });
    const currentParams = qs.parse(location.search);
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
                  currentParams={currentParams}
                  history={history}
                  changeQueryHandler={this.changeQueries}
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
                  changeQueryHandler={this.changeQueries}
                />
              );
            }
            if (filterType === 'subcategories') {
              return (
                <SubCategoriesFilter
                  key={filterType}
                  subcategories={filters[filterType]}
                  location={location}
                  currentParams={currentParams}
                />
              );
            }
            return null;
          })}
        </aside>
      );
    }
    return null;
  }
}

export default withRouter(LayeredNavigation);
