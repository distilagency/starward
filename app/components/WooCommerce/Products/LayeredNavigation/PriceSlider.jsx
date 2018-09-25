import React from 'react';
import Slider from 'rc-slider';
import './PriceSlider.scss';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

export const PriceSlider = (props) => {
  const changeRange = (newRange, prevRange) => {
    const { changeQueryHandler } = props;
    const prevMinPrice = prevRange[0];
    const prevMaxPrice = prevRange[1];
    const newMinPrice = newRange[0];
    const newMaxPrice = newRange[1];
    if (prevMinPrice !== newMinPrice || prevMaxPrice !== newMaxPrice) {
      changeQueryHandler({ min_price: newMinPrice, max_price: newMaxPrice });
    }
  };
  const { filter, currentParams } = props;
  const { min_price: minPrice, max_price: maxPrice } = filter;
  const rangeMin = minPrice ? parseInt(minPrice) : 0;
  const rangeMax = minPrice ? parseInt(maxPrice) : 0;
  const currMinPrice = currentParams.min_price ? parseInt(currentParams.min_price) : rangeMin;
  const currMaxPrice = currentParams.max_price ? parseInt(currentParams.max_price) : rangeMax;
  const currRange = [currMinPrice, currMaxPrice];
  return (
    <section className="filter-block price-slider">
      <span className="title">Price</span>
      <Range
        min={rangeMin}
        max={rangeMax}
        defaultValue={currRange}
        tipFormatter={value => `$${value}`}
        onAfterChange={newRange => changeRange(newRange, currRange)} />
    </section>
  );
};
