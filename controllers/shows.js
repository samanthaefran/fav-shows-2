// require dependencies
const express = require('express');

// create a router object
const showsRouter = express.Router();

const Show = require('../models/show');

// seed route

showsRouter.get('/shows/seed', async (req, res) => {
  const data = [
    {
      title: 'Schitts Creek',
      yearReleased: '2015',
      starring: 'Dan Levy', 
    },
    {
      title: 'Seinfeld',
      yearReleased: '1989',
      starring: 'Jerry Seinfeld', 
    },
    {
      title: 'New Girl',
      yearReleased: '2011',
      starring: 'Zoey Deschanel', 
    },
  ];
  await Show.deleteMany({});
  await Show.create(data)
  res.redirect('/shows');
});

showsRouter.get ('/destroy-data', async (req, res) => {
  await Show.deleteMany({});
  res.redirect('/shows');
})

//  index route
showsRouter.get('/shows', (req, res) => {
  Show.find({}, (error, shows) => {
    res.render('index.ejs', { shows });
  });
});

// new route 
showsRouter.get('/shows/new', (req,res) => {
  res.render('new.ejs');
});

// delete route
showsRouter.delete('/shows/:id', (req, res) => {
  Show.findByIdAndDelete(req.params.id, (err, deletedShow) => {
    res.redirect('/shows');
  });
});

// update route
showsRouter.put('/shows', (req, res) => {
  Show.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedShow) => {
    res.redirect(`/shows/${req.params.id}`);
  });
});

// create route
showsRouter.post('/shows', (req,res) => {
  Show.create(req.body, (err, show) => {
    res.send(show)
  })
})

module.exports = showsRouter;