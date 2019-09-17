'use strict';

const { Router } = require('express');
const router = Router();
const Places = require('./../models/places');

// const checkLogin = require('./../controllers/check-login');

router.get('/create', /* checkLogin , */ (req, res, next) => {
    res.render('create');
});

router.post('/places', (req, res, next) => {
  const name = req.body.name;
  const address = req.body.address;
  const city = req.body.city;
  const zip = req.body.zip;
  const description = req.body.description;

  Places.create({
    name,
    address,
    city,
    zip,
    description
  })
  .then(places => {
    console.log('a place were created', places);
  })
  .catch(error => {
    console.log('an error occuried trying to create a place', error);
  });
  res.redirect('/places');
});

router.get('/places', /* checkLogin , */ (req, res, next) => {
  Places.find()
  .then(places => {
    console.log("IS this an array?",places);
    
    res.render('places', {places});
  })
  .catch(error => {
    console.log(error);
  });
});

module.exports = router;
