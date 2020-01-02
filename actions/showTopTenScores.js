'use strict';

const NameScoreTime = require('../NameScoreTime');
const nameScoreTime = new NameScoreTime();

async function showTopTenScores(topTen, req, res) {
    try {
        const topScores = await nameScoreTime.read();
        res.json({topScores});
    } catch (err) {
        console.error(err);
    }
}

module.exports = showTopTenScores;
