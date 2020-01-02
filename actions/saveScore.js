'use strict';

// const Express = require('express');
// const bodyParser = require('body-parser');
// const app = Express();

// const jsonParser = bodyParser.json();

const NameScoreTime = require('../NameScoreTime');
const nameScoreTime = new NameScoreTime();

async function saveScore(toSave, req, res) {
    try {
        const toSave = req.body;
        console.log(toSave);
        const saved = await nameScoreTime.create(toSave['playersName'], toSave['playersScore']);
        res.json({saved});
    } catch (err) {
        console.error(err);
    }
}

module.exports = saveScore;
