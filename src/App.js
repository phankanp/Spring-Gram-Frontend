import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import AddPost from "./pages/add-post/add-post.component";

import store from "./redux/store";
import HomePage from "./pages/homepage/homepage.component";
import Register from "./components/register/register.component";
import Login from "./components/login/login.component";
import Alert from "./components/alert/alert.component";

function App() {
  return (
    <Provider store={store}>
      <section className="container" id="alertsComponent">
        <Alert />
      </section>
      <Router>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/homepage" component={HomePage} />
        <Route exact path="/addPost" component={AddPost} />
      </Router>
    </Provider>
  );
}

export default App;
