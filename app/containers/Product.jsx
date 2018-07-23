import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { WP_URL } from '../../server/config/app';
import { STORE_PRODUCTS_SLUG } from '../config/app';

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

import './Product.scss';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptions: {}
    };
  }

  optionSelectionHandler = (e) => {
    const optionName = e.target.name;
    const optionValue = e.target.value;
    const { selectedOptions } = this.state;
    selectedOptions[optionName] = optionValue;
    this.setState({ selectedOptions });
  }

  render() {
    const { product, loading, settings, params, location } = this.props;
    if (loading) return <Loading />;
    if (!product) return <FourOhFour />;
    // Extract data from product details response
    const {
      sku,
      id,
      name,
      slug,
      description,
      short_description: shortDescription,
      images,
      price,
      regular_price: regularPrice,
      sale_price: salePrice,
      // price_html: priceHtml,
      attributes,
      in_stock: inStock,
      stock_quantity: stockQuantity,
      type,
      // catalog_visibility: catalogVisibility,
      relatedProducts,
      variations,
      variation_attributes: variationAttributes
    } = product;
    const baseImage = images.length > 0 ? images[0] : null;

    return (
      <main className="content" role="main">
        <Head defaultTitle={`${name} - ${settings.name}`} />
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
          attributes={attributes}
          variationAttributes={variationAttributes}
          productType={type}
          callback={this.optionSelectionHandler} />
        <Tabs description={description} />
        <RelatedProducts relatedProducts={relatedProducts} />
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

export default connect(mapStateToProps, { })(Product);
