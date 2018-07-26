import React from 'react';
import { NavLink } from 'react-router-dom';

export function SubCategoriesFilter(props) {
  const changeSubCategory = (event, slug, termId) => {
    event.preventDefault();
    const { changeQueryHandler } = props;
    changeQueryHandler({ [slug]: termId });
  };
  const { subcategories } = props;
  if (subcategories.length <= 0) return null;
  return (
    <div className="filter-block sub-categories">
      <span className="title">Sub Categories</span>
      <ul>
        { subcategories.map((subcategory) => {
          return (
            <li className="sub-category" key={subcategory.name}>
              <NavLink to="#" onClick={event => changeSubCategory(event, 'category', subcategory.term_id)}>{subcategory.name}</NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
