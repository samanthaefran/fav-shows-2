// require dependencies
const { default: axios } = require('axios');
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

showsRouter.get('/destroy-data', async (req, res) => {
  await Show.deleteMany({});
  res.redirect('/shows');
})

// root route
showsRouter.get('/', (req, res) => {
  res.render('home.ejs')
})

//  index route
showsRouter.get('/shows', (req, res) => {
  Show.find({}, (error, shows) => {
    res.render('index.ejs', { shows });
  });
});

// new route 
showsRouter.get('/shows/new', (req, res) => {
  res.render('new.ejs');
});

// delete route
showsRouter.delete('/shows/:id', (req, res) => {
  Show.findByIdAndDelete(req.params.id, (err, deletedShow) => {
    res.redirect('/shows');
  });
});

// update route
showsRouter.put('/shows/:id', (req, res) => {
  Show.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedShow) => {
    console.log(req.params.id);
    res.redirect(`/shows/${req.params.id}`);
  });
});

// create route
showsRouter.post('/shows', (req, res) => {
  Show.create(req.body, (err, show) => {
    res.redirect('/shows');
  })
})

// edit route
showsRouter.get('/shows/:id/edit', (req, res) => {
  Show.findById(req.params.id, (error, show) => {
    res.render("edit.ejs", { show }
    )
  });
});

// show route
showsRouter.get('/shows/:id', (req, res) => {
  Show.findById(req.params.id, (err, show) => {
    axios.get(`https://www.omdbapi.com/?apikey=3feafbbd&t=${show.title}`).
      then(data => {
        let showImg = data.data.Poster
        let showYear = data.data.Year
        let showActors = data.data.Actors
        console.log(showYear)
        res.render("show.ejs", { show, showImg, showYear, showActors })
      })
  });
});

module.exports = showsRouter;