import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export const PostCategories = props => {
  const { categories } = props;
  const getPostCategories = (cats) => (
    cats.map(cat => (
      <Link key={cat.slug} to={`/category/${cat.slug}`}>{cat.name}</Link>
    ))
  );
  return (
    <div classNames="entry-categories">
      <p>Posted in: {getPostCategories(categories)}</p>
    </div>
  );
};

PostCategories.propTypes = {
  categories: PropTypes.array,
};
