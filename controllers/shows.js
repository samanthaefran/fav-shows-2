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