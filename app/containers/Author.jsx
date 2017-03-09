import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AUTHOR_SLUG } from '../../config/app';
import { Head } from '../components/Common/Head';
import { Title } from '../components/Content/Title';
import { Loading } from '../components/Content/Loading';
import { FourOhFour } from '../components/Content/FourOhFour';
import { PostList } from '../components/Posts/PostList.jsx';

class Category extends Component {
  render() {
    const { author, settings, loading, params } = this.props;
    if (loading) return <Loading />;
    if (!author) return <FourOhFour />;
    const { details, posts } = author;
    const { items, totalItems, totalPages } = posts;
    return (
      <main className="content" role="main">
        <Head deafultTitle={`Posts by ${details.name} - ${settings.name}`} />
        <Title title={details.name} />
        <PostList
          posts={items}
          totalItems={totalItems}
          totalPages={totalPages}
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
