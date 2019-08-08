import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main"
import Cohort from "./pages/Cohort"
import Login from "./pages/Login"
import CohortList from "./pages/CohortList"

class App extends Component {
  render() {
    return (
      <Router>
      <div>
          <Route exact path="/" component={Main} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/cohort" component={Cohort} />
          <Route exact path="/cohort/:id" component={Cohort} />
          <Route exact path="/cohortList" component={CohortList} />
      </div>
    </Router>
    );
  }
}

export default App;
