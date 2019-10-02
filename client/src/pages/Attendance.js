import React, { Component } from "react";
import API from "../utils/API"
import AttendanceHeatMap from '../components/AttendanceHeatMap'
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
            if (r.data.length > 0)
                this.setState({
                    attendance: r.data.filter(x => { return new Date(x.date) < new Date()}),
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
                :   
                    <AttendanceHeatMap attendance={
                                        this.state.attendance
                                    }>
                    </AttendanceHeatMap> 
                } 
                
                
            </div>
        );
    }
}

export default App;
