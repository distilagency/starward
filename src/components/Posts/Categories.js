import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export const Categories = props => {
  const { categories } = props;
  if(!categories){
    return <span></span>;
  }
  return (
    <nav className="posts_categories">
      <ul>
        {categories.map(category => (
          <Link key={category.slug} to={`/category/${category.slug}`}>
            <li>{category.name}</li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

Categories.propTypes = {
  categories: PropTypes.array
}
