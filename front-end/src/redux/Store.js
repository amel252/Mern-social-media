import { applyMiddleware, createStore } from "redux";
// import thunk from "redux-thunk/dist/redux-thunk.js";
import * as thunk from "redux-thunk";
import rootReducer from "./index";

import { composeWithDevTools } from "redux-devtools-extension";

console.log("thunk.default typeof:", typeof thunk.default);

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk.default))
);

export default store;
