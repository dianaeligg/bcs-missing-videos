// const db = require("../models");

// Defining methods for the booksController
module.exports = {
    landing: function(req, res) {
        console.log("hit generic.landing");
        return res.json({msg: "LANDING"});
    }
};
  