import {
  GET_POSTS,
  GET_POSTS_SUCCESS,
  GET_POST,
  GET_POST_SUCCESS,
  GET_CATEGORY,
  GET_CATEGORY_SUCCESS
} from './types/types_posts';
import axios from 'axios';

import { API_URL } from '../config';

export function getPosts(page) {
  return (dispatch) => {
    dispatch({ type: GET_POSTS });
    const page_number = page ? page : 1;
    const wp_posts_url = `${API_URL}/wp/v2/posts?page=${page_number}`;
    const wp_categories_url = `${API_URL}/wp/v2/categories/`;
    axios.all([
      axios.get(wp_posts_url),
      axios.get(wp_categories_url)
    ])
    .then(([
      posts,
      categories
    ]) => {
      dispatch({
        type: GET_POSTS_SUCCESS,
        payload: {
          posts: posts.data,
          categories: categories.data
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

export function initCategory(){
  return ({ type: GET_CATEGORY });
}

export function getCategory(slug, page){
  return (dispatch) => {
    dispatch({ type: GET_CATEGORY });
    const page_number = page ? page : 1;
    const wp_category_url = `${API_URL}/wp/v2/categories?slug=${slug}`;
    axios.get(wp_category_url)
    .then(({data}) => {
      dispatch(getPostsFromCategory(data[0], page));
    })
    .catch(error => console.error(error));
  };
}

function getPostsFromCategory(category_data, page){
  return (dispatch) => {
    const wp_cat_posts_url = `${API_URL}/wp/v2/posts?categories=${category_data.id}&page=${page}`;
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
          posts: posts.data,
          categories: categories.data,
          category: category_data
        }
      });
    })
    .catch(error => console.error(error));
  };
}
