import React, { Component } from 'react';
import { Link } from 'react-router';
import { getWPSlug } from '../../utils/getWPSlug';

export default class Navigation extends Component {
  getClassNames(item, currentPath) {
    const isActive = getWPSlug(item.url) === currentPath;
    return isActive ? `active ${item.classes}` : `${item.classes}`;
  }
  renderSubNavigation(subItems, currentPath) {
    return (
      <ul>
        {subItems.map((subItem, index) => (
          <li key={index} className={this.getClassNames(subItem, currentPath)}>
            <Link to={`${getWPSlug(subItem.url)}`}>
              {subItem.title}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
  render() {
    const { items, currentPath } = this.props;
    console.log('currentPath', currentPath);
    console.log('items', items);
    return (
      <nav className="nav_banner" role="navigation">
        <ul>
          {items.map((item, index) => (
            <li key={index} className={this.getClassNames(item, currentPath)}>
              <Link to={`${getWPSlug(item.url)}`}>
                {item.title}
              </Link>
              {item.children ? this.renderSubNavigation(item.children, currentPath) : null}
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}
