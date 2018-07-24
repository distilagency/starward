import React from 'react';
import { NavLink } from 'react-router-dom';
import { getQueryString } from './QueryHelper';


export const AttributeFilter = (props) => {
  const { attribute, urlBase, location } = props;
  if (!attribute.options) return null;
  return (
    <section className="filter-block">
      <h3>{attribute.label}</h3>
      <ul>
        { attribute.options &&
          attribute.options.map((option) => {
            // Clone location query object so that we use the original location.query
            // for each attribute option
            const queryObj = location && Object.assign({}, location.query);
            const queryString = getQueryString(queryObj, attribute.slug, option.term_id);
            // const isActive =
            //   (queryObj.hasOwnProperty(attribute.slug));
            // console.log(isActive);
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
