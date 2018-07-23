import React from 'react';
import { AttributeFilter } from './AttributeFilter';

export const AttributeFilters = (props) => {
  const {
    filters,
    filterType,
    urlBase,
    location
  } = props;
  // For attributes we loop over all attributes and render each one in its
  // own separate filter block
  return Object.keys(filters[filterType]).map((attribute) => {
    const attributeDetails = filters[filterType][attribute];
    return (
      <AttributeFilter
        attribute={attributeDetails}
        urlBase={urlBase}
        location={location}
        key={attribute}
      />
    );
  });
};
