import React, { Component } from "react";
import API from "../utils/API"
import { Card } from 'semantic-ui-react'
// import NotLoggedIn from "../components/NotLoggedIn";

const loadingStyle = {
    margin: "auto",
    display: "flex"
}

class App extends Component {

    state = {
        attendance: [{sessionName:"", students:[]}],
        loading: true,
        loggedIn: true,
        enrollmentId: -1
    }

    componentDidMount(){
        const courseId  = this.props.match.params.id;
        API.getAttendance(courseId).then(r => {
            console.log(r);
            if (r.data.length > 0)
                this.setState({
                    attendance: r.data,
                    loading: false,
                    loggedIn: true
                }, () => {});
            else
                this.setState({
                    loading: false,
                    loggedIn: false
                })
        }).catch(err => {
            console.log(err);
            this.setState({
                loggedIn: false
            });
        });
    }

    render() {
        return (
            
            <div> 
                { (this.state.loading) ? 
                <img alt='loading' src={require('../resources/loading.gif')}
                    style={loadingStyle}/>
                : "" } 
                
                {this.state.attendance.map(item => 
                    <div key={item.sessionName}>
                        <h1>{item.sessionName}</h1>
                        {item.students.map(st =>
                            <div style={{paddingLeft: '30px'}} key={st.studentName}>{st.studentName}</div>
                        )}
                    </div>
                )} 
            </div>
        );
    }
}

export default App;
