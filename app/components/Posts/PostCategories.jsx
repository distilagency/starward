import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';

export const PostCategories = props => {
  const { categories } = props;
  if (!categories) return null;
  const getPostCategories = (cats) => (
    cats.map(cat => (
      <Link key={cat.slug} to={`/category/${cat.slug}`}>{cat.name}</Link>
    ))
  );
  return (
    <div className="entry-categories">
      <p>Posted in: {getPostCategories(categories)}</p>
    </div>
  );
};

PostCategories.propTypes = {
  categories: PropTypes.array,
};
