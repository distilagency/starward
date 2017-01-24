import React from 'react';
import { Link } from 'react-router';
import { FeaturedImage } from './FeaturedImage';
import { Title } from '../Content/Title';
import { RenderContent } from '../Content/RenderContent';

export const PostListItem = props => {
  const {
    title,
    excerpt,
    slug,
    featuredImage
  } = props;
  return (
    <article className="hentry">
      <Link to={`/blog/${slug}`}>
        <FeaturedImage size="thumbnail" {...featuredImage} />
        <Title title={title} tag="h3" />
        <RenderContent content={excerpt} />
      </Link>
    </article>
  );
};
