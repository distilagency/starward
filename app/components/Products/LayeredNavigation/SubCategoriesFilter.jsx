import React from 'react';
import { NavLink } from 'react-router-dom';

export function SubCategoriesFilter(props) {
  const toggleSubCategory = (event, slug, termId) => {
    event.preventDefault();
    const { toggleQueryHandler } = props;
    toggleQueryHandler(slug, termId);
  };
  const { subcategories } = props;
  if (subcategories.length <= 0) return null;
  return (
    <div className="filter-block subcategories">
      <span className="title">Subcategories</span>
      <ul className="options">
        { subcategories.map((subcategory) => {
          return (
            <li className="option subcategory" key={subcategory.name}>
              <NavLink to="#" onClick={event => toggleSubCategory(event, 'category', subcategory.term_id)}>
                <span>{subcategory.name}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
