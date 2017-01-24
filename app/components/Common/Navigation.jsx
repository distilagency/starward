import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Navigation extends Component {
  getSlug(slug, parentSlug) {
    if (slug === 'homepage') {
      return '/';
    }
    if (parentSlug) {
      return `/${parentSlug}/${slug}`;
    }
    return `/${slug}`;
  }
  getClassNames(item, currentPath, parentSlug) {
    const activeSlug = this.getSlug(item.object_slug, parentSlug);
    const isActive = activeSlug === currentPath;
    return isActive ? `active ${item.object_slug} ${item.classes}` : `${item.object_slug} ${item.classes}`;
  }
  renderSubNavigation(subItems, parentSlug, currentPath) {
    return (
      <ul>
        {subItems.map((subItem, index) => (
          <li key={index} className={this.getClassNames(subItem, currentPath, parentSlug)}>
            <Link to={this.getSlug(subItem.object_slug, parentSlug)}>
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
              <Link to={this.getSlug(item.object_slug)}>
                {item.title}
              </Link>
              {item.children ? this.renderSubNavigation(item.children, item.object_slug, currentPath) : null}
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}
