import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AUTHOR_SLUG } from '../config/app';
import { Head } from '../components/Common/Head';
import { Title } from '../components/Content/Title';
import { Loading } from '../components/Content/Loading';
import { FourOhFour } from '../components/Content/FourOhFour';
import { PostList } from '../components/Posts/PostList.jsx';

// eslint-disable-next-line
class Category extends Component {
  render() {
    const {
      author,
      settings,
      loading,
      match
    } = this.props;
    const { params } = match;
    if (loading) return <Loading />;
    if (!author) return <FourOhFour />;
    const { details, posts } = author;
    return (
      <main className="content" role="main">
        <Head deafultTitle={`Posts by ${details.name} - ${settings.name}`} />
        <Title title={`Posts by ${details.name}`} />
        <PostList
          posts={posts}
          urlBase={`${AUTHOR_SLUG}/${params.name}`}
          currentPage={params.page}
         />
      </main>
    );
  }
}

function mapStateToProps({starward, loading}) {
  const { author, settings } = starward;
  return {
    loading,
    author,
    settings
  };
}

export default connect(mapStateToProps, { })(Category);
