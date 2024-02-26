
import { combineReducers, configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import userSlice from './userSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Choose your storage engine
// import rootReducer from './reducer'; // Import your root reducer
const persistConfig = {
  key: 'root',
  storage
};

const reducer = combineReducers({
  user: userSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer
});

const persistor = persistStore(store);

export default store;
export {persistor};


