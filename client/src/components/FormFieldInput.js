import React from "react";
import { Form } from 'semantic-ui-react';

const inputStyle = {
  border: "none",
  borderBottom: "2px solid black",
  borderRadius: "0px"

}

function FormFieldInput(props) {
  return (
    <Form.Field>
    <label>{props.text}</label>
    <input  name={props.name}
            placeholder={props.placeholder} 
            type={props.type} 
            style={inputStyle}
            onChange={props.handleChange}/>
    </Form.Field>
  );
}

export default FormFieldInput;
