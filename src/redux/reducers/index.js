import userReducer from './user';
import notesReducer from './notes'
import { combineReducers } from 'redux'
export default combineReducers({ user: userReducer, notes: notesReducer })