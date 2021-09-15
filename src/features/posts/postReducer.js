import { createReducer } from '../../app/common/util/reducerUtil';
import { CREATE_POST, DELETE_POST, UPDATE_POST, FETCH_T_POSTS, FETCH_E_POSTS } from './postConstants';

 const initialState = [];

export const createPost = (state, payload) => {
  return [...state, Object.assign({}, payload.event)]
}

export const updatePost = (state, payload) => {
  return [
    ...state.filter(event => event.id !== payload.event.id),
    Object.assign({}, payload.event)
  ]
}

export const deletePost = (state, payload) => {
  return [
    ...state.filter(event => event.id !== payload.eventId)
  ]
}

export const fetchTextPosts = (state, payload) => {
  return payload.posts;
};

export const fetchEventPosts = (state, payload) => {
  return payload.events;
};

export default createReducer(initialState, {
  [CREATE_POST]: createPost,
  [UPDATE_POST]: updatePost,
  [DELETE_POST]: deletePost,
  [FETCH_E_POSTS]: fetchEventPosts,
  [FETCH_T_POSTS]: fetchTextPosts
});
