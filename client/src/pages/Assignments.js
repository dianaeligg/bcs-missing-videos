import React, { useState, useEffect } from "react";
import API from "../utils/API";
import AssingmentsHeatMap from "../components/AssignmentsHeatMap";

const loadingStyle = {
  margin: "auto",
  display: "flex",
};

const INITIAL_STATE = {
  assignments: {}
};

function Assignments(props:any) {
  const [assignments, setAssignments] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(true);
  const courseId = props.match.params.id;

  useEffect(() => {
    API.getAssignments(courseId)
      .then(({ data }) => {
        console.log('DATA',data);
        setAssignments(data);
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
        ) : <AssingmentsHeatMap assignments={assignments}/>
        }
      </>
    </div>
  );
}

export default Assignments;
