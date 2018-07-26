import React, { PropTypes } from 'react';
import { NavLink } from 'react-router-dom';

const NavigationLink = ({ item }) => {
  // External Link Case
  if (item.classes && item.classes.indexOf('external') !== -1) {
    return (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        dangerouslySetInnerHTML={{__html: item.title}}
      />
    );
  }
  // Internal Link Case
  return (
    <NavLink
      to={item.url}
      activeClassName="active"
      aria-current="true"
      dangerouslySetInnerHTML={{__html: item.title}}
    />
  );
};

const SubNavigation = ({ items }) => {
  return (
    <ul>
      {items.map(child => (
        <li key={child.order} className={`${child.classes}`}>
          <NavigationLink item={child} />
        </li>
      ))}
    </ul>
  );
};

export const Navigation = (props) => {
  const { items } = props;
  return (
    <nav className="nav_banner" role="navigation">
      <ul>
        {items.map(item => (
          <li key={item.order} className={`${item.classes}`}>
            <NavigationLink item={item} />
            {item.children && item.children.length > 0 && <SubNavigation items={item.children} />}
          </li>
        ))}
      </ul>
    </nav>
  );
};
