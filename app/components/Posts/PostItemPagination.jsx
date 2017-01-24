import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export const PostItemPagination = props => {
  const { previous, next } = props;
  return (
    <nav>
      <ul>
        {previous ? <li><Link to={`/blog/${previous.slug}`}>Previous</Link></li> : null}
        {next ? <li><Link to={`/blog/${next.slug}`}>Next</Link></li> : null}
      </ul>
    </nav>
  );
};

PostItemPagination.propTypes = {
  previous_post: PropTypes.object,
  next_post: PropTypes.object,
};
