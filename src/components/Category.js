import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Loading } from './Common/Content/Loading';
import { getCategory, initCategory, getAuthor } from '../actions/actions_posts';
import { PostList } from './Posts/PostList';

class Category extends Component {
  static propTypes = {
    posts: PropTypes.object,
    category: PropTypes.object,
    params: PropTypes.object,
    initCategory: PropTypes.func,
    getCategory: PropTypes.func,
    getAuthor: PropTypes.func,
  };
  componentWillMount(){
    this.initComponent(this.props.params);
  }
  componentWillReceiveProps(nextProps){
    if(this.props.params != nextProps.params){
      this.initComponent(nextProps.params);
    }
  }
  initComponent(params){
    const { category, author, page } = params;
    if(category){
      this.props.getCategory(category, page);
    } else{
      this.props.getAuthor(author, page);
    }
  }
  render() {
    const { posts, params } = this.props;
    const {
      active_posts,
      categories,
      total_items,
      total_pages,
      loading
    } = posts;
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
          url_base={params.category ? `category/${params.category}` : `author/${params.author}`}
        />
      </main>

    );
  }
}

const mapStateToProps = ({ posts }) => {
  return {
    posts
  };
};

export default connect(mapStateToProps, { getCategory, initCategory, getAuthor })(Category);
