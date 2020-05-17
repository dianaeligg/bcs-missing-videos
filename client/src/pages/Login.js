import React, { useState } from 'react';
import API from '../utils/API';
import { Button, Form, Message } from 'semantic-ui-react'
import FormFieldInput from '../components/FormFieldInput'
import { BCS_TOKEN } from '../localKeys';

function Login (props) {
    const [state, setState] = useState({badInfo: false});
    const handleInputChange = event => {
        setState({
          ...state,
          [event.target.name]: event.target.value
        });
      };

    const handleFormSubmit = event => {
        event.preventDefault();
        API.login(state.email, state.password).then(response => {
            if (response.data.success){
                localStorage.setItem(BCS_TOKEN, response.data.authenticationInfo.authToken);
                props.history.push('/cohortList')
            }else{
                setState({...state, badInfo: true});
            }
        });
      };


    return (
        <div>
              <Form warning={state.badInfo}>
                <FormFieldInput text='E-mail'
                                name='email'
                                placeholder='me@domain.com'
                                type='text'
                                handleChange={handleInputChange}
                                ></FormFieldInput>
                <FormFieldInput text='Password'
                                name='password'
                                placeholder='Password'
                                type='password'
                                handleChange={handleInputChange}
                                ></FormFieldInput>
                <Button type='submit' onClick={handleFormSubmit}>Sign In</Button>
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

export default Login;
