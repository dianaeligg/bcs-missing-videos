import React, { Component } from "react";
import API from "../utils/API";
import CohortGroup from "../components/CohortGroup"

class App extends Component {

    state = {
        msg: "LIST",
        badInfo: false,
        userAccount: {firstName: ""},
        enrollments: [],
    }

    componentDidMount(){
        console.log(this.state.userAccount)
        API.getEnrollments().then(r => {
            if (r.data !== "")
                this.setState({
                    userAccount: r.data.userAccount,
                    enrollments: r.data.enrollments
                }, x => {})
            else{
                console.log("not logged in?")
                this.props.history.push('/login');
            }
        }).catch(err =>{
            console.log("error")
        });
    }

    render() {
        return (
        <div>
            <span>{(this.state.userAccount.firstName) ? "Hi " + this.state.userAccount.firstName : ""}</span>
            <CohortGroup text="Current Enrollments" color="purple" 
                                group={this.state.enrollments.filter(
                                        x => new Date(x.course.startDate) < new Date() && 
                                            new Date (x.course.endDate) > new Date())
                                        }
                                />
            <CohortGroup text="Past Enrollments" color="blue" 
                                group={this.state.enrollments.filter(
                                        x => new Date(x.course.endDate) < new Date())
                                        }
                                />
            <CohortGroup text="Future Enrollments" color="teal" 
                                group={this.state.enrollments.filter(
                                        x => new Date(x.course.startDate) > new Date())
                                        }
                                />
        </div>
        );
    }
}

export default App;
