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
    const { category, loading, settings, params } = this.props;
    if (loading) return <Loading />;
    if (!category) return <FourOhFour />;
    const { details, posts } = category;
    const { items, totalItems, totalPages } = posts;
    return (
      <main className="content" role="main">
        <Head defaultTitle={`${details.name} - ${settings.name}`} />
        <Title title={details.name} />
        <PostList
          posts={items}
          totalItems={totalItems}
          totalPages={totalPages}
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
