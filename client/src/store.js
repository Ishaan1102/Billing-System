import { createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import  thunk from 'redux-thunk';
import rootReducer from './reducers';
import setAuthToken from './utils/setAuthToken';

const intialState = {};
const middleware = [thunk];
const store = createStore( rootReducer, intialState, composeWithDevTools(applyMiddleware(...middleware)));

let currentState = store.getState();

store.subscribe(() => {
    let prevState = currentState;
    currentState = store.getState();

    if(prevState.auth.token !== currentState.auth.token) {
        const token = currentState.auth.token;
        setAuthToken(token);
    }
});

export default store;
