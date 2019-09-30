import React from 'react';
import Emoji from "./Emoji";
import {Menu} from 'semantic-ui-react';
import { Link, Route } from "react-router-dom";

const NavBar = props => {
    return (
        <Menu fixed='top' inverted>
            <Menu.Item color='green'>
            <Emoji label="sheep" symbol="🐸"/> BCS-MISSING-VIDEOS
            </Menu.Item>

            <Route
                    path="/(cohort|attendance)"
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
