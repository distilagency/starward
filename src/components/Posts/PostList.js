import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Categories } from './Categories';
import { PostListItem } from './PostListItem';
import { Pagination } from './Pagination';

export const PostList = props => {
  const { posts, categories, total_items, total_pages, url_base } = props;
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
      <Pagination
        total_items={total_items}
        total_pages={total_pages}
        url_base={url_base}
      />
    </section>
  );
};

PostList.propTypes = {
  posts: PropTypes.array,
  categories: PropTypes.array,
  total_items: PropTypes.string,
  total_pages: PropTypes.string,
};
