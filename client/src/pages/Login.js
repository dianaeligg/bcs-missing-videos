import React, { Component } from 'react';
import API from '../utils/API';
import { Button, Form, Message } from 'semantic-ui-react'
import FormFieldInput from '../components/FormFieldInput'

class Login extends Component {

    state = {
        msg: 'LOGIN',
        badInfo: false
    }

    componentDidMount(){
    }

    handleInputChange = event => {
        this.setState({
          badInfo: false,
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
                localStorage.setItem('BCS_TOKEN', response.data.authenticationInfo.authToken);
                // localStorage.setItem('BCS_USER_ID', response.data.authenticationInfo.userId);
                this.props.history.push('/cohortList')
            }else{
                this.setState({badInfo: true});
            }
        });
      };


    render() {
        return (
        <div>
              
              <Form warning={this.state.badInfo}>
                <FormFieldInput text='E-mail'
                                name='email'
                                placeholder='me@domain.com'
                                type='text'
                                handleChange={this.handleInputChange}
                                ></FormFieldInput>
                <FormFieldInput text='Password'
                                name='password'
                                placeholder='Password'
                                type='password'
                                handleChange={this.handleInputChange}
                                ></FormFieldInput>
                <Button type='submit' onClick={this.handleFormSubmit}>Sign In</Button>
                <Message
                warning
                header='Hey you, yeah you!'
                list={[
                    'The username and password combination does not match any user in the BCS user list',
                ]}
                />
            </Form>
        </div>
        );
    }
}

export default Login;
