import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.scss";
import { Provider } from "react-redux";
import store from "./redux/Store.js";
import { BrowserRouter } from "react-router-dom";
import { getUsers } from "./actions/users.action.js";
import { getPosts } from "./actions/post.actions";

// Dispatch initial pour récupérer tous les utilisateurs
store.dispatch(getUsers());
// dispatch pour recuprer tout les postes
store.dispatch(getPosts());

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
