import React from "react";
import { Card } from 'semantic-ui-react';
import VideoStatus from './VideoStatus'

const green = {
  color: "green"
}

const red = {
  color: "red"
}

function SessionCard(props) {
  return (
      <Card>
        <Card.Content>
          <VideoStatus withVideos={props.videos.length > 0} passedDate={props.date < new Date()}></VideoStatus>
          <Card.Header>{props.name}</Card.Header>
          <Card.Meta>{props.date.toDateString()}</Card.Meta>
          <Card.Description>
            {props.videos.map((vid, i) => <a key={i} href={vid.url} target='_blank' rel='noopener noreferrer'> Video {i+1} </a>)}
          </Card.Description>
          {props.date < new Date() ? 
          <Card.Description style={ props.attendance + props.remote >= props.maxStudents ? green : red}>
            {props.attendance}({props.remote}) / {props.maxStudents}
          </Card.Description> : ''
          }
        </Card.Content>
      </Card>
  );
}

export default SessionCard;
