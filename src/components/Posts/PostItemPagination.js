import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export const PostItemPagination = props => {
  const { previous_post, next_post } = props;
  return (
    <nav>
      <ul>
        {previous_post ? <li><Link to={`/blog/${previous_post.slug}`}>Previous</Link></li> : null}
        {next_post ? <li><Link to={`/blog/${next_post.slug}`}>Next</Link></li> : null}
      </ul>
    </nav>
  );
};

PostItemPagination.propTypes = {
  previous_post: PropTypes.object,
  next_post: PropTypes.object,
};
