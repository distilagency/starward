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
    initPage: PropTypes.func,
    getPosts: PropTypes.func,
    getPage: PropTypes.func,
  };
  componentWillMount(){
    this.props.initPage();
    this.props.getPage('blog');
    this.props.getPosts();
  }
  componentWillUnmount() {
    this.props.initPage();
  }
  render() {
    const { posts, pages } = this.props;
    const { active_page } = pages;
    const { active_posts, loading, categories } = posts;
    if(loading){
      return <Loading />;
    }
    return(
      <div className="blog">
        <PostList posts={active_posts} categories={categories} />
      </div>

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
