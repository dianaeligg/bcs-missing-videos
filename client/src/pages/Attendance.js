import React, { useState } from "react";
import API from "../utils/API"
import AttendanceHeatMap from '../components/AttendanceHeatMap'
// import NotLoggedIn from "../components/NotLoggedIn";

const loadingStyle = {
    margin: "auto",
    display: "flex"
}

function Attendance (props) {
    const [state, setState] = useState({
        attendance: [{sessionName:"", students:[]}],
        loading: true,
        loggedIn: true,
        enrollmentId: -1
    });

    const courseId  = props.match.params.id;
    API.getAttendance(courseId).then(r => {
        if (r.data.length > 0)
            setState({
                attendance: r.data.filter(x => { return new Date(x.date) < new Date()}),
                loading: false,
                loggedIn: true
            }, () => {});
        else
            setState({
                loading: false,
                loggedIn: false
            })
    }).catch(err => {
        console.log(err);
        setState({
            loggedIn: false
        });
    });
    
    return (
        
        <div> 
            
            { (state.loading) ? 
                <img alt='loading' src={require('../resources/loading.gif')}
                    style={loadingStyle}/>
            :   
                <AttendanceHeatMap attendance={
                                    state.attendance
                                }>
                </AttendanceHeatMap> 
            } 
            
            
        </div>
    );
}

export default Attendance;
