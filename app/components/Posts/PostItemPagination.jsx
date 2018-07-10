import React from 'react';
import { Link } from 'react-router-dom';

export const PostItemPagination = (props) => {
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
