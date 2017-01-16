import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Loading } from './Common/Content/Loading';
import { getCategory, initCategory } from '../actions/actions_posts';
import { PostList } from './Posts/PostList';

class Category extends Component {
  static propTypes = {
    posts: PropTypes.object,
    category: PropTypes.object,
    params: PropTypes.object,
    initCategory: PropTypes.func,
    getCategory: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = { page: 1 };
  }
  componentWillMount(){
    this.props.getCategory(this.props.params.slug, this.state.page);
  }
  componentWillReceiveProps(nextProps){
    if(this.props.params.slug != nextProps.params.slug)
    nextProps.getCategory(nextProps.params.slug, this.state.page);
  }
  render() {
    const { posts } = this.props;
    const { active_posts, loading, categories } = posts;
    if(loading){
      return <Loading />;
    }
    return(
      <div className="blog">
        <PostList
          posts={active_posts}
          categories={categories}
        />
      </div>

    );
  }
}

const mapStateToProps = ({ posts }) => {
  return {
    posts
  };
};

export default connect(mapStateToProps, { getCategory, initCategory })(Category);
