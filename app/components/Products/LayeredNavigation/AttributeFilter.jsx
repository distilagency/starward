import React from 'react';
import { NavLink } from 'react-router-dom';
import { getQueryString } from './QueryHelper';


export const AttributeFilter = (props) => {
  const { attribute, urlBase, location } = props;
  if (!attribute.options) return null;
  return (
    <section className={`filter-block ${attribute.slug}`}>
      <span className="title">{attribute.label}</span>
      <ul>
        { attribute.options &&
          attribute.options.map((option) => {
            const queryObj = location && Object.assign({}, location.query);
            const queryString = getQueryString(queryObj, attribute.slug, option.term_id);
            return (
              <li key={option.name}>
                <NavLink to={`/${urlBase}${queryString}`}>{option.name}</NavLink>
              </li>
            );
        })}
      </ul>
    </section>
  );
};
