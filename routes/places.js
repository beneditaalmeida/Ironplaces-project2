'use strict';

const { Router } = require('express');
const router = Router();
const Places = require('./../models/places');
// const User = require('./../models/user');


router.get('/create',(req, res, next) => {
  res.render('create');
});

router.post('/places', (req, res, next) => {
  const name = req.body.name;
  const address = req.body.address;
  const city = req.body.city;
  const zip = req.body.zip;
  const description = req.body.description;
  const category = req.body.category;
  
  Places.create({
    name,
    address,
    city,
    zip,
    description, 
    category
  })
  .then(places => {
    console.log('a place were created', places);
  })
  .catch(error => {
    console.log('an error occuried trying to create a place', error);
  });
  res.redirect('/places');
});

router.get('/places', (req, res, next) => {
  Places.find()
  .then(places => {  
    res.render('places', {places});
  })
  .catch(error => {
    console.log(error);
  });
});


 // ----------- FIND PLACES ROUTE --------------

router.get('/find-places',(req, res, next) => {
  Places.find()
  .then(places => {  
    res.render('find-places', {places});
  })
  .catch(error => {
    console.log(error);
  });
});

router.post('/find-places/restaurants',(req, res, next) => {
  Places.find({category:"restaurants"})
  .then(places => {  
    console.log(places);
    res.render('find-places', {places});
  })
  .catch(error => {
    console.log(error);
  });
});

router.post('/find-places/drink-dance',(req, res, next) => {
  Places.find({category:"drink and dance"})
  .then(places => {  
    console.log(places);
    res.render('find-places', {places});
  })
  .catch(error => {
    console.log(error);
  });
});

router.post('/find-places/useful',(req, res, next) => {
  Places.find({category:"useful"})
  .then(places => {  
    console.log(places);
    res.render('find-places', {places});
  })
  .catch(error => {
    console.log(error);
  });
});


 // ----------- EDIT PLACES ROUTE --------------

router.get('/edit-place/:id',(req, res, next) => {
  const id = req.params.id;
  Places.findById(id)
  .then((places) => {
    res.render('edit-place', places);
  })
  .catch(error => {
    console.log("there was an error here!!!", error);
  });
});

router.get('/find-places/:category.restaurants', (req, res, next) => {
  const category = req.paramas.gategory.restaurants;
  Places.find(category)
  .then((places) => {
    res.render('restaurants', places);
  })
  .catch(error => {
    console.log('you have an error here!', error);
  });
});

router.post('/edit-place/:id', (req, res, next) => {
  const id = req.params.id;
  const name = req.body.name;
  const address = req.body.address;
  const city = req.body.city;
  const zip = req.body.zip;
  const description = req.body.description;
  const category = req.body.category;
  
  Places.findByIdAndUpdate(id, {
    name,
    address,
    city,
    zip,
    description,
    category
  })
  .then(places => {
    console.log('your places has been edited', places);
    res.redirect('/places');
  })
  .catch(error => {
    console.log('error trying to edit', error);
  });
});
 // ----------- END OF EDIT PLACES ROUTES--------------


// ----------- DELETE PLACE ROUTE --------------
router.get('/delete-place/:id', (req, res, next) => {
  const id = req.params.id;
  const name = req.body.name;
  const address = req.body.address;
  const city = req.body.city;
  const zip = req.body.zip;
  const description = req.body.description;
  const category = req.body.category;
  
  Places.findByIdAndDelete(id, {
    name,
    address,
    city,
    zip,
    description,
    category
  })
  .then(places => {
    console.log('weel done!', places);
    res.render('delete-place');
  })
  .catch(error => {
    console.log('there was an error when you tried to delete', error);
  });
});

module.exports = router;
