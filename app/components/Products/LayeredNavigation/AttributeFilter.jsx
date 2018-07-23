import React from 'react';
import { Link } from 'react-router';
import { getQueryString } from './QueryHelper';

export function AttributeFilter({attribute, urlBase, location}) {
  if (attribute.options) {
    return (
      <section className="filter-block">
        <h3>{attribute.label}</h3>
        <ul>
          { attribute.options &&
            attribute.options.map((option, i) => {
              // Clone location query object so that we use the original location.query
              // for each attribute option
              const queryObj = location && Object.assign({}, location.query);
              const queryString = getQueryString(queryObj, attribute.slug, option.term_id);
              // const isActive =
              //   (queryObj.hasOwnProperty(attribute.slug));
              // console.log(isActive);
              return (
                <li key={i}>
                  <Link to={`/${urlBase}${queryString}`}>{option.name}</Link>
                </li>
              );
          })}
        </ul>
      </section>
    );
  }
  return null;
}
