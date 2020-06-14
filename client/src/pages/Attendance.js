import React, { useState, useEffect } from "react";
import API from "../utils/API";
import { Checkbox } from "semantic-ui-react";
import AttendanceHeatMap from "../components/AttendanceHeatMap";

const loadingStyle = {
  margin: "auto",
  display: "flex",
};

const checkboxLabel = {
  margin: "0 1rem",
};

const INITIAL_STATE = {
  active: [{ sessionName: "", sessionId: "", students: [] }],
  all: [{ sessionName: "", sessionId: "", students: [] }],
};

function Attendance(props) {
  const [attendance, setAttendance] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(true);
  const [showAllStudents, setShowAllStudents] = useState(false);
  const courseId = props.match.params.id;

  useEffect(() => {
    changeFilter();
  }, []);

  const changeFilter = () => { 
    setShowAllStudents(!showAllStudents);
    if (attendance.active.length <= 1) {
      API.getAttendanceFilter(courseId)
        .then(({ data }) => {
          if (data.length > 0) {
            setLoading(false);
            setAttendance({
              ...attendance,
              active: data.map((session) => {
                return { ...session, date: new Date(session.date) };
              }),
            });
          } else {
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (attendance.all.length <= 1) {
      API.getAttendance(courseId)
        .then(({ data }) => {
          if (data.length > 0) {
            setLoading(false);
            setAttendance({
              ...attendance,
              all: data.map((session) => {
                return { ...session, date: new Date(session.date) };
              }),
            });
          } else {
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLoading(false);
    }
  };

  return (
    <div>
      <>
        <div style={{ display: "flex" }}>
          <span style={checkboxLabel}>Active Students</span>
          <Checkbox toggle onChange={changeFilter} onMouseDown={() => setLoading(true)} />
          <span style={checkboxLabel}>All Students</span>
        </div>
        {loading ? (
          <img
            alt="loading"
            src={require("../resources/loading.gif")}
            style={loadingStyle}
          />
        ) : showAllStudents ? (
          <AttendanceHeatMap attendance={attendance.active} />
        ) : (
          <AttendanceHeatMap attendance={attendance.all} />
        )}
      </>
    </div>
  );
}

export default Attendance;
