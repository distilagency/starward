import React from 'react';
import { browserHistory } from 'react-router';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

const { createSliderWithTooltip, Handle } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const handle = (props) => {
  const {
    value,
    dragging,
    index,
    ...restProps
  } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

// handleChange = (value) => {
//   const { location } = this.props;
//   const newMinPrice = value[0];
//   const newMaxPrice = value[1];
//   browserHistory.push({
//     ...location,
//     query: {
//       ...location.query,
//       min_price: newMinPrice,
//       max_price: newMaxPrice
//     }
//   });
// }

export const PriceSlider = (props) => {
  const { filter, index, location } = props;
  const { min_price, max_price } = filter;
  const minPrice = parseInt(min_price);
  const maxPrice = parseInt(max_price);
  // const hasPricesInQueryParams = ('min_price' in location.query) || ('max_price' in location.query);
  // const queryMinPrice = hasPricesInQueryParams ? parseInt(location.query.min_price) : null;
  // const queryMaxPrice = hasPricesInQueryParams ? parseInt(location.query.max_price) : null;
  if (!filter || minPrice === maxPrice) return null;
  return (
    <section className="filter-block" key={index}>
      <h3>Price</h3>
      <Slider min={0} max={20} defaultValue={3} handle={handle} />
    </section>
  );
};
