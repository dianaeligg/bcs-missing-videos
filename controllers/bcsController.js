// const db = require("../models");
const axios = require("axios");


const getSessionInternal = async (authToken,sessionId) => {
  let headers = {
    'authToken': authToken,
    'Content-Type': 'application/json'
  };
  console.log("sessionId " + sessionId);
  let promise = new Promise((resolve,reject) => {
    axios.post("https://bootcampspot.com/api/instructor/v1/sessionDetail", {sessionID: sessionId},{headers: headers})
      .then(function(sessionData){
          if(sessionData.data.session.videoUrlList.length === 0){
              console.log(sessionData.data.session.session.shortDescription);
              console.log(sessionData.data.session.videoUrlList);
          }
          //res.json(sessionData.data.session);
          resolve(sessionData.data.session);
      }).catch(function(err){
          console.log("something went wrong in axios.post /sessionDetail");
          console.log(err);
          resolve("error");
      });
  });
  let result = await promise;
  console.log("result " + result);
  return result;
};

const getSessionsInternal = async(authToken, enrollmentID) =>{
  let headers = {
    'authToken': authToken,
    'Content-Type': 'application/json'
  };
  console.log(enrollmentID);
  let promise = new Promise((resolve, reject) => {
    axios.post("https://bootcampspot.com/api/instructor/v1/sessions", {enrollmentID: enrollmentID},{headers: headers})
      .then(function(courseData){
        console.log(courseData.data.calendarSessions[0]);
        let sessions = courseData.data.calendarSessions
                      .filter(x => x.category.code === "academic")
                      .map(x => { return {
                                id: x.session.id,
                                name: x.session.name,
                                data: getSessionInternal(authToken, x.session.id)
                              }
                            });
        
        resolve(sessions);
    }).catch(function(err){
      console.log("something went wrong in axios.post /sessions");
      console.log(err);
      resolve("error");
    });
  });
  let result = await promise;
  console.log("result " + result);
  return result;
};

const getSessionDetail = async (authToken,sessionId) => {
  let headers = {
    'authToken': authToken,
    'Content-Type': 'application/json'
  };
  let promise = new Promise(resolve=>{
  console.log("sessionId " + sessionId);
    axios.post("https://bootcampspot.com/api/instructor/v1/sessionDetail", {sessionID: sessionId},{headers: headers})
      .then(function(sessionData){
          resolve(sessionData.data.session);
      }).catch(function(err){
          console.log("something went wrong in axios.post /sessionDetail");
          console.log(err);
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
        console.log(courseData.data.calendarSessions[0]);
        let sessionIds = courseData.data.calendarSessions
                      .filter(x => x.category.code === "academic")
                      .map(x => x.session.id);
        resolve(sessionIds);
    }).catch(function(err){
      console.log("something went wrong in axios.post /sessions");
      console.log(err);
      resolve("error");
    });
});
return await promise;
}


module.exports = {
  getLogin: (req,res) => {
    res.send("getLogin");
  },
  login: function(req, res) {
    console.log("posting /loginOnly");
    console.log(req.body);
    axios.post("https://bootcampspot.com/api/instructor/v1/login", req.body).then( data => {
        console.log(data.data);
        res.send(data.data);
    }).catch(err =>{
        res.send(err);
    });
  },
  getSession: (req, res) => {
    console.log("posting /getSession");
    console.log(req.body.sessionID);
    getSessionInternal(req.headers.authtoken, req.body.sessionID).then( result => {
      console.log("result2 " + result[0]);
      res.json(result);
    });
  },
  getSessions: (req, res) => {
    console.log("posting /getSessions");
    getSessionsByEnrollment(req.headers.authtoken, req.body.enrollmentID).then( sessionIds => {
      getSessions(req.headers.authtoken,sessionIds).then(sessions => res.json(sessions) );
    });
  },
  update: function(req, res) {
    db.Book
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Book
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
