import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BLOG_SLUG } from '../../config/app';
import { Head } from '../components/Common/Head';
import { Title } from '../components/Content/Title';
import { RenderContent } from '../components/Content/RenderContent';
import { Loading } from '../components/Content/Loading';
import { FourOhFour } from '../components/Content/FourOhFour';
import { PostList } from '../components/Posts/PostList.jsx';

class Blog extends Component {
  render() {
    const { page, blog, settings, loading, params } = this.props;
    if (loading) return <Loading />;
    if (!page && !blog) return <FourOhFour />;
    const { activePosts, categories, totalItems, totalPages } = blog;
    return (
      <main className="content" role="main">
        <Head {...page.seo} defaultTitle={`${page.title} - ${settings.name}`} />
        <Title title={page.title} />
        <RenderContent content={page.content} />
        <PostList
          posts={activePosts}
          categories={categories}
          totalItems={totalItems}
          totalPages={totalPages}
          urlBase={BLOG_SLUG}
          currentPage={params.page}
         />
      </main>
    );
  }
}

function mapStateToProps({starward, loading}) {
  const { page, posts, settings } = starward;
  return {
    loading,
    page,
    settings,
    blog: posts
  };
}

export default connect(mapStateToProps, { })(Blog);
