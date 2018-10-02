import React, { Component } from 'react';

// eslint-disable-next-line
export default class Html extends Component {
  render() {
    const {
      field
    } = this.props;
    const {
      content,
      classes
    } = field;
    return (
      // eslint-disable-next-line
      <div className={`html-content ${classes}`} dangerouslySetInnerHTML={{__html: content}} />
    );
  }
}
