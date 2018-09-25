import React, { Component } from 'react';
import { ProductListItem } from '../Products/ProductListItem';
import './RelatedProducts.scss';

export default class RelatedProducts extends Component {
  state = {
    activeProductIndex: false
  }
  selectProduct = (event, selectedProductIndex) => {
    if (event) event.preventDefault();
    const { activeProductIndex } = this.state;
    if (activeProductIndex !== selectedProductIndex) {
      this.setState({ activeProductIndex: selectedProductIndex });
    } else {
      this.setState({ activeProductIndex: false });
    }
  }
  render() {
    const {
      relatedProducts,
      title,
      addToCartHandler
    } = this.props;
    const { activeProductIndex } = this.state;
    if (!relatedProducts || relatedProducts.length < 1) return null;
    return (
      <section className="related-products">
        <div className="wrap">
          <h2 className="title">{title}</h2>
          <ul className="related-products-list">
            {relatedProducts && relatedProducts.map((relatedProduct, index) => (
              <ProductListItem
                {...relatedProduct}
                active={index === activeProductIndex}
                addToCartHandler={addToCartHandler}
                onClick={event => this.selectProduct(event, index)}
              />
            ))}
          </ul>
        </div>
      </section>
    );
  }
}
