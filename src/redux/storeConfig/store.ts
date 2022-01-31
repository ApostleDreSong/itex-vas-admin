import { createStore, applyMiddleware, compose } from 'redux';
import createDebounce from 'redux-debounced';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from '../reducers/rootReducer';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native

const middlewares = [thunk, createDebounce()];
const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['authReducer', 'meReducer', 'loadingStateReducer'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
//Added this line so that App can run in browsers without Redux Dev tools in development mode
// const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;
const composeEnhancers =
	(typeof window !== 'undefined' &&
		(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

const store = createStore(
	persistedReducer,
	{},
	composeEnhancers(applyMiddleware(...middlewares))
);
const persistor = persistStore(store);

export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
