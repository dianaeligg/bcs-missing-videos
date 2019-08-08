import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main"
import Cohort from "./pages/Cohort"
import Login from "./pages/Login"
import CohortList from "./pages/CohortList"
import {
  Container, Menu
} from 'semantic-ui-react'

class App extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  logOut = () => {
    
  }

  render() {
    const { activeItem } = this.state
    return (
      <Router>
        <Menu fixed='top' stackable inverted>
        <Menu.Item color='green'>
          BCS-MISSING-VIDEOS
        </Menu.Item>

        <Menu.Item
          name='CohortList'
          color='blue'
          onClick={this.handleItemClick}
        >
          Cohort List
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item
            name='LogOut'
            onClick={this.logOut}
          >
            Log Out
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <Container style={{ marginTop: '6em'}}>
      <div>
          <Route exact path="/" component={Main} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/cohort" component={Cohort} />
          <Route exact path="/cohort/:id" component={Cohort} />
          <Route exact path="/cohortList" component={CohortList} />
      </div>
      </Container>
    </Router>
    );
  }
}

export default App;
