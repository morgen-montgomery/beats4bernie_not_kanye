var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function Albums() {
  return knex('albums');
}

router.get('/albums', function(req, res, next) {
  Albums().select().then(function (records) {
    console.log(records);
    res.render('albums/index', { allAlbums: records });
  });
});

router.post('/albums', function(req, res, next) {
  if (req.body.explicit === 'on') {
    req.body.explicit = true;
  }
  else {
    req.body.explicit = false;
  }
  // console.log(req.body);

  const data = {
    name: req.body.album_name,
    artist: req.body.artist_name,
    genre: req.body.genre,
    stars: Number.parseInt(req.body.album_rating),
    explicit: req.body.explicit
  };

  console.log(data);

  Albums().insert(data).then(function() {
    res.redirect('/albums');
  });
});

router.get('/albums/new', function(req, res, next) {
  res.render('albums/new');
});


router.get('/albums/:id', function(req, res, next) {
  Albums().where({ id: req.params.id }).first().then(function (record) {
    res.render('albums/show', { theAlbum: record });
  });
});

router.get('/albums/:id/edit', function(req, res, next) {
  const id = req.params.id;

  Albums().where({ id: id }).first().then(function(record) {
    res.render('albums/edit', { theAlbum: record });
  });
});

router.post('/albums/:id/update', function(req, res, next) {
  const id = req.params.id;

  const data = {
    name: req.body.album_name,
    artist: req.body.artist_name,
    genre: req.body.genre,
    stars: Number.parseInt(req.body.album_rating),
    explicit: req.body.explicit
  };

  Albums().where({ id: id }).update(data, '*').then(function(record) {
    res.redirect('/albums/' + id);
  });
});

router.post('/albums/:id/delete', function(req, res, next) {
  console.log('deleting');
  const id = req.params.id;

  Albums().where({ id: id }).del().then(function(record) {
    res.redirect('/albums');
  });
});



module.exports = router;
