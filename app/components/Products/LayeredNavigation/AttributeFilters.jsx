import React from 'react';
import { NavLink } from 'react-router-dom';

const AttributeFilter = (props) => {
  const selectFilter = (event, slug, termId) => {
    event.preventDefault();
    const { toggleQueryHandler } = props;
    toggleQueryHandler(slug, termId);
  };
  const { attribute, currentParams } = props;
  if (!attribute.options) return null;
  return (
    <div className={`filter-block ${attribute.slug}`}>
      <span className="title">{attribute.label}</span>
      <ul className="options">
        { attribute.options &&
          attribute.options.map((option) => {
            const termId = option.term_id.toString();
            const keyExists = Object.prototype.hasOwnProperty.call(currentParams, attribute.slug);
            const isArray = keyExists && Array.isArray(currentParams[attribute.slug]);
            let isActive = false;
            if (keyExists && isArray) {
             isActive = currentParams[attribute.slug].includes(termId);
           } else if (keyExists && !isArray) {
             isActive = currentParams[attribute.slug] === termId;
           }
            return (
              <li className={`option ${isActive ? 'active' : ''}`} key={option.name}>
                <NavLink to="#" onClick={event => selectFilter(event, attribute.slug, option.term_id)}>
                  <span>{option.name}</span>
                </NavLink>
              </li>
            );
        })}
      </ul>
    </div>
  );
};

export const AttributeFilters = (props) => {
  const {
    filters,
    filterType,
    currentParams,
    toggleQueryHandler
  } = props;
  return Object.keys(filters[filterType]).map((attribute) => {
    const attributeDetails = filters[filterType][attribute];
    return (
      <AttributeFilter
        key={attributeDetails.slug}
        attribute={attributeDetails}
        currentParams={currentParams}
        toggleQueryHandler={toggleQueryHandler}
      />
    );
  });
};
