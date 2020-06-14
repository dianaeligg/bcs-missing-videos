import React, { useState, useEffect } from "react";
import API from "../utils/API";
import CohortGroup from "../components/CohortGroup";
import NotLoggedIn from "../components/NotLoggedIn";

const loadingStyle = {
  margin: "auto",
  display: "flex",
};

function CohortList() {
  const [state, setState] = useState({
    loading: true,
    userInfo: { firstName: "" },
    enrollments: [],
    loggedIn: true,
  });

  const [dadJoke, setDadJoke] = useState();

  useEffect(() => {
    API.getEnrollments()
      .then((r) => {
        if (r.data.userInfo.id !== -1)
          setState({
            userInfo: r.data.userInfo,
            enrollments: r.data.Enrollments,
            loading: false,
            loggedIn: true,
          });
        else {
          setState({ loggedIn: false, loading: false });
        }
      })
      .catch((err) => {
        console.log("error");
      });
    API.getDadJoke().then(({ data }) => {
      setDadJoke(data.joke);
    });
  }, []);

  return (
    <div>
      {!state.loggedIn ? <NotLoggedIn></NotLoggedIn> : ""}
      {state.loading ? (
        <img
          alt="loading"
          src={require("../resources/loading.gif")}
          style={loadingStyle}
        />
      ) : (
        <>
          <div>
            {state.userInfo.firstName ? "Hi " + state.userInfo.firstName : ""}
          </div>
          <div>{dadJoke}</div>
          <CohortGroup
            text="Current Enrollments"
            color="purple"
            group={state.enrollments.filter(
              (x) =>
                new Date(x.course.startDate) < new Date() &&
                new Date(x.course.endDate) > new Date()
            )}
          />
          <CohortGroup
            text="Past Enrollments"
            color="blue"
            group={state.enrollments.filter(
              (x) => new Date(x.course.endDate) < new Date()
            )}
          />
          <CohortGroup
            text="Future Enrollments"
            color="teal"
            group={state.enrollments.filter(
              (x) => new Date(x.course.startDate) > new Date()
            )}
          />
        </>
      )}
    </div>
  );
}

export default CohortList;
