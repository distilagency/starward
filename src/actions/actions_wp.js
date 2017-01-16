import {
  GET_MENU,
  GET_SETTINGS
} from './types/types_wp';
import axios from 'axios';

import { API_URL } from '../config';

export function getSettings(){
  return (dispatch) => {
    const wp_settings_url = `${API_URL}`;
    axios.get(wp_settings_url)
    .then(({data}) => {
      const { name, description, home, url } = data;
      dispatch({ type: GET_SETTINGS, payload: {name, description, home, url} });
    })
    .catch(error => console.error(error));
  };
}

export function getMenu(slug) {
  return (dispatch) => {
    const wp_menus_url = `${API_URL}/wp-api-menus/v2/menus/`;
    axios.get(wp_menus_url)
    .then(({data}) => {
      const nav_object = data.filter(item => item.name === slug)[0];
      const nav_id = nav_object.ID;
      axios.get(wp_menus_url + nav_id)
      .then(({data}) => dispatch({type: GET_MENU, payload: data.items}))
      .catch(error => console.error(error));
    })
    .catch(error => console.error(error));
  };
}
