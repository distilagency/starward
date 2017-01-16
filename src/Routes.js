import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Home from './components/Home';
import Page from './components/Page';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import Category from './components/Category';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/blog" component={Blog}/>
    <Route path="/blog/page/:page" component={Blog}/>
    <Route path="/blog/:slug" component={BlogPost}/>
    <Route path="/category/:category" component={Category}/>
    <Route path="/category/:category/page/:page" component={Category}/>
    <Route path="/author/:author" component={Category}/>
    <Route path="/author/:author/page/:page" component={Category}/>
    <Route path="*" component={Page}/>
  </Route>
);
