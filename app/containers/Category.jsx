import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CATEGORY_SLUG } from '../config/app';
import { Head } from '../components/Common/Head';
import { Title } from '../components/Content/Title';
import { Loading } from '../components/Content/Loading';
import { FourOhFour } from '../components/Content/FourOhFour';
import { PostList } from '../components/Posts/PostList.jsx';

class Category extends Component {
  render() {
    const {
      category,
      loading,
      settings,
      match
    } = this.props;
    const { params } = match;
    if (loading) return <Loading />;
    if (!category) return <FourOhFour />;
    const { details, posts } = category;
    return (
      <main className="content" role="main">
        <Head defaultTitle={`${details.name} - ${settings.name}`} />
        <Title title={details.name} />
        <PostList
          posts={posts}
          urlBase={`${CATEGORY_SLUG}/${params.slug}`}
          currentPage={params.page}
         />
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

export default connect(mapStateToProps, { })(Category);
