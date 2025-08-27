import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.scss";
import { Provider } from "react-redux";
import store from "./redux/Store.js";
import { BrowserRouter } from "react-router-dom";
import { getUsers } from "./actions/users.action.js";

// Dispatch initial pour récupérer la liste des utilisateurs
store.dispatch(getUsers());

// Render avec React 18
createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

import React from "react";
import ReactDom from "react-dom";
import App from "./App.jsx";
import "./styles/index.scss";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { getUsers } from "./actions/users.action.js";

// dev Tools
import { composeWithDevTools } from "redux-devtools-extension";

store.dispatch(getUsers()); // dispatch initial

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
