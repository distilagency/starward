import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { initPage, getPage } from '../actions/actions_pages';
import { Loading } from './Common/Content/Loading';
import { getPosts } from '../actions/actions_posts';
import { PostList } from './Posts/PostList';

class Blog extends Component {
  static propTypes = {
    posts: PropTypes.object,
    pages: PropTypes.object,
    params: PropTypes.object,
    initPage: PropTypes.func,
    getPosts: PropTypes.func,
    getPage: PropTypes.func,
  };
  componentWillMount(){
    const page = this.props.params.page ? this.props.params.page : 1;
    this.props.initPage();
    this.props.getPage('blog');
    this.props.getPosts(page);
  }
  componentWillReceiveProps(nextProps){
    if(this.props.params != nextProps.params){
      const page = nextProps.params.page ? nextProps.params.page : 1;
      nextProps.getPosts(page);
    }
  }
  componentWillUnmount() {
    this.props.initPage();
  }
  render() {
    const { posts, pages } = this.props;
    const { active_page } = pages;
    const { active_posts, categories, total_items, total_pages, loading } = posts;
    if(loading){
      return <Loading />;
    }
    return(
      <main className="content" role="main">
        <PostList
          posts={active_posts}
          categories={categories}
          total_items={total_items}
          total_pages={total_pages}
          url_base="blog"
         />
      </main>

    );
  }
}

const mapStateToProps = ({ posts, pages }) => {
  return {
    posts,
    pages
  };
};

export default connect(mapStateToProps, { initPage, getPage, getPosts })(Blog);
