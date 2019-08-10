import React from "react";
import { Card } from 'semantic-ui-react';
import VideoStatus from './VideoStatus'

function SessionCard({ name, date, videos }) {
  return (
      <Card>
        <Card.Content>
          <VideoStatus withVideos={videos.length > 0} passedDate={date < new Date()}></VideoStatus>
          <Card.Header>{name}</Card.Header>
          <Card.Meta>{date.toDateString()}</Card.Meta>
          <Card.Description>
            {videos.map((vid, i) => <a key={i} href={vid.url} target='_blank' rel='noopener noreferrer'> Video {i+1} </a>)}
          </Card.Description>
        </Card.Content>
      </Card>
  );
}

export default SessionCard;
