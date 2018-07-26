import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { SEARCH_SLUG } from '../config/app';
import { Head } from '../components/Common/Head';
import { Title } from '../components/Content/Title';
import { Loading } from '../components/Content/Loading';
import { FourOhFour } from '../components/Content/FourOhFour';
import { PostList } from '../components/Posts/PostList';
import SearchForm from '../components/Search/SearchForm';

// eslint-disable-next-line
class Search extends Component {
  render() {
    const {
      search,
      settings,
      loading,
      match,
      history,
      location
    } = this.props;
    const { params } = match;
    if (loading) return <Loading />;
    if (!search) return <FourOhFour />;
    const queries = queryString.parse(location.search);
    return (
      <main className="content" role="main">
        <Head defaultTitle={`${queries.term} - ${settings.name}`} />
        <Title title={`Search results for ${queries.term}`} />
        <SearchForm history={history} />
        <PostList
          posts={search}
          urlBase={SEARCH_SLUG}
          currentPage={params ? params.page : 1}
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
