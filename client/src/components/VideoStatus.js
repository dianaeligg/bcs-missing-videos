import React from "react";
import { Link } from "react-router-dom";
import { Card } from 'semantic-ui-react'

const success = {
  border: '5px solid green',
  "margin-bottom": "10px"
};

const failure = {
  border: '5px solid red',
  "margin-bottom": "10px"
};

function VideoStatus({ withVideos }) {
  return (
    <div style={withVideos? success: failure}>
      
    </div>
  );
}

export default VideoStatus;
