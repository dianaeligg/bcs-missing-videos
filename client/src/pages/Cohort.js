import React, { Component } from "react";
import API from "../utils/API"
import SessionCard from "../components/SessionCard";
import { Card } from 'semantic-ui-react'

const loadingStyle = {
    margin: "auto",
    display: "flex"
}

class App extends Component {

    state = {
        msg: "Hola",
        sessions: [{session:{id: -1}, videoUrlList:[]}],
        loading: true,
        loggedIn: true,
        enrollmentId: -1
    }

    componentDidMount(){
        const enrollmentId  = this.props.match.params.id;
        API.getSessions(enrollmentId).then(r => {
            this.setState({
                sessions: r.data,
                loading: false,
                loggedIn: true
            }, () => {console.log(this.state)});
        }).catch(err => {
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
                { (this.state.loggedIn) ? "" : "Not logged in" }
                { this.state.sessions.filter(x => x.session.id !== -1).length > 0 ?
                    <div> 
                        <span></span>
                        <div style={{margin: '10px 0'}}>
                            <div style={{borderLeft: '16px green solid', paddingLeft: '0.5em', display: 'inline'}}> Sessions with Video</div>
                            <div style={{borderLeft: '16px red solid', paddingLeft: '0.5em', marginLeft: '1.5em', display: 'inline'}}> Sessions without Video</div>
                            <div style={{borderLeft: '16px orange solid', paddingLeft: '0.5em', marginLeft: '1.5em',display: 'inline'}}> Sessions yet to come</div>
                        </div>
                    </div> : ""
                }
                <Card.Group itemsPerRow={3}>
                {this.state.sessions.filter(x => x.session.id !== -1).map(item => 
                    <SessionCard name={item.session.name}
                                 key={item.session.id}
                                 date={new Date(item.session.startTime)}
                                 videos={item.videoUrlList}></SessionCard>
                )} 
                </Card.Group>
            </div>
        );
    }
}

export default App;
