import { createStore } from 'redux';
import rootReducer from '../reducers/reducers';

// Create the Redux store
const store = createStore(rootReducer);

export default store;
