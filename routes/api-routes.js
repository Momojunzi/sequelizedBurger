var db = require("../models");

module.exports = function(app) {
  app.get('/', function(req,res) {
    db.Burger.findAll({}).then(function(results){
      var hbsObject = {
        burgers: results
      };
      res.render('index', hbsObject);
    });
  });

  app.post("/api/burgers", function(req, res){
    db.Burger.create({
      burger_name: req.body.burger_name,
      devoured: req.body.devoured
    }).then(function(results){
      res.json({id: results.insertId});
    });
  });

  app.put("/api/burgers/:id", function(req, res){
    console.log(req.body.devoured);
    db.Burger.update({
      devoured: req.body.devoured
    },{
      where: {
        id: req.body.id
      }
    }).then(function(results){
      if(results.changedRows == 0){
        return res.status(404).end();
      }else{
        res.status(200).end();
      }
    });
  });
};
