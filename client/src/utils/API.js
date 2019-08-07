import axios from "axios";
require('dotenv').config()

export default {
  getLanding: function(q) {
    return axios.get("/api/bcs/");
  },
  getSessions: function(enrollmentId) {
    return axios.get("/api/bcs/getSessions/" + enrollmentId, 
    {
      headers: {authToken: TEMP_AUTH_KEY}
    }
    );
  }
};
