import React, { Component } from "react";
import API from "../utils/API";
import CohortGroup from "../components/CohortGroup";
import NotLoggedIn from "../components/NotLoggedIn";

const loadingStyle = {
    margin: "auto",
    display: "flex"
}

class App extends Component {

    state = {
        badInfo: false,
        loading: true,
        userAccount: {firstName: ""},
        enrollments: [],
        loggedIn: true
    }

    componentDidMount(){
        API.getEnrollments().then(r => {
            if (r.data.userAccount.id !== -1)
                this.setState({
                    userAccount: r.data.userAccount,
                    enrollments: r.data.enrollments,
                    loading: false
                }, x => {})
            else{
                this.setState({loggedIn: false, loading: false});
            }
        }).catch(err =>{
            console.log("error")
        });
    }

    render() {
        return (
        <div>
            { (this.state.loading) ? 
                    <img alt='loading' src={require('../resources/loading.gif')}
                        style={loadingStyle}/>
                    : "" }
            { (!this.state.loggedIn) ? 
                    <NotLoggedIn></NotLoggedIn>
                    : "" }
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
