import React from 'react';
import { Link } from "react-router-dom";

const NotLoggedIn = () => {
    return (
        <div style={{textAlign: "center"}}>You might not be logged in, please click <Link to='/login'>here </Link> to go to Login screen </div>
    )
}
export default NotLoggedIn;
