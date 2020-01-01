'use strict';
const connDB = require('./mySQLserver.js');

const Express = require('express');
// const bodyParser = require('body-parser');

const app = new Express();

app.use(Express.json());

// const jsonParser = bodyParser.json();

const {saveScore, showTopTenScores, checkRank} = require('./actions');

const NameScoreTime = require('./nameScoreTime');
const nameScoreTime = new NameScoreTime();

const PORT = 8080;
const SCORES = 'scores';
const OriginPORT = 3000;

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', `http://localhost:${OriginPORT}`);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.post(`/${SCORES}`, saveScore.bind(null, nameScoreTime));
app.get(`/top${SCORES}`, showTopTenScores.bind(null, nameScoreTime));
app.get(`/${SCORES}`, checkRank.bind(null, nameScoreTime));

app.listen(PORT, err => {
    if (err) throw err;
    console.log(`Server started on http://localhost:${PORT}`);
});
