'use strict';

const NameScoreTime = require('../name_score_time');
const nameScoreTime = new NameScoreTime();

async function checkRank(score, req, res) {
    try {
        const rank = await nameScoreTime.checkRank();
        res.json({rank});
    } catch (err) {
        console.error(err);
    }
}

module.exports = checkRank;
