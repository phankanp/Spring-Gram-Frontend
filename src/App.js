import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import AddPost from "./pages/add-post/add-post.component";

import store from "./redux/store";
import Navbar from "./components/navbar/navbar.component";
import HomePage from "./pages/homepage/homepage.component";
import Register from "./components/register/register.component";
import Login from "./components/login/login.component";
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
      <Router>
        <section>
          <Navbar />
        </section>
        <section className="container" id="alertsComponent">
          <Alert />
        </section>
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/homepage" component={HomePage} />
          <Route exact path="/addPost" component={AddPost} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
