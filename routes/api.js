const express = require('express');
const Ninja = require('../models/ninjas');
const router = express.Router();

//get a list of ninjas from the db
router.get('/ninjas', function(req, res, next){
  
    // Ninja.geoNear(
    //     {type: 'Point',coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
    //     {maxDistance: 100000,spherical: true}
    // ).then(function(ninja) {
    //     res.send(ninja);
    // }).catch(next);
      // res.send({type: 'GET'})
      Ninja.aggregate([{ $geoNear: 
        { near: {type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]}, 
        spherical: true, maxDistance: 100000, distanceField: "dist.calculated" } }]
        ).then(function(ninja){ 
            res.send(ninja)
         }).catch(next);
    
})

//add a new ninja to the db
router.post('/ninjas', function(req, res, next){
    // console.log(req.body);
    // var ninja = new Ninja(req.body);
    // ninja.save();
    Ninja.create(req.body).then(function(ninja) {
        res.send(ninja)   
    }).catch(next);
//     res.send({type: 'POST',
//     name: req.body.name,
//     rank: req.body.rank
// })
})

//update a ninja in the db
router.put('/ninjas/:id', function(req, res, next){
    Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Ninja.findOne({_id: req.params.id}).then(function(ninja) {
            res.send(ninja)
        })
        
    })
    // res.send({type: 'PUT'})
})

//delete a ninja from the bd
router.delete('/ninjas/:id', function(req, res, next){
    //console.log(req.params.id);
    Ninja.findByIdAndRemove({_id: req.params.id}).then(function(ninja){
        res.send(ninja)
    })
    // res.send({type: 'DELETE'})
})

module.exports = router;