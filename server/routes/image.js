const express = require('express');
const router = express.Router();
const config = require('../config/key');

router.get('/search', (req, res) => {
  var api_url = config.NaverOpenAPIUrl + '?query=' + encodeURI(req.query.query);

  var request = require('request');
  console.log('JJH', req.query.query);
  var options = {
    url: api_url,
    headers: {
      'X-Naver-Client-Id': config.NaverClientID,
      'X-Naver-Client-Secret': config.NaverClientSecret,
    },
  };
  request.get(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log('error = ' + response.statusCode);
    }
  });
});

router.post('/favorited', (req, res) => {
  //내가 이 영화를 Favorite 리스트에 넣었는지 정보를 DB에서 가져오기
  Favorite.find({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, info) => {
    if (err) return res.status(400).send(err);

    let result = false;
    if (info.length !== 0) {
      result = true;
    }

    res.status(200).json({ success: true, favorited: result });
  });
});

router.post('/removeFavorite', (req, res) => {
  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).send(err);

    return res.status(200).json({ success: true });
  });
});

router.post('/addToFavorite', (req, res) => {
  const favorite = new Favorite(req.body);

  favorite.save((err, doc) => {
    if (err) return res.status(400).send(err);

    return res.status(200).json({ success: true });
  });
});

router.post('/getFavoredMovie', (req, res) => {
  Favorite.find({ userFrom: req.body.userFrom }).exec((err, favorites) => {
    if (err) return res.status(400).send(err);

    return res.status(200).json({ success: true, favorites });
  });
});

module.exports = router;
