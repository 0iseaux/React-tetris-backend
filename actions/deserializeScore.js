'use strict';

async function deserializeScore(req) {
    try {
        const score = req.body;
        return score;
    } catch (err) {
        console.error(err);
    }
}

module.exports = deserializeScore;
