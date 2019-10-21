import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/dist/dropdown.js";
import "jquery";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import PostForm from "./components/create-post-form/create-post-form.component";

import store from "./redux/store";
import Navbar from "./components/navbar/navbar.component";
import HomePage from "./pages/homepage/homepage.component";
import Register from "./components/register/register.component";
import Login from "./components/login/login.component";
import Gallery from "./components/gallery/gallery.component";
import Profile from "./components/profile/profile.component";
import ProfileEdit from "./components/profile-edit/profile-edit.component";
import Alert from "./components/alert/alert.component";

import { loadUser } from "./redux/auth/auth.actions";
import setAuthToken from "../src/utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <section>
          <Navbar />
        </section>
        <section className="container" id="alertsComponent">
          <Alert />
        </section>
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/addPost" component={PostForm} />
          <Route exact path="/gallery" component={Gallery} />
          <Route exact path="/profile/edit" component={ProfileEdit} />
          <Route exact path="/profile/:alias" component={Profile} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
