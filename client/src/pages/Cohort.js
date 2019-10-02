import React, { Component } from "react";
import API from "../utils/API"
import SessionCard from "../components/SessionCard";
import { Card } from 'semantic-ui-react'
import NotLoggedIn from "../components/NotLoggedIn";

const loadingStyle = {
    margin: "auto",
    display: "flex"
}

class App extends Component {

    state = {
        sessions: [{session:{id: -1}, videoUrlList:[]}],
        loading: true,
        loggedIn: true,
        enrollmentId: -1
    }

    componentDidMount(){
        const enrollmentId  = this.props.match.params.id;
        API.getSessions(enrollmentId).then(r => {
            if (r.data.length > 0)
                this.setState({
                    sessions: r.data,
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
                { (this.state.loggedIn) ? "" : <NotLoggedIn></NotLoggedIn> }
                { this.state.sessions.filter(x => x.session.id !== -1).length > 0 ?
                    <div> 

                        <div style={{margin: '10px 0'}}>
                            <div style={{borderLeft: '16px green solid', paddingLeft: '0.5em', marginLeft: '1.5em', display: 'inline'}}> Sessions with Video</div>
                            <div style={{borderLeft: '16px red solid', paddingLeft: '0.5em', marginLeft: '1.5em', display: 'inline'}}> Sessions without Video</div>
                            <div style={{borderLeft: '16px orange solid', paddingLeft: '0.5em', marginLeft: '1.5em',display: 'inline'}}> Sessions yet to come</div>
                        </div>
                    </div> : ""
                }
                <Card.Group stackable itemsPerRow={3}>
                {this.state.sessions.filter(x => x.session.id !== -1).map(item => 
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
}

export default App;
