import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export const PostMeta = props => {
  const { date, author } = props;
  return (
    <div className="entry-meta">
      <time className="updated" dateTime={moment(date).format('YYYY-MM-DD HH:mm')}>
        Posted {moment(date).calendar()}
      </time>
      {author ?
        <p className="byline author vcard">
          By <Link to={`/author/${author.slug}`} rel="author" className="fn">{author.name}</Link>
        </p>
      : <span /> }
    </div>
  );
};

PostMeta.propTypes = {
  date: PropTypes.string,
  author: PropTypes.object,
};
