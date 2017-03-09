import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SEARCH_SLUG } from '../../config/app';
import { Head } from '../components/Common/Head';
import { Title } from '../components/Content/Title';
import { Loading } from '../components/Content/Loading';
import { FourOhFour } from '../components/Content/FourOhFour';
import { PostList } from '../components/Posts/PostList.jsx';
import SearchForm from '../components/Search/SearchForm';

class Search extends Component {
  render() {
    const { search, settings, loading, params } = this.props;
    if (loading) return <Loading />;
    if (!search) return <FourOhFour />;
    const { items, totalItems, totalPages } = search;
    return (
      <main className="content" role="main">
        <Head defaultTitle={`${this.props.location.query.term} - ${settings.name}`} />
        <Title title={`Search results for ${this.props.location.query.term}`} />
        <SearchForm />
        <PostList
          posts={items}
          totalItems={totalItems}
          totalPages={totalPages}
          urlBase={SEARCH_SLUG}
          currentPage={params.page}
         />
      </main>
    );
  }
}

function mapStateToProps({starward, loading}) {
  const { search, settings } = starward;
  return {
    loading,
    settings,
    search
  };
}

export default connect(mapStateToProps, { })(Search);
