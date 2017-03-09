import React, { Component } from 'react';
import { browserHistory } from 'react-router';

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
  }
  componentWillUnmount() {
    this.setState({search: ''});
  }
  searchInputHandler(event) {
    const search = event.target.value;
    this.setState({search});
  }
  search(event) {
    event.preventDefault();
    browserHistory.push(`/search?term=${this.state.search}`);
  }
  render() {
    return (
      <div className="search-form">
        <form role="search" method="get" id="searchform" className="searchform" onSubmit={(event) => this.search(event)}>
          <div>
            <label htmlFor="search">Search</label>
            <input type="text" placeholder="Search" onChange={(event) => this.searchInputHandler(event)} name="search" id="search" />
          </div>
        </form>
      </div>
    );
  }
}
