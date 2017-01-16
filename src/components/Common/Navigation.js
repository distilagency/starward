import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Navigation extends Component {
  static propTypes = {
    items: PropTypes.array,
    current_path: PropTypes.string,
  };
  getSlug(slug, parent_slug){
    if(slug === 'homepage'){
      return '/';
    }
    if(parent_slug){
      return `/${parent_slug}/${slug}`;
    }
    return `/${slug}`;
  }
  getClassNames(item, current_path, parent_slug){
    const active_slug = this.getSlug(item.object_slug, parent_slug);
    const isActive = active_slug === current_path;
    return isActive ? `active ${item.object_slug} ${item.classes}` : `${item.object_slug} ${item.classes}`;
  }
  renderSubNavigation(sub_items, parent_slug, current_path){
    return(
      <ul>
        {sub_items.map(sub_item => (
          <li key={sub_item.id} className={this.getClassNames(sub_item, current_path, parent_slug)}>
            <Link to={this.getSlug(sub_item.object_slug, parent_slug)}>
              {sub_item.title}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
  render() {
    const { items, current_path } = this.props;
    return (
      <nav className="nav_banner" role="navigation">
        <ul>
          {items.map(item => (
            <li key={item.id} className={this.getClassNames(item, current_path)}>
              <Link to={this.getSlug(item.object_slug)}>
                {item.title}
              </Link>
              {item.children ? this.renderSubNavigation(item.children, item.object_slug, current_path) : null}
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}
