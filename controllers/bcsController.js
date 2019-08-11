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

const getSessions = async (authToken, sessionIds) => {
  let sessions;
  sessions = await Promise.all( sessionIds.map(x => getSessionDetail(authToken, x)));
  return sessions;
}

const getSessionsByEnrollment = async (authToken, enrollmentID) => {
  let headers = {
    'authToken': authToken,
    'Content-Type': 'application/json'
  };
  let promise = new Promise((resolve, reject) => {
    axios.post("https://bootcampspot.com/api/instructor/v1/sessions", {enrollmentID: enrollmentID},{headers: headers})
        .then(function(courseData){
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


module.exports = {
  login: function(req, res) {
    axios.post("https://bootcampspot.com/api/instructor/v1/login", req.body).then( data => {
        res.send(data.data);
    }).catch(err =>{
        res.send(err);
    });
  },
  getSessionsGet: (req,res) => {
    getSessionsByEnrollment(req.headers.authtoken, Number(req.params.enrollmentID)).then( response => {
      if (response === 'error') res.json({data: []});
      getSessions(req.headers.authtoken,response).then(sessions => {
        res.json(sessions) ;
      } );
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
  }
};
