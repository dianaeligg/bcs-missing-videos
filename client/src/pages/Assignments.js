import React, { useState, useEffect } from "react";
import API from "../utils/API";
import AssingmentsHeatMap from "../components/AssignmentsHeatMap";

const loadingStyle = {
  margin: "auto",
  display: "flex",
};

const titleStyle = {
  textAlign: "center",
  fontSize: "3rem"
};


const INITIAL_STATE = {
  academic: [],
  career: []
};

function Assignments(props) {
  const [assignments, setAssignments] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(true);
  const courseId = props.match.params.id;

  useEffect(() => {
    API.getAssignments(courseId)
      .then(({ data }) => {
        setAssignments({
          academic: data.filter(
            (assignment) => assignment.context === "academic"
          ),
          career: data.filter((assignment) => assignment.context === "career"),
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <>
        {loading ? (
          <img
            alt="loading"
            src={require("../resources/loading.gif")}
            style={loadingStyle}
          />
        ) : (
          <>
          <h1 style={titleStyle}> Academic </h1>
          <AssingmentsHeatMap assignments={assignments.academic} />
          <h1 style={titleStyle}> Career </h1>
          <AssingmentsHeatMap assignments={assignments.career} />
          </>
        )}
      </>
    </div>
  );
}

export default Assignments;
