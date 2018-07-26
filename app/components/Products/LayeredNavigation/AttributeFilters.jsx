import React from 'react';
import { NavLink } from 'react-router-dom';

const AttributeFilter = (props) => {
  const selectFilter = (event, slug, termId) => {
    event.preventDefault();
    const { changeQueryHandler } = props;
    changeQueryHandler({ [slug]: termId });
  };
  const { attribute } = props;
  if (!attribute.options) return null;
  return (
    <div className={`filter-block ${attribute.slug}`}>
      <span className="title">{attribute.label}</span>
      <ul>
        { attribute.options &&
          attribute.options.map((option) => {
            return (
              <li key={option.name}>
                <NavLink to="#" onClick={event => selectFilter(event, attribute.slug, option.term_id)}>{option.name}</NavLink>
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
    changeQueryHandler
  } = props;
  return Object.keys(filters[filterType]).map((attribute) => {
    const attributeDetails = filters[filterType][attribute];
    return (
      <AttributeFilter
        attribute={attributeDetails}
        changeQueryHandler={changeQueryHandler}
      />
    );
  });
};
