import React from "react";
import { Card } from 'semantic-ui-react';
import {Link} from 'react-router-dom'

function CohortCard(props) {
  return (
    
      <Card
       >
        <Card.Content as={Link} to={`/cohort/${props.id}`}>
          <Card.Header>
              {/* <Link to={`/cohort/${props.id}`}>*/}
              <img alt={props.program.university.name} src={props.program.university.logoUrl} style={{height: '40px'}}/> 
              {props.name}
              {/* </Link> */}
          </Card.Header>
          <Card.Meta>{props.role}</Card.Meta>
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
