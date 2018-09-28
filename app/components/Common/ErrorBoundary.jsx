import React, { Component } from 'react';
import { ErrorBlock } from './ErrorBlock';

export default class ErrorBoundary extends Component {
  state = {
    hasError: false
  };
  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.error({error, info}); // redundant?
  }
  render() {
    const { hasError } = this.state;
    const errorMessage = 'Whoops, look like something went wrong here!';
    if (hasError) return <ErrorBlock errorMessage={errorMessage} />;
    return this.props.children;
  }
}
