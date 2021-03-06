import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Cohort from "./pages/Cohort";
import Login from "./pages/Login";
import CohortList from "./pages/CohortList";
import Attendance from './pages/Attendance';
import Assignments from './pages/Assignments';
import {
  Container
} from 'semantic-ui-react'
import {BCS_TOKEN} from "./localKeys"

import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

class App extends Component {
  state = {
    loggedIn: false
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  logOut = () => {
    localStorage.removeItem(BCS_TOKEN);
  }

  render() {
    return (
      <Router>
        <NavBar logOut={this.logOut}></NavBar>
      <Container style={{ marginTop: '2em'}}>
      <div>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/cohort" component={Cohort} />
          <Route exact path="/cohort/:id" component={Cohort} />
          <Route exact path="/cohortList" component={CohortList} />
          <Route exact path="/attendance/:id" component={Attendance} />
          <Route exact path="/assignments/:id" component={Assignments} />
      </div>
      </Container>
      <Footer/>
    </Router>
    );
  }
}

export default App;
