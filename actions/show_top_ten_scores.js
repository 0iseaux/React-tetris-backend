'use strict';

const NameScoreTime = require('../name_score_time');
const nameScoreTime = new NameScoreTime();

async function showTopTenScores(topTen, req, res) {
    try {
        const topScores = await nameScoreTime.read();
        console.log('showTopTenScores', topScores);
        res.json({topScores});
    } catch (err) {
        console.error(err);
    }
}

module.exports = showTopTenScores;
