import React, { Component } from 'react';
import { connect } from 'react-redux';
import { STORE_SLUG } from '../config/app';
import { Head } from '../components/Common/Head';
import { Title } from '../components/Content/Title';
import { Loading } from '../components/Content/Loading';
import { FourOhFour } from '../components/Content/FourOhFour';

import { ProductList } from '../components/Products/ProductList';
import { LayeredNavigation } from '../components/Products/LayeredNavigation/LayeredNavigation';

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
    const { params } = match;
    const { details, filters } = category;
    if (loading) return <Loading />;
    if (!category) return <FourOhFour />;
    return (
      <main className="product-category-page content" role="main">
        <Head defaultTitle={`${details.name} - ${settings.name}`} />
        <Title title={details.name} />
        <div className="wrap">
          <LayeredNavigation
            location={location}
            filters={filters}
            urlBase={`${STORE_SLUG}/${params.category}`}
          />
          <ProductList
            products={this.state.products}
            urlBase={`${STORE_SLUG}/${params.category}`}
            currentPage={params.page}
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
