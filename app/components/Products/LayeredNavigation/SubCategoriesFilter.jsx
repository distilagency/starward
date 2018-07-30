import React from 'react';
import { NavLink } from 'react-router-dom';

export function SubCategoriesFilter(props) {
  const toggleSubCategory = (event, slug, termId) => {
    event.preventDefault();
    const { toggleQueryHandler } = props;
    toggleQueryHandler(slug, termId);
  };
  const { subcategories, currentParams } = props;
  if (subcategories.length <= 0) return null;
  const subCategorySlug = 'category';
  return (
    <div className="filter-block subcategories">
      <span className="title">Subcategories</span>
      <ul className="options">
        { subcategories.map((subcategory) => {
          const termId = subcategory.term_id.toString();
          const keyExists = Object.prototype.hasOwnProperty.call(currentParams, subCategorySlug);
          const isArray = keyExists && Array.isArray(currentParams[subCategorySlug]);
          let isActive = false;
          if (keyExists && isArray) {
           isActive = currentParams[subCategorySlug].includes(termId);
         } else if (keyExists && !isArray) {
           isActive = currentParams[subCategorySlug] === termId;
         }
          return (
            <li className={`option subcategory ${isActive ? 'active' : ''}`} key={subcategory.name}>
              <NavLink to="#" onClick={event => toggleSubCategory(event, subCategorySlug, subcategory.term_id)}>
                <span>{subcategory.name}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
