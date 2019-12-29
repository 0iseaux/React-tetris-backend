'use strict';

async function checkRank(score, req, res) {
    try {
        const rank = await nameScoreTime.checkRank();
        res.json({rank});
    } catch (err) {
        console.error(err);
    }
}

module.exports = checkRank;
