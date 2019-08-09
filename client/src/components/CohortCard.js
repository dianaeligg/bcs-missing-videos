import React from "react";
import { Card } from 'semantic-ui-react';
import {Link} from 'react-router-dom'

function CohortCard(props) {
  return (
    <Link to={`/cohort/${props.id}`}>
      <Card>
        <Card.Content>
          <Card.Header>{props.name}</Card.Header>
          <Card.Meta>{props.role}</Card.Meta>
          <Card.Description>
                  {props.startDate.toDateString() + " - " + props.endDate.toDateString()} 
          </Card.Description>
        </Card.Content>
      </Card>
    </Link>
  );
}

export default CohortCard;
