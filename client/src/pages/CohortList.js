import React, { Component } from "react";
import API from "../utils/API";

class App extends Component {

    state = {
        msg: "LOGIN",
        badInfo: false
    }

    componentDidMount(){
        // API.getLanding().then(r => {
        //     console.log(r);
        //     this.setState({
        //         msg: r.data.msg
        //     });
        // });
    }

    handleInputChange = event => {
        let value = event.target.value;
        const name = event.target.name;
        // console.log(value, name);
        this.setState({
          [event.target.name]: event.target.value
        });
      };

    handleFormSubmit = event => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
        event.preventDefault();
        console.log(this.state);
        API.login(this.state.email, this.state.password).then(response => {
            console.log(response);
            if (response.data.success){
                localStorage.setItem("BCS_TOKEN", response.data.authenticationInfo.authToken);
                localStorage.setItem("BCS_USER_ID", response.data.authenticationInfo.userId);
            }else{
                this.setState({badInfo: true});
            }
        });
      };


    render() {
        return (
        <div>
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
        </div>
        );
    }
}

export default App;
