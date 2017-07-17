import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Head } from '../components/Common/Head';
import { Title } from '../components/Content/Title';
import { RenderContent } from '../components/Content/RenderContent';
import { Loading } from '../components/Content/Loading';
import { FourOhFour } from '../components/Content/FourOhFour';
import { PostList } from '../components/Posts/PostList.jsx';
import { fetchMorePosts } from '../actions/fetchMorePosts';

class Blog extends Component {
  render() {
    const { page, blog, settings, loading, params, fetchMorePosts, starwardUpdating } = this.props;
    if (loading) return <Loading />;
    if (!page || !blog) return <FourOhFour />;
    return (
      <main className="content" role="main">
        <Head {...page.seo} defaultTitle={`${page.title} - ${settings.name}`} />
        <Title title={page.title} />
        <RenderContent content={page.content} />
        <PostList
          posts={blog}
          currentPage={params.page}
          starwardUpdating={starwardUpdating}
          fetchMorePosts={fetchMorePosts}
         />
      </main>
    );
  }
}

function mapStateToProps({starward, loading}) {
  const { page, posts, settings, starwardUpdating } = starward;
  return {
    loading,
    starwardUpdating,
    page,
    settings,
    blog: posts
  };
}

export default connect(mapStateToProps, { fetchMorePosts })(Blog);
