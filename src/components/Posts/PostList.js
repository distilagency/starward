import React, { PropTypes } from 'react';
import { Categories } from './Categories';
import { PostListItem } from './PostListItem';
import { Link } from 'react-router';

export const PostList = props => {
  const { posts, categories } = props;
  console.log("Post List", props);
  if(!posts || posts.length < 1){
    return <h3>No Posts Found</h3>;
  }
  return (
    <section className="posts">
      <Categories categories={categories} />
      <section className="posts_list">
        {posts.length < 1 ? <h2>No Posts Found</h2> : null}
        {posts.map((post, index) => <PostListItem key={index} {...post} />)}
      </section>
    </section>
  );
};

PostList.propTypes = {
  posts: PropTypes.array,
  categories: PropTypes.array,
};
