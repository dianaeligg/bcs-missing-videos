import React, { Component } from "react";
import API from "../utils/API";
import { Card } from 'semantic-ui-react';
import CohortCard from "../components/CohortCard"

const cohortGroup ={
    marginTop: "1em"
}

class App extends Component {

    state = {
        msg: "LIST",
        badInfo: false,
        userAccount: {},
        enrollments: []
    }

    componentDidMount(){
        API.getEnrollments().then(r => {
            console.log(r);
            this.setState({
                userAccount: r.data.userAccount,
                enrollments: r.data.enrollments
            }, x => console.log(this.state.enrollments))
        });
    }

    render() {
        return (
        <div>
            <span>{(this.state.userAccount.firstName) ? "Hi " + this.state.userAccount.firstName : ""}</span>
            <Card.Group itemsPerRow={3} style={cohortGroup}>
            {
                this.state.enrollments.filter(x => x.id !== -1).map(item => 
                    <CohortCard name={item.course.name}
                                key={item.id}
                                id={item.id}
                                role={item.courseRole.name}
                                startDate={new Date(item.course.startDate)}
                                endDate={new Date(item.course.endDate)}/> 
                )
            }
            </Card.Group>
        </div>
        );
    }
}

export default App;
