import React, { Component } from 'react';
import { Link } from 'react-router';
import { getSlug } from '../../utils/wpHelpers';

export default class Navigation extends Component {
  getClassNames(item, currentPath) {
    const isActive = getSlug(item.url) === currentPath;
    return isActive ? `active ${item.classes}` : `${item.classes}`;
  }
  getLink(item) {
    // External Link Case
    if (item.classes && item.classes.indexOf('external') !== -1) {
      return <a href={`${getSlug(item.url)}`} target="_blank" rel="noopener noreferrer">{item.title.replace(/&#038;/g, '&')}</a>;
    }
    // Internal Link Case
    return <Link to={`${getSlug(item.url)}`}>{item.title.replace(/&#038;/g, '&')}</Link>;
  }
  renderSubNavigation(subItems, currentPath) {
    return (
      <ul>
        {subItems.map((subItem, index) => (
          <li key={index} className={this.getClassNames(subItem, currentPath)}>
            <Link to={`${getSlug(subItem.url)}`}>
              {this.getLink(subItem)}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
  render() {
    const { items, currentPath } = this.props;
    return (
      <nav className="nav_banner" role="navigation">
        <ul>
          {items.map((item, index) => (
            <li key={index} className={this.getClassNames(item, currentPath)}>
              <Link to={`${getSlug(item.url)}`}>
                {this.getLink(item)}
              </Link>
              {item.children && item.children.length > 0 ? this.renderSubNavigation(item.children, currentPath) : null}
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}
