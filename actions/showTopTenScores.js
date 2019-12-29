'use strict';

async function showTopTenScores(score, req, res) {
    try {
        const topScores = await score.read();
        res.json({topScores});
    } catch (err) {
        console.error(err);
    }
}

module.exports = showTopTenScores;
