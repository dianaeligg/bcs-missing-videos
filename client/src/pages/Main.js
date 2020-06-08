import React, { Component } from "react";
import API from "../utils/API"

class App extends Component {

    state = {
        msg: "Hola"
    }

    componentDidMount(){
        API.getLanding().then(r => {
            this.setState({
                msg: r.data.msg
            });
        });
    }

    render() {
        return (
        <div>
            <h2>{this.state.msg}</h2>
        </div>
        );
    }
}

export default App;
