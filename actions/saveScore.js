'use strict';

// const Express = require('express');
// const bodyParser = require('body-parser');
// const app = Express();

// const jsonParser = bodyParser.json();

const NameScoreTime = require('../nameScoreTime');
const nameScoreTime = new NameScoreTime();

async function saveScore(nameScoreTimeToSave, req, res) {
    try {
        const nameScoreTimeToSave = req.body;
        const saved = await nameScoreTime.create(
            nameScoreTimeToSave['nameScoreTime']['playersName'],
            nameScoreTimeToSave['nameScoreTime']['playersScore'],
        );
        res.json({saved});
    } catch (err) {
        console.error(err);
    }
}

module.exports = saveScore;
