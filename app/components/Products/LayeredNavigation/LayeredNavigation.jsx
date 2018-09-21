import React, { Component } from 'react';
import qs from 'query-string';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { PriceSlider } from './PriceSlider';
import { SubCategoriesFilter } from './SubCategoriesFilter';
import { AttributeFilters } from './AttributeFilters';
import { Title } from '../../Content/Title';
import './LayeredNavigation.scss';

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
  toggleQuery = (key, value) => {
    const { history, location } = this.props;
    const valueStr = `${value}`;
    const currentParams = qs.parse(location.search);
    const keyExists = Object.prototype.hasOwnProperty.call(currentParams, key);
    const isArray = keyExists && Array.isArray(currentParams[key]);
    const newParams = currentParams;
    if (keyExists && isArray) {
      if (currentParams[key].includes(valueStr)) {
        // Removing already active query from collection of queries of same type.
        newParams[key] = newParams[key].filter(arrVal => arrVal !== valueStr);
      } else {
        // Adding new value to existing queries of same type.
        newParams[key].push(value);
      }
    } else if (keyExists && !isArray) {
      if (currentParams[key] === valueStr) {
        // Query value already exists, removing (toggle)
        delete newParams[key];
      } else {
        // Query of the same type, exists. Converting to array and adding value
        newParams[key] = [currentParams[key], valueStr];
      }
    } else {
      // Query param doesn't exist, add it!
      newParams[key] = valueStr;
    }
    history.push({
      search: qs.stringify(newParams)
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
    console.log({currentParams});
    if (hasAttributeFilters || hasPriceRange || hasSubCategories) {
      return (
        <aside className="layered-navigation">
          <Title title={categoryName} />
          <div className="header">
            <span className="title">Refine</span>
            <Link to={`/${urlBase}`}>Clear all</Link>
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
                  currentParams={currentParams}
                  toggleQueryHandler={this.toggleQuery}
                />
              );
            }
            if (filterType === 'subcategories') {
              return (
                <SubCategoriesFilter
                  key={filterType}
                  subcategories={filters[filterType]}
                  currentParams={currentParams}
                  toggleQueryHandler={this.toggleQuery}
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
