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
                this.props.history.push("/cohortList")
            }else{
                this.setState({badInfo: true});
            }
        });
      };


    render() {
        return (
        <div>
            {/* <form> */}
                <label>Username</label>
                <input  value={this.state.email}
                        name="email"
                        onChange={this.handleInputChange}
                        type="text"
                        placeholder="E-mail"></input>
                <label>Password</label>
                <input  value={this.state.password}
                        name="password"
                        onChange={this.handleInputChange}
                        type="password"
                        placeholder="Password"></input>
                <button onClick={this.handleFormSubmit}>Sign In</button>
                {(this.state.badInfo) ? <label>Login Information was incorrect</label> : ""}
                
            {/* </form> */}
        </div>
        );
    }
}

export default App;
