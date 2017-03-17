import React, { Component } from 'react';
import { Link } from 'react-router';
import { getSlug } from '../../utils/wpHelpers';

export default class Navigation extends Component {
  getClassNames(item, currentPath) {
    const isActive = getSlug(item.url) === currentPath;
    return isActive ? `active ${item.classes}` : `${item.classes}`;
  }
  renderSubNavigation(subItems, currentPath) {
    return (
      <ul>
        {subItems.map((subItem, index) => (
          <li key={index} className={this.getClassNames(subItem, currentPath)}>
            <Link to={`${getSlug(subItem.url)}`}>
              {subItem.title}
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
                {item.title}
              </Link>
              {item.children && item.children.length > 0 ? this.renderSubNavigation(item.children, currentPath) : null}
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}
