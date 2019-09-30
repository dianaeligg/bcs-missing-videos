const axios = require("axios");

const getSessionDetail = async (authToken,sessionId) => {
  let headers = {
    'authToken': authToken,
    'Content-Type': 'application/json'
  };
  let promise = new Promise(resolve=>{
    axios.post("https://bootcampspot.com/api/instructor/v1/sessionDetail", {sessionID: sessionId},{headers: headers})
      .then(function(sessionData){
          resolve(sessionData.data.session);
      }).catch(function(err){
          console.log("something went wrong in axios.post /sessionDetail");
          resolve("error");
      });
  })
  return await promise;
};

const getAllSessionsDetail = async (authToken, sessionIds, enrollmentID) => {
  let sessions;
  let courseID = await getCourseIdFromEnrollmentId(authToken, enrollmentID);
  let attendance = await getAttendanceByEnrollment(authToken, courseID);
  sessions = await Promise.all( sessionIds.map(x => getSessionDetail(authToken, x)));
  sessions.forEach( s => {
    let sAsst = attendance.data.filter(att => att.sessionName === s.session.name);
    s.attendance = sAsst.filter(att => att.present && !att.remote).length;
    s.remote = sAsst.filter(att => att.remote).length;
  });
  return sessions;
}

const getAttendanceByClass = async(authToken, sessionId) => {

}

const getSessionsByEnrollment = async (authToken, enrollmentID) => {
  let headers = {
    'authToken': authToken,
    'Content-Type': 'application/json'
  };
  let promise = new Promise((resolve, reject) => {
    axios.post("https://bootcampspot.com/api/instructor/v1/sessions", {enrollmentID: enrollmentID},{headers: headers})
        .then( courseData => {
          let sessionIds = courseData.data.calendarSessions
                        .filter(x => x.category.code === "academic")
                        .map(x => x.session.id);
          resolve(sessionIds);
      }).catch(function(err){
        console.log("something went wrong in axios.post /sessions");
        resolve("error");
      });
  });
  return await promise;
}

const getEnrollmentsInternal = async(authToken) => {
  let headers = {
    'authToken': authToken,
    'Content-Type': 'application/json'
  }
  let promise = new Promise ((resolve, reject) => {
  axios.get("https://bootcampspot.com/api/instructor/v1/me", {headers: headers})
    .then(enrollmentData => {
      resolve(enrollmentData);
    })
    .catch( err => {
      console.log("something went wrong in axios.get /me ")
      resolve("error");
    });
  });
  return await promise;
}

const getAttendanceByEnrollment = async(authToken, enrollmentID) => {
  let headers = {
    'authToken': authToken,
    'Content-Type': 'application/json'
  };
  let promise = new Promise((resolve, reject) => {
    axios.post("https://bootcampspot.com/api/instructor/v1/attendance", {courseID: enrollmentID},{headers: headers})
        .then(function(attendanceData){
          resolve(attendanceData);
      }).catch(function(err){
        console.log("something went wrong in axios.post /getAttendanceByEnrollment");
        resolve("error");
      });
  });
  return await promise;
}

const getCourseIdFromEnrollmentId = async(authToken, enrollmentID) => {
  let headers = {
    'authToken': authToken,
    'Content-Type': 'application/json'
  };
  let promise = new Promise((resolve, reject) => {
    axios.get("https://bootcampspot.com/api/instructor/v1/me",{headers: headers})
        .then(function(instructorData){
          resolve(instructorData.data.enrollments.filter(e => e.id === enrollmentID)[0].courseId);
      }).catch(function(err){
        console.log(err);
        console.log("something went wrong in axios.post /getCourseIdFromEnrollmentId");
        resolve("error");
      });
  });
  return await promise;
}


module.exports = {
  login: function(req, res) {
    axios.post("https://bootcampspot.com/api/instructor/v1/login", req.body).then( data => {
        res.send(data.data);
    }).catch(err =>{
        res.send(err);
    });
  },
  getSessionsGet: (req,res) => {
    let enrollmentID = Number(req.params.enrollmentID);
    getSessionsByEnrollment(req.headers.authtoken, enrollmentID).then( response => {
      if (response === 'error') 
        res.json({data: []});
      else{
        getAllSessionsDetail(req.headers.authtoken,response, enrollmentID).then(sessions => {
          res.json(sessions) ;
        } );
      }
    });
  },
  getEnrollments: function(req, res) {
    getEnrollmentsInternal(req.headers.authtoken).then(response => {
      if (response.data)
        res.json(response.data);
      else
        res.json({userAccount:{id:-1}});
    }).catch(err => {
      res.json(err);
    });
  },
  getAttendance: (req,res) => {
    getAttendanceByEnrollment(req.headers.authtoken, Number(req.params.enrollmentID)).then(response => {
      if (response.data)
        res.json(response.data);
      else
        res.json({userAccount:{id:-1}});
    }).catch(err => {
      res.json(err);
    });
  }
};
