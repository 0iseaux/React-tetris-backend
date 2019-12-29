'use strict';

const deserializeScore = require('./deserializeScore');
const NameScoreTime = require('../nameScoreTime');
const nameScoreTime = new NameScoreTime();

async function saveScore(score, req, res) {
    try {
        const saved = await nameScoreTime.create('Player', 100, 'date_time'); // ???????????????
        deserializeScore(req, res);
        res.json({saved});
    } catch (err) {
        console.error(err);
    }
}

module.exports = saveScore;
