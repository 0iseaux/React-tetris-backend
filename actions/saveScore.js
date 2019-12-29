'use strict';

const deserializeScore = require('./deserializeScore');
const Score = require('../score');
const score = new Score();

async function saveScore(score, req, res) {
    try {
        const saved = await score.create('Player', 100); // ???????????????
        deserializeScore(req, res);
        res.json({saved});
    } catch (err) {
        console.error(err);
    }
}

module.exports = saveScore;
