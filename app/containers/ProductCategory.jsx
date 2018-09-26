import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHOP_SLUG } from '../config/app';
import LayeredNavigation from '../components/WooCommerce/Products/LayeredNavigation/LayeredNavigation';
import { Head } from '../components/Common/Head';
import { Loading } from '../components/Content/Loading';
import { FourOhFour } from '../components/Content/FourOhFour';
import { ProductList } from '../components/WooCommerce/Products/ProductList';

import './ProductCategory.scss';

class ProductCategory extends Component {
  constructor(props) {
    super(props);
    const { category } = this.props;
    const { products } = category;
    this.state = {
      products
    };
  }
  componentWillReceiveProps(newProps) {
    const { category } = newProps;
    const { products } = category;
    this.setState({
      products
    });
  }
  render() {
    const {
      category,
      loading,
      settings,
      match,
      location
    } = this.props;
    const { products } = this.state;
    const { params } = match;
    const { details, filters } = category;
    const urlBase = `${SHOP_SLUG}/${params.category}`;
    if (loading && !products) return <Loading />;
    if (!category || !details) return <FourOhFour />;
    return (
      <main className="product-category-page content" role="main">
        <Head defaultTitle={`${details.name} - ${settings.name}`} />
        <div className="wrap">
          <LayeredNavigation
            categoryName={details.name}
            location={location}
            filters={filters}
            urlBase={urlBase}
          />
          <ProductList
            products={products}
            urlBase={urlBase}
            currentPage={params.page}
            loading={loading}
          />
        </div>
      </main>
    );
  }
}

function mapStateToProps({starward, loading}) {
  const { category, settings } = starward;
  return {
    loading,
    category,
    settings
  };
}

export default connect(mapStateToProps, { })(ProductCategory);
