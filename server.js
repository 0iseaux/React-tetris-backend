'use strict';

const Express = require('express');

const app = new Express();

const PORT = 8080;

app.use(Express.json());

const {saveScore, showTopTenScores, checkRank} = require('./actions');

const NameScoreTime = require('./name_score_time');
const nameScoreTime = new NameScoreTime();

const DOMAIN = 'tetris.fyr.fyi';
const SCORES = 'scores';

// const OriginPORT = 3000;

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', `https://${DOMAIN}`);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.post(`/${SCORES}`, saveScore.bind(null, nameScoreTime));
app.get(`/top${SCORES}`, showTopTenScores.bind(null, nameScoreTime));
app.get(`/rank${SCORES}`, checkRank.bind(null, nameScoreTime));

app.listen(PORT, err => {
    if (err) throw err;
});
