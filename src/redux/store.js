import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';
import rootReducer from './reducers'
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, applyMiddleware(thunk))
export const persistor = persistStore(store)
export default store