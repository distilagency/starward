import React, { Component } from 'react';
import { ErrorBlock } from './ErrorBlock';

export default class ErrorBoundary extends Component {
  state = {
    hasError: false
  };
  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.error({error, info});
  }
  render() {
    const { hasError } = this.state;
    if (hasError) return <ErrorBlock />;
    return this.props.children;
  }
}
