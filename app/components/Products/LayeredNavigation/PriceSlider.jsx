import React, { Component } from 'react';
import { withRouter } from 'react-router';
import qs from 'query-string';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import './PriceSlider.scss';

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

class PriceSlider extends Component {
  handleChange = (newRange) => {
    const { history, location } = this.props;
    const newMinPrice = newRange[0];
    const newMaxPrice = newRange[1];
    const currentParams = qs.parse(location.search);
    history.push({
      search: qs.stringify({
        ...currentParams,
        min_price: newMinPrice,
        max_price: newMaxPrice
      })
    });
  }

  render() {
    const { filter, location } = this.props;
    const { min_price: minPrice, max_price: maxPrice } = filter;
    const rangeMin = minPrice ? parseInt(minPrice) : 0;
    const rangeMax = minPrice ? parseInt(maxPrice) : 0;
    const queryParams = qs.parse(location.search);
    const currMinPrice = queryParams.min_price ? parseInt(queryParams.min_price) : rangeMin;
    const currMaxPrice = queryParams.max_price ? parseInt(queryParams.max_price) : rangeMax;
    return (
      <section className="filter-block price-slider">
        <span className="title">Price</span>
        <Range min={rangeMin} max={rangeMax} defaultValue={[currMinPrice, currMaxPrice]} tipFormatter={value => `$${value}`} onAfterChange={newRange => this.handleChange(newRange)} />
      </section>
    );
  }
}

export default withRouter(PriceSlider);
