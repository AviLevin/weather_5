import { createStore, applyMiddleware } from 'redux';


//compose 
// import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducers from './store/reducers/Reducer.js'


const initialState ={};

const middelWare = [thunk];

const store = createStore(rootReducers,initialState,applyMiddleware(...middelWare));

export default store;