import React, { Component } from "react";
import API from "../utils/API";

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
            <div>
                {(this.state.userAccount.firstName) ? "Hi " + this.state.userAccount.firstName : ""}
                <ul>
                    {
                        this.state.enrollments.filter(x => x.id !== -1).map(item => 
                            <li key={item.id}> <a href={`/cohort/${item.id}`}>  {item.course.name} </a></li>
                        )
                    }
                </ul>
            </div>
        </div>
        );
    }
}

export default App;
