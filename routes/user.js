'use strict';

const { Router } = require('express');
const router = Router();
const User = require('./../models/user');
const bcrypt = require('bcryptjs');

const checkLogin = require('./../controllers/check-login');

router.get('/', (req, res, next) => {
  res.render('sign-in');
  // res.redirect('sign-in');
});


router.get('/sign-up', (req, res, next) => {
  res.render('sign-up');
});

router.post('/sign-up', (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  bcrypt.hash(password, 10)
    .then(hash => {
      return User.create({
        username,
        email,
        passwordHash: hash,
        role: 'STUDENT'
      });
    })
    .then(user => {
      req.session.user = {
        _id: user._id,
        role: user.role
      };
      res.redirect('/find-places');
    })
    .catch(error => {
      console.log('There was an error in the sign up process.', error);
    });
});

router.get('/sign-in', (req, res, next) => {
  res.render('sign-in');
});

router.post('/sign-in', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  
  let auxUser;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        res.redirect('error');
      } else {
        auxUser = user;
        return bcrypt.compare(password, user.passwordHash);
      }
    })
    .then(matches => {
      if (!matches) {
        res.redirect('error');
      } else {
        req.session.user = {
          _id: auxUser._id
        };
        res.redirect('find-places');
      }
    })
    .catch(error => {
      
      console.log('signin signup error', error);
      next(error);
    });
});

router.get('/profile', checkLogin , (req, res, next) => {
  User.findById(req.session.user._id)
  .then((user) => {
    console.log(user);
    res.render('profile', user);
  })
  .catch((error) => {
    console.log(error);
  });
 });

router.get('/edit-user', checkLogin, (req, res, next) => {
  User.findById(req.session.user._id)
  .then((user) => {
    console.log(user);
    res.render('edit-user', user);
  })
  .catch((error) => {
    console.log(error);
  });
 });

 router.post('/edit-user',(req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;

  User.updateOne({_id: req.session.user._id}, {
    username: username,
    email:email
  })
    .then(user=> {
      console.log(user);
      res.redirect('/profile');
    })
    .catch(error => {
      console.log('Error updating user profile', error);
    });
 });


 router.get("/delete-user", (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;

  User.deleteOne({_id: req.session.user._id}, {
    username: username,
    email:email
  })
    .then(user=> {
      console.log(user);
      res.render('delete-user');
    })
    .catch(error => {
      console.log('Error deleting user profile', error);
    });
});


router.get("/sign-out", (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/sign-in");
  });
});

module.exports = router;

