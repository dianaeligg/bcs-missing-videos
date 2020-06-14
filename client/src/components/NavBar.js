import React from 'react';
import Emoji from "./Emoji";
import {Menu} from 'semantic-ui-react';
import { Link, Route } from "react-router-dom";

const NavBar = props => {
    return (
        <Menu inverted>
            <Menu.Item color='green'>
            <Emoji label="sheep" symbol="🐸"/> BCS-HELPER
            </Menu.Item>

            <Route
                    path="/(cohort|attendance|assignments)"
                    render={ () => (
                        <Menu.Item as={Link} to='/cohortList'
                        name='CohortList'
                        >
                        Cohort List
                        </Menu.Item>
                    )}
                />
            
            <Menu.Menu position='right'>
            <Menu.Item
                name='LogOut'
                as={Link} to="/login"
                onClick={props.logOut}
            >
                Log Out
            </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}
export default NavBar;
