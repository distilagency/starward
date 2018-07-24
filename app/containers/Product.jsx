import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Head } from '../components/Common/Head';
import { Title } from '../components/Content/Title';
import { Loading } from '../components/Content/Loading';
import { FourOhFour } from '../components/Content/FourOhFour';

import { ShortDescription } from '../components/Product/ShortDescription';
import { Gallery } from '../components/Product/Gallery';
import { Price } from '../components/Product/Price';
import { OptionsForm } from '../components/Product/OptionsForm';
import { RelatedProducts } from '../components/Product/RelatedProducts';
import { Tabs } from '../components/Product/Tabs';

import { addToCart } from '../actions/cart';

import './Product.scss';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptions: {}
    };
  }

  optionSelectionHandler = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const { selectedOptions } = this.state;
    selectedOptions[name] = value;
    this.setState({ selectedOptions });
  }

  addToCartHandler = (event, productId, quantity) => {
    event.preventDefault();
    const { addToCart } = this.props;
    addToCart(productId, quantity);
  }

  render() {
    const {
      product,
      loading,
      settings,
      match
    } = this.props;
    const { params } = match;
    if (loading) return <Loading />;
    if (!product) return <FourOhFour />;
    // Extract data from product details response
    const {
      sku,
      name,
      description,
      short_description: shortDescription,
      images,
      price,
      regular_price: regularPrice,
      sale_price: salePrice,
      attributes,
      type,
      relatedProducts,
      variations,
      variation_attributes: variationAttributes,
      id,
      // slug,
      // price_html: priceHtml,
      in_stock: inStock,
      // stock_quantity: stockQuantity,
      // catalog_visibility: catalogVisibility,
    } = product;
    const baseImage = images.length > 0 ? images[0] : null;

    return (
      <main className="product-page content" role="main">
        <Head defaultTitle={`${name} - ${settings.name}`} />
        <div className="wrap">
          <Gallery
            baseImage={baseImage}
            images={images}
            selectedOptions={this.state.selectedOptions}
            variations={variations} />
          <Title title={name} />
          <p
            className="sku"
            dangerouslySetInnerHTML={{__html: sku}} />
          <ShortDescription text={shortDescription} />
          <Price
            price={price}
            regularPrice={regularPrice}
            salePrice={salePrice}
            productType={type} />
          <OptionsForm
            id={id}
            attributes={attributes}
            variationAttributes={variationAttributes}
            productType={type}
            callback={this.optionSelectionHandler}
            addToCartHandler={this.addToCartHandler}
            inStock={inStock}
          />
          <Tabs description={description} />
          <RelatedProducts relatedProducts={relatedProducts} />
        </div>
      </main>
    );
  }
}

function mapStateToProps({starward, loading}) {
  const { product, settings } = starward;
  return {
    loading,
    product,
    settings
  };
}

export default connect(mapStateToProps, { addToCart })(Product);
