import React from 'react';
import { NavLink } from 'react-router-dom';
import { getQueryString } from './QueryHelper';

export function SubCategoriesFilter({subcategories, urlBase, location}) {
  if (subcategories.length > 0) {
    return (
      <div className="filter-block sub-categories">
        <span className="title">Sub Categories</span>
        <ul>
          { subcategories.map((subcategory) => {
            // Clone location query object so that we use the original location.query
            // for each attribute option
            const queryObj = location && Object.assign({}, location.query);
            const queryString = getQueryString(queryObj, 'category', subcategory.term_id);
            return (
              <li key={subcategory.name}>
                <NavLink to={`/${urlBase}${queryString}`}>{subcategory.name}</NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  return null;
}
