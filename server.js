'use strict';
const connDB = require('./mySQLserver.js');
const Express = require('express');
const app = new Express();

const {saveScore, showTopTenScores, checkRank} = require('./actions');

const NameScoreTime = require('./nameScoreTime');
const nameScoreTime = new NameScoreTime();

const PORT = 3000;
const SCORES = 'scores';

app.post(`/${SCORES}`, saveScore.bind(null, nameScoreTime));
app.get(`/top${SCORES}`, showTopTenScores.bind(null, nameScoreTime));
app.get(`/${SCORES}`, checkRank.bind(null, nameScoreTime));

app.listen(PORT, err => {
    if (err) throw err;
    console.log(`Server started on http://localhost:${PORT}`);
});
