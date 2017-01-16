import {
  GET_POSTS,
  GET_POSTS_SUCCESS,
  GET_POST,
  GET_POST_SUCCESS,
  GET_CATEGORY,
  GET_CATEGORY_SUCCESS,
  GET_AUTHOR_POSTS,
  GET_AUTHOR_POSTS_SUCCESS
} from './types/types_posts';
import axios from 'axios';

import { API_URL, POSTS_PER_PAGE } from '../config';

export function getPosts(page) {
  return (dispatch) => {
    dispatch({ type: GET_POSTS });
    const page_number = page ? page : 1;
    const wp_posts_url = `${API_URL}/wp/v2/posts?page=${page_number}&per_page=${POSTS_PER_PAGE}`;
    const wp_categories_url = `${API_URL}/wp/v2/categories/`;
    axios.all([
      axios.get(wp_posts_url),
      axios.get(wp_categories_url)
    ])
    .then(([
      posts,
      categories
    ]) => {
      console.log("posts", posts.headers['x-wp-total']);
      dispatch({
        type: GET_POSTS_SUCCESS,
        payload: {
          active_posts: posts.data,
          categories: categories.data,
          total_items: posts.headers['x-wp-total'],
          total_pages: posts.headers['x-wp-totalpages']
        }
      });
    })
    .catch(error => console.error(error));
  };
}

export function initPost(){
  return ({ type: GET_POST });
}

export function getPost(slug){
  return (dispatch) => {
    const wp_post_url = `${API_URL}/wp/v2/posts?slug=${slug}`;
    axios.get(wp_post_url)
    .then(({data}) => {
      dispatch(getRemainingPostData(data[0]));
    })
    .catch(error => console.error(error));
  };
}

function getRemainingPostData(post){
  return (dispatch) => {
    dispatch({ type: GET_POST });
    const wp_posts_url = `${API_URL}/wp/v2/posts/`;
    const wp_author_url = `${API_URL}/wp/v2/users/${post.author}`;
    const wp_categories_url = `${API_URL}/wp/v2/categories/`;
    axios.all([
      axios.get(wp_posts_url),
      axios.get(wp_author_url),
      axios.get(wp_categories_url)
    ])
    .then(([
      posts,
      author,
      categories
    ]) => {
      const active_post_in_arr = posts.data.find(item => item.slug === post.slug);
      const previous_post_index = posts.data.indexOf(active_post_in_arr) + 1;
      const next_post_index = posts.data.indexOf(active_post_in_arr) - 1;
      const postData = {
        ...post,
        author: { ...author.data },
        categories: categories.data.filter(cat => post.categories.indexOf(cat.id) != -1),
        next_post: posts.data[next_post_index],
        previous_post: posts.data[previous_post_index]
      };
      dispatch({ type: GET_POST_SUCCESS, payload: postData});
    })
    .catch(error => console.error(error));
  };
}

export function getCategory(slug, page){
  return (dispatch) => {
    dispatch({ type: GET_CATEGORY });
    const page_number = page ? page : 1;
    const wp_category_url = `${API_URL}/wp/v2/categories?slug=${slug}`;
    axios.get(wp_category_url)
    .then(({data}) => {
      dispatch(getPostsFromCategory(data[0], page_number));
    })
    .catch(error => console.error(error));
  };
}

function getPostsFromCategory(category_data, page){
  return (dispatch) => {
    const wp_cat_posts_url = `${API_URL}/wp/v2/posts?categories=${category_data.id}&page=${page}&per_page=${POSTS_PER_PAGE}`;
    const wp_categories_url = `${API_URL}/wp/v2/categories/`;
    axios.all([
      axios.get(wp_cat_posts_url),
      axios.get(wp_categories_url)
    ])
    .then(([
      posts,
      categories
    ]) => {
      dispatch({
        type: GET_CATEGORY_SUCCESS,
        payload:{
          active_posts: posts.data,
          active_category: category_data,
          categories: categories.data,
          total_items: posts.headers['x-wp-total'],
          total_pages: posts.headers['x-wp-totalpages']
        }
      });
    })
    .catch(error => console.error(error));
  };
}

export function getAuthor(author, page){
  return (dispatch) => {
    dispatch({ type: GET_AUTHOR_POSTS });
    const page_number = page ? page : 1;
    const wp_author_url = `${API_URL}/wp/v2/users?name=${author}`;
    axios.get(wp_author_url)
    .then(({data}) => {
      dispatch(getPostsFromAuthor(data[0], page_number));
    })
    .catch(error => console.error(error));
  };
}

function getPostsFromAuthor(author_data, page){
  return (dispatch) => {
    const wp_author_posts_url = `${API_URL}/wp/v2/posts?author=${author_data.id}&page=${page}&per_page=${POSTS_PER_PAGE}`;
    axios.get(wp_author_posts_url)
    .then(data => {
      dispatch({
        type: GET_AUTHOR_POSTS_SUCCESS,
        payload: {
          active_author: author_data,
          active_posts: data.data,
          total_items: data.headers['x-wp-total'],
          total_pages: data.headers['x-wp-totalpages']
        }
      });
    })
    .catch(error => console.error(error));
  };
}
