import {
  GET_PAGE,
  GET_PAGE_SUCCESS
} from './types/types_pages';
import axios from 'axios';

import { API_URL } from '../config';

export function initPage(){
  return ({ type: GET_PAGE });
}

export function getPage(slug) {
  return (dispatch) => {
    const wp_pages_url = `${API_URL}/wp/v2/pages?slug=${slug}`;
    axios.get(wp_pages_url)
    .then(({data}) => {
      dispatch({
        type: GET_PAGE_SUCCESS,
        payload: {
          layout: data[0].acf.layout,
          content: data[0].content.rendered,
          page_title: data[0].title.rendered,
          seo: data[0].yoast
        }
      });
    })
    .catch(error => console.error(error));
  };
}
