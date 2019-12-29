'use strict';
const connDB = require('./mySQLserver.js');
const Express = require('express');
const app = new Express();

const {saveScore, showTopTenScores, checkRank} = require('./actions');

const Score = require('./score');
const score = new Score();

const PORT = 3000;
const SCORES = 'scores';

app.post(`/${SCORES}`, saveScore.bind(null, score));
app.get(`/top${SCORES}`, showTopTenScores.bind(null, score));
app.get(`/${SCORES}`, checkRank.bind(null, score));

app.listen(PORT, err => {
    if (err) throw err;
    console.log(`Server started on http://localhost:${PORT}`);
});
