// import { applyMiddleware, createStore } from "redux";
// // import thunk from "redux-thunk/dist/redux-thunk.js";
// import thunk from "redux-thunk";
// import rootReducer from "./index";

// import { composeWithDevTools } from "redux-devtools-extension";

// // console.log("thunk.default typeof:", typeof thunk.default);

// const store = createStore(
//     rootReducer,
//     composeWithDevTools(applyMiddleware(thunk.default))
// );

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./index"; // ton rootReducer combiné

const store = configureStore({
    reducer: rootReducer,
    // Redux Toolkit inclut déjà thunk par défaut
    devTools: process.env.NODE_ENV !== "production", // active Redux DevTools uniquement en dev
});

export default store;
