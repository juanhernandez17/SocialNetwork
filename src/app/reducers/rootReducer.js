import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import {reducer as toastrReducer} from 'react-redux-toastr';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore'
import postReducer from '../../features/posts/postReducer';
import modalsReducer from '../../features/modals/modalReducer';
import authReducer from '../../features/auth/authReducer';
import asyncReducer from '../../features/async/asyncReducer';
import calendarReducer from '../../features/calendar/calendarReducer'
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  events: postReducer,
  form: FormReducer,
  modals: modalsReducer,
  auth: authReducer,
  async: asyncReducer,
  toastr: toastrReducer,
  calendar: calendarReducer
})

export default rootReducer