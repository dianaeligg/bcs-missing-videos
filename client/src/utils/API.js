import axios from "axios";

export default {
  getLanding: function(q) {
    return axios.get("/api/bcs/");
  },
  getSavedBooks: function() {
    return axios.get("/api/books");
  },
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
