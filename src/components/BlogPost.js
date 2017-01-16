import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { initPost, getPost } from '../actions/actions_posts';
import { FourOhFour } from './Common/Content/FourOhFour';
import { Title } from './Common/Content/Title';
import { RenderContent } from './Common/Content/RenderContent';
import { Loading } from './Common/Content/Loading';
import { FeaturedImage } from './Posts/FeaturedImage';
import { PostMeta } from './Posts/PostMeta';
import { PostCategories } from './Posts/PostCategories';
import { PostItemPagination } from './Posts/PostItemPagination';

class BlogPost extends Component {
  static propTypes = {
    initPost: PropTypes.func,
    getPost: PropTypes.func,
    params: PropTypes.object,
    posts: PropTypes.object,
  };
  componentWillMount() {
    this.props.initPost();
    this.props.getPost(this.props.params.slug);
  }
  componentWillReceiveProps(nextProps){
    if(this.props.params.slug != nextProps.params.slug){
      nextProps.getPost(nextProps.params.slug);
    }
  }
  componentWillUnmount(){
    this.props.initPost();
  }
  render() {
    console.log("Blog Post", this.props);
    const { posts } = this.props;
    const { active_post, loading } = posts;
    const {
      title,
      content,
      slug,
      better_featured_image,
      date,
      author,
      categories,
      next_post,
      previous_post
    } = active_post;
    if(loading){
      return <Loading />;
    }
    if(!slug){
      return <FourOhFour />;
    }
    return (
      <main className="content" role="main">
        <article className="hentry">
          <Title title={title.rendered} />
          <PostMeta date={date} author={author} />
          <FeaturedImage
            size="large"
            {...better_featured_image}
          />
          <RenderContent content={content.rendered} />
          <PostCategories categories={categories} />
          <PostItemPagination
            next_post={next_post}
            previous_post={previous_post}
          />
        </article>
      </main>
    );
  }
}

const mapStateToProps = ({ posts }) => {
  return {
    posts
  };
};

export default connect(mapStateToProps, { initPost, getPost })(BlogPost);
