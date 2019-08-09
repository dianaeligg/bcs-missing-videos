import React from "react";

const success = {
  border: '5px solid green',
  marginBottom: "10px"
};

const failure = {
  border: '5px solid red',
  marginBottom: "10px"
};

function VideoStatus({ withVideos }) {
  return (
    <div style={withVideos? success: failure}>
      
    </div>
  );
}

export default VideoStatus;
