import React from "react";
import { Card } from 'semantic-ui-react';
import {Link} from 'react-router-dom'

function CohortCard(props) {
  return (
    
      <Card>
        {/* <Card.Content as={Link} to={`/cohort/${props.id}`}> */}
        <Card.Content>
          <Card.Header>
            <img alt={props.program.university.name} src={props.program.university.logoUrl} style={{height: '40px'}}/>               
          </Card.Header>
          <Card.Header>
            {props.name}
          </Card.Header>
          <Card.Meta>{props.role}</Card.Meta>
          <Card.Description>
            <a href={`/cohort/${props.id}`}> Videos </a>
            /
            <a href={`/attendance/${props.id}`}> Attendance </a>
          </Card.Description>
          <Card.Description>
          {props.program.programType.name}  
          </Card.Description>
          <Card.Description>
            {props.startDate.toDateString() + " - " + props.endDate.toDateString()} 
          </Card.Description>
          
        </Card.Content>
      </Card>
  );
}

export default CohortCard;
