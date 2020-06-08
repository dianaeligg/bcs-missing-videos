import React, { useState, useEffect } from "react";
import API from "../utils/API";
import AttendanceHeatMap from "../components/AttendanceHeatMap";

const loadingStyle = {
  margin: "auto",
  display: "flex",
};

function Attendance(props) {
  const [attendance, setAttendance] = useState([
    { sessionName: "", sessionId: "", students: [] },
  ]);

  const [loading, setLoading] = useState(true);
//   const [loggedIn, setLoggedIn] = useState(true);

  const courseId = props.match.params.id;
  useEffect(() => {
    API.getAttendance(courseId)
      .then(({ data }) => {
       
        if (data.length > 0) {
          setLoading(false);
          setAttendance(data.map(session => {return {...session, date: new Date(session.date)}}));
        } else {
          setLoading(false);
        //   setLoggedIn(false);
        }
      })
      .catch((err) => {
        console.log(err);
        // setLoggedIn(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <img
          alt="loading"
          src={require("../resources/loading.gif")}
          style={loadingStyle}
        />
      ) : (
        <AttendanceHeatMap attendance={attendance} />
      )}
    </div>
  );
}

export default Attendance;
