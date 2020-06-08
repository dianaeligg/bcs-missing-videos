const axios = require("axios");

const getSessionDetail = async (authToken, sessionId) => {
  let headers = {
    authToken: authToken,
    "Content-Type": "application/json",
  };
  let promise = new Promise((resolve) => {
    axios
      .post(
        "https://bootcampspot.com/api/instructor/v1/sessionDetail",
        { sessionID: sessionId },
        { headers: headers }
      )
      .then(function (sessionData) {
        resolve(sessionData.data.session);
      })
      .catch(function (err) {
        console.log("something went wrong in axios.post /sessionDetail");
        resolve("error");
      });
  });
  return await promise;
};

const getAllSessionsDetail = async (authToken, sessionIds, enrollmentID) => {
  let sessions;
  let attendance = await getAttendanceByEnrollment(authToken, enrollmentID);
  sessions = await Promise.all(
    sessionIds.map((x) => getSessionDetail(authToken, x.sessionId))
  );
  sessions.forEach((s) => {
    let sAsst = attendance.filter((att) => att.sessionName === s.session.name);
    s.attendance = sAsst.filter((att) => att.present && !att.remote).length;
    s.remote = sAsst.filter((att) => att.remote).length;
    s.studentCount = sAsst.length;
  });
  return sessions;
};

const getSessionsByEnrollment = async (authToken, enrollmentID) => {
  let headers = {
    authToken: authToken,
    "Content-Type": "application/json",
  };
  let promise = new Promise((resolve, reject) => {
    axios
      .post(
        "https://bootcampspot.com/api/instructor/v1/sessions",
        { enrollmentID: enrollmentID },
        { headers: headers }
      )
      .then((courseData) => {
        let sessions = courseData.data.calendarSessions
          .filter((x) => x.category.code === "academic")
          .map((x) => {
            return {
              sessionId: x.session.id,
              date: x.session.startTime,
              sessionName: x.session.name,
            };
          });
        resolve(sessions);
      })
      .catch(function (err) {
        console.log(
          "something went wrong in axios.post /getSessionsByEnrollment"
        );
        resolve("error");
      });
  });
  return await promise;
};

const getEnrollmentsInternal = async (authToken) => {
  let headers = {
    authToken: authToken,
    "Content-Type": "application/json",
  };
  let promise = new Promise((resolve, reject) => {
    axios
      .get("https://bootcampspot.com/api/instructor/v1/me", {
        headers: headers,
      })
      .then((enrollmentData) => {
        resolve(enrollmentData);
      })
      .catch((err) => {
        console.log("something went wrong in axios.get /me ");
        resolve("error");
      });
  });
  return await promise;
};

const getAttendanceByEnrollment = async (authToken, enrollmentID) => {
  let headers = {
    authToken: authToken,
    "Content-Type": "application/json",
  };
  let courseID = await getCourseIdFromEnrollmentId(authToken, enrollmentID);
  let promise = new Promise((resolve, reject) => {
    axios
      .post(
        "https://bootcampspot.com/api/instructor/v1/attendance",
        { courseID: courseID },
        { headers: headers }
      )
      .then(({ data }) => {
        resolve(data);
      })
      .catch(function (err) {
        console.log(
          "something went wrong in axios.post /getAttendanceByCourse"
        );
        resolve("error");
      });
  });
  return await promise;
};

const getCourseIdFromEnrollmentId = async (authToken, enrollmentID) => {
  let headers = {
    authToken: authToken,
    "Content-Type": "application/json",
  };
  let promise = new Promise((resolve, reject) => {
    axios
      .get("https://bootcampspot.com/api/instructor/v1/me", {
        headers: headers,
      })
      .then((instructorData) => {
        resolve(
          instructorData.data.Enrollments.find((e) => e.id === enrollmentID)
            .courseId
        );
      })
      .catch(function (err) {
        console.log(
          "something went wrong in axios.post /getCourseIdFromEnrollmentId"
        );
        resolve("error");
      });
  });
  return await promise;
};

const formatAttendanceBySession = async (authToken, enrollmentID) => {
  let attendance = await getAttendanceByEnrollment(authToken, enrollmentID);
  let students = attendance.filter(
    (att) => attendance[0].sessionName === att.sessionName
  );
  const numStudents = students.length;
  let sessions = await getSessionsByEnrollment(authToken, enrollmentID);
  let format = [];
  sessions.forEach((session) => {
    if (new Date(session.date) < new Date()) {
      if (!format.map((f) => f.sessionName).includes(session.sessionName)) {
        let thisAttendance = attendance.filter(
          (att) => att.sessionName === session.sessionName
        );
        let howMany = 1;
        if (thisAttendance.length > numStudents) {
          howMany = thisAttendance.length / numStudents;
          if (!Number.isInteger(howMany)) throw new Error("Not an integer");
        }
        for (let i = 0; i < howMany; i++) {
          const sAtt = thisAttendance
            .filter((att, index) => index % howMany === i) // TODO: puts all records of same student first
            .map((att) => {
              return {
                studentName: att.studentName,
                attendance: att.pending
                  ? "pending"
                  : att.excused
                  ? "excused"
                  : att.remote
                  ? "remote"
                  : att.present
                  ? "present"
                  : "absent",
              };
            });
          format.push({
            sessionId: session.sessionId,
            sessionName: session.sessionName,
            date: session.date,
            students: sAtt,
          });
        }
      }
    }
  });
  return format;
};

module.exports = {
  login: function (req, res) {
    axios
      .post("https://bootcampspot.com/api/instructor/v1/login", req.body)
      .then((data) => {
        res.send(data.data);
      })
      .catch((err) => {
        res.send(err);
      });
  },
  getSessionsGet: (req, res) => {
    let enrollmentID = Number(req.params.enrollmentID);
    getSessionsByEnrollment(req.headers.authtoken, enrollmentID).then(
      (response) => {
        if (response === "error") res.json({ data: [] });
        else {
          getAllSessionsDetail(
            req.headers.authtoken,
            response,
            enrollmentID
          ).then((sessions) => {
            res.json(sessions);
          });
        }
      }
    );
  },
  getEnrollments: function (req, res) {
    getEnrollmentsInternal(req.headers.authtoken)
      .then((response) => {
        if (response.data) res.json(response.data);
        else res.json({ userAccount: { id: -1 } });
      })
      .catch((err) => {
        res.json(err);
      });
  },
  getAttendance: (req, res) => {
    formatAttendanceBySession(
      req.headers.authtoken,
      Number(req.params.enrollmentID)
    )
      .then((response) => {
        if (response) res.json(response);
        else res.json({ userAccount: { id: -1 } });
      })
      .catch((err) => {
        res.json(err);
      });
  },
};
