// const db = require("../models");
const axios = require("axios");


const getSessionInternal = async (authToken,body) => {
  let sessionID = body.sessionId;
  let headers = {
    'authToken': authToken,
    'Content-Type': 'application/json'
  };
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
  console.log()
  let promise = new Promise((resolve, reject) => {
    axios.post("https://bootcampspot.com/api/instructor/v1/sessions", {enrollmentID: enrollmentID},{headers: headers})
      .then(function(courseData){
        console.log(courseData.data.calendarSessions[0]);
        let sessionIds = courseData.data.calendarSessions.filter(x => x.category.code === "academic").map(x => x.session.id);
        
        resolve();
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
    getSessionInternal(req.headers.authtoken, req.body).then( result => {
      console.log("result2 " + result);
      res.json(result);
    });
  },
  getSessions: (req, res) => {
    console.log("posting /getSessions");
    getSessionsInternal(req.headers.authtoken, req.body.enrollmentID).then( result => {
      console.log("result2 " + result);
      res.json(result);
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
