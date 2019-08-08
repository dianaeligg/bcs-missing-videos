import React from "react";
import { Link } from "react-router-dom";
import { Card } from 'semantic-ui-react';
import VideoStatus from './VideoStatus'

function SessionCard({ name, date, videos }) {
  return (
    <div>
      {/* <Card
        link
        header={name}
        key={name}
        meta={date.toDateString()}
        description={videos.map((vid, i) => <a href={vid.url} target="_blank"> Video {i+1} </a>)}
      /> */}
      <Card>
        <Card.Content>
          <VideoStatus withVideos={videos.length > 0}></VideoStatus>
          <Card.Header>{name}</Card.Header>
          <Card.Meta>{date.toDateString()}</Card.Meta>
          <Card.Description>
            {videos.map((vid, i) => <a key={i} href={vid.url} target="_blank"> Video {i+1} </a>)}
          </Card.Description>
        </Card.Content>
      </Card>
    </div>
  );
}

export default SessionCard;
