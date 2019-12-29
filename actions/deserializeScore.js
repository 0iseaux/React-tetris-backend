'use strict';

async function deserializeScore(req) {
    try {
        const nameScoreTime = req.body;
        return nameScoreTime;
    } catch (err) {
        console.error(err);
    }
}

module.exports = deserializeScore;
