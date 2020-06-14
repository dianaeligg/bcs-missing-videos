import axios from "axios";
import { BCS_TOKEN } from "../localKeys";


const getAuthToken = () => localStorage.getItem(BCS_TOKEN);

export default {
  getLanding: () => {
    return axios.get("/api/bcs/");
  },
  login: (email,password) => {
    let loginInfo = { email: email, password: password};
    return axios.post("api/bcs/login",loginInfo);
  },
  getSessions: enrollmentId => {
    return axios.get("/api/bcs/getSessions/" + enrollmentId, 
    {
      headers: {authToken: getAuthToken()}
    });
  },
  getEnrollments: () => {
    return axios.get("/api/bcs/getEnrollments/",{
      headers: {authToken: getAuthToken()}
    }) ;
  },
  getAttendance: enrollmentId => {
    return axios.get("/api/bcs/getAttendance/"+enrollmentId,{
      headers: {authToken: getAuthToken()}
    });
  },
  getAttendanceFilter: enrollmentId => {
    return axios.get(`/api/bcs/getAttendance/${enrollmentId}/filter`,{
      headers: {authToken: getAuthToken()}
    });
  },
  getAssignments: enrollmentId => {
    return axios.get(`/api/bcs/getAssignments/${enrollmentId}`,{
      headers: {authToken: getAuthToken()}
    });
  }
};
