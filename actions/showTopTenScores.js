'use strict';

async function showTopTenScores(score, req, res) {
    try {
        const topScores = await nameScoreTime.read();
        res.json({topScores});
    } catch (err) {
        console.error(err);
    }
}

module.exports = showTopTenScores;
