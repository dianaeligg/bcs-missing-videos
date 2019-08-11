module.exports = {
    landing: function(req, res) {
        console.log("hit generic.landing");
        return res.json({msg: "LANDING"});
    }
};
  