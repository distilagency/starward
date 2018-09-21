import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ProductLayout from '../components/Acf/ProductLayout/';
import { Head } from '../components/Common/Head';
import { Loading } from '../components/Content/Loading';
import { FourOhFour } from '../components/Content/FourOhFour';
import { addToCart } from '../actions/cart';
import './Product.scss';

const AcfComponent = (props) => {
  const {
    item,
    product,
    location,
    addToCart  // eslint-disable-line
  } = props;
  const ComponentName = ProductLayout[item.acf_fc_layout];
  return (
    <ComponentName
      location={location}
      product={product}
      addToCart={addToCart}
      {...item}
    />
  );
};

// eslint-disable-next-line
class Product extends Component {
  render() {
    const {
      product,
      loading,
      settings,
      location,
      addToCart, // eslint-disable-line
      page
    } = this.props;
    console.log('Props @ Product container', this.props);
    if (loading) return <Loading />;
    if (!product || !page) return <FourOhFour />;
    const {
      acf,
      title,
      seo,
    } = page;
    const { name } = settings;
    return (
      <main id="page-content" className="product-content" role="main">
        <Head {...seo} defaultTitle={`${title} - ${name}`} />
        <article>
          {acf.layout.map((item, index) => {
            return (
              <AcfComponent
                key={`${item.acf_fc_layout}-${index}`} // eslint-disable-line
                item={item}
                product={product}
                location={location}
                addToCart={addToCart}
              />
            );
          })}
        </article>
      </main>
    );
  }
}

function mapStateToProps({starward, loading}) {
  const { product, settings, page } = starward;
  return {
    loading,
    page,
    product,
    settings
  };
}

export default connect(mapStateToProps, { addToCart })(Product);
