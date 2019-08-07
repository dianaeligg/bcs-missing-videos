import React, { Component } from "react";
import API from "../utils/API"

class App extends Component {

    state = {
        msg: "Hola",
        sessions: [{session:{id: -1}, videoUrlList:[]}],
        loading: true
    }

    componentDidMount(){
        API.getSessions(168532).then(r => {
            console.log(r.data[0]);
            this.setState({
                sessions: r.data,
                loading: false
            }, () => console.log(this.state.sessions));
        });
    }

    onClearArray = () => {
        this.setState({ sessions: [{session:{id:99}}] }, console.log(this.state.sessions));
    };

    render() {
        return (
            <div>
                { (this.state.loading) ? <img src={require('../resources/loading.gif')}></img> : "" } 
                <ul>
                    {
                        this.state.sessions.filter(x => x.session.id !== -1).map(item => 
                            <li key={item.session.id}>  {item.session.name} - {item.videoUrlList.length}</li>
                        )
                    }
                </ul>
            </div>
        );
    }
}

export default App;
