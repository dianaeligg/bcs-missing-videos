import React from "react";

const success = {
  border: '5px solid green',
  marginBottom: "10px"
};

const failure = {
  border: '5px solid red',
  marginBottom: "10px"
};

const pending = {
  border: '5px solid orange',
  marginBottom: "10px"
}

function VideoStatus( props ) {
  return (
    <div style={props.withVideos ? success: props.passedDate ? failure : pending}>
      
    </div>
  );
}

export default VideoStatus;
