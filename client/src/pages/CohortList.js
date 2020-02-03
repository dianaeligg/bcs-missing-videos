import React, { useState, useEffect } from "react";
import API from "../utils/API";
import CohortGroup from "../components/CohortGroup";
import NotLoggedIn from "../components/NotLoggedIn";

const loadingStyle = {
    margin: "auto",
    display: "flex"
}

function CohortList() {

    const [state, setState] = useState({
        badInfo: false,
        loading: true,
        userAccount: {firstName: ""},
        enrollments: [],
        loggedIn: true
    });

    useEffect( () => {
        API.getEnrollments().then(r => {
            if (r.data.userAccount.id !== -1)
                setState({
                    userAccount: r.data.userAccount,
                    enrollments: r.data.enrollments,
                    loading: false,
                    loggedIn: true
                })
            else{
                setState({loggedIn: false, loading: false});
            }
        }).catch(err =>{
            console.log("error")
        })
    }, []);

    return (
    <div>
        { (state.loading) ? 
                <img alt='loading' src={require('../resources/loading.gif')}
                    style={loadingStyle}/>
                : "" }
        { (!state.loggedIn) ? 
                <NotLoggedIn></NotLoggedIn>
                : "" }
        <span>{(state.userAccount.firstName) ? "Hi " + state.userAccount.firstName : ""}</span>
        <CohortGroup text="Current Enrollments" color="purple" 
                            group={state.enrollments.filter(
                                    x => new Date(x.course.startDate) < new Date() && 
                                        new Date (x.course.endDate) > new Date())
                                    }
                            />
        <CohortGroup text="Past Enrollments" color="blue" 
                            group={state.enrollments.filter(
                                    x => new Date(x.course.endDate) < new Date())
                                    }
                            />
        <CohortGroup text="Future Enrollments" color="teal" 
                            group={state.enrollments.filter(
                                    x => new Date(x.course.startDate) > new Date())
                                    }
                            />
    </div>
    )
}

export default CohortList;
