'use strict';

const NameScoreTime = require('../name_score_time');
const nameScoreTime = new NameScoreTime();

async function saveScore(toSave, req, res) {
    try {
        const toSave = req.body;
        const saved = await nameScoreTime.create(toSave['playersName'], toSave['playersScore']);
        res.json({saved});
    } catch (err) {
        console.error(err);
    }
}

module.exports = saveScore;
