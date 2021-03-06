import React, { useState, useEffect } from "react";
import API from "../utils/API";
import CohortGroup from "../components/CohortGroup";
import NotLoggedIn from "../components/NotLoggedIn";

const loadingStyle = {
  margin: "auto",
  display: "flex",
};

function CohortList() {
  const [loading, setLoading] = useState(true);
  const [enrollments, setEnrollments] = useState([]);
  const [error, setError] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    API.getEnrollments()
      .then(({data}) => {
        if (data.userInfo.id !== -1) {
          setUserInfo(data.userInfo);
          setEnrollments(data.Enrollments);
          setLoading(false);
          setLoggedIn(true);
        } else {
          setLoggedIn(false); 
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });
  }, []);

  return (
    <div>
      <div>{`Hi ${userInfo.firstName || "there"}`}</div>
      {error ? <div>There was an issue when fetching enrollment data.  Please logout and login again.</div> : ""}
      {!loggedIn ? <NotLoggedIn></NotLoggedIn> : ""}
      {loading ? (
        <img
          alt="loading"
          src={require("../resources/loading.gif")}
          style={loadingStyle}
        />
      ) : (
        <>
          <CohortGroup
            text="Current Enrollments"
            color="purple"
            group={enrollments.filter(
              (x) =>
                new Date(x.course.startDate) < new Date() &&
                new Date(x.course.endDate) > new Date()
            )}
          />
          <CohortGroup
            text="Past Enrollments"
            color="blue"
            group={enrollments.filter(
              (x) => new Date(x.course.endDate) < new Date()
            )}
          />
          <CohortGroup
            text="Future Enrollments"
            color="teal"
            group={enrollments.filter(
              (x) => new Date(x.course.startDate) > new Date()
            )}
          />
        </>
      )}
    </div>
  );
}

export default CohortList;
