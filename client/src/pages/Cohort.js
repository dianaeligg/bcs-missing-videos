import React, { useState, useEffect } from "react";
import API from "../utils/API"
import SessionCard from "../components/SessionCard";
import { Card } from 'semantic-ui-react'
import NotLoggedIn from "../components/NotLoggedIn";

const loadingStyle = {
    margin: "auto",
    display: "flex"
}

function Cohort (props){

    const [state, setState] = useState({
        sessions: [{session:{id: -1}, videoUrlList:[]}],
        loading: true,
        loggedIn: true,
        enrollmentId: -1
    });

    const enrollmentId  = props.match.params.id;
    useEffect(() => {
        API.getSessions(enrollmentId).then(r => {
            if (r.data.length > 0)
                setState({
                    sessions: r.data,
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
    }, [])

    return (
        <div>
            { (state.loading) ? 
                <img alt='loading' src={require('../resources/loading.gif')}
                    style={loadingStyle}/>
                : "" } 
            { (state.loggedIn) ? "" : <NotLoggedIn></NotLoggedIn> }
            { state.sessions.filter(x => x.session.id !== -1).length > 0 ?
                <div> 

                    <div style={{margin: '10px 0'}}>
                        <div style={{borderLeft: '16px green solid', paddingLeft: '0.5em', marginLeft: '1.5em', display: 'inline'}}> Sessions with Video</div>
                        <div style={{borderLeft: '16px red solid', paddingLeft: '0.5em', marginLeft: '1.5em', display: 'inline'}}> Sessions without Video</div>
                        <div style={{borderLeft: '16px orange solid', paddingLeft: '0.5em', marginLeft: '1.5em',display: 'inline'}}> Sessions yet to come</div>
                    </div>
                </div> : ""
            }
            <Card.Group stackable itemsPerRow={3}>
            {state.sessions.filter(x => x.session.id !== -1).map(item => 
                <SessionCard name={item.session.name}
                                key={item.session.id}
                                date={new Date(item.session.startTime)}
                                videos={item.videoUrlList}
                                attendance={item.attendance}
                                remote={item.remote}></SessionCard>
            )} 
            </Card.Group>
        </div>
    );
}

export default Cohort;
