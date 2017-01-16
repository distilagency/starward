import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import WPReducer from './reducer_wp';
import PagesReducer from './reducer_pages';
import PostsReducer from './reducer_posts';
import FormsReducer from './reducer_forms';

const rootReducer = combineReducers({
  pages: PagesReducer,
  posts: PostsReducer,
  wp: WPReducer,
  forms: FormsReducer
});

export default rootReducer;
