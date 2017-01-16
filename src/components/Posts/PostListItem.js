import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FeaturedImage } from './FeaturedImage';
import { Title } from '../Common/Content/Title';
import { RenderContent } from '../Common/Content/RenderContent';

export const PostListItem = props => {
  const {
    title,
    categories,
    excerpt,
    slug,
    better_featured_image
  } = props;
  return (
    <article className="hentry">
      <Link to={`/blog/${slug}`}>
        <FeaturedImage size="thumbnail" {...better_featured_image} />
        <Title title={title.rendered} tag="h3" />
        <RenderContent content={excerpt.rendered} />
      </Link>
    </article>
  );
};

PostListItem.propTypes = {
  title: PropTypes.object,
  better_featured_image: PropTypes.object,
  categories: PropTypes.array,
  excerpt: PropTypes.object,
  slug: PropTypes.string,
};
