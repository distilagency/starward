import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navigation extends Component {
  getLink(item) {
    // External Link Case
    if (item.classes && item.classes.indexOf('external') !== -1) {
      return <a href={item.url} target="_blank" rel="noopener noreferrer" dangerouslySetInnerHTML={{__html: item.title}} />;
    }
    // Internal Link Case
    return <Link to={item.url} activeClassName="active" dangerouslySetInnerHTML={{__html: item.title}} />;
  }
  renderSubNavigation(subItems) {
    return (
      <ul>
        {subItems.map((subItem, index) => (
          <li key={index} className={`${subItem.classes}`}>
            {this.getLink(subItem)}
          </li>
        ))}
      </ul>
    );
  }
  render() {
    const { items } = this.props;
    return (
      <nav className="nav_banner" role="navigation">
        <ul>
          {items.map((item, index) => (
            <li key={index} className={`${item.classes}`}>
              {this.getLink(item)}
              {item.children && item.children.length > 0 ? this.renderSubNavigation(item.children) : null}
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}
