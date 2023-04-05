import { legacy_createStore as createStore } from "redux";
import rootReducer from './reducers/rootReducer'
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from '@redux-devtools/extension';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store