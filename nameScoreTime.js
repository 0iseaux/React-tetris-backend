'use strict';

const DEFAULT_ENCODING = 'utf8';
const prompt = require('prompt-sync')();
const connDB = require('./mySQLserver.js');

class NameScoreTime {
    makeTwoDigits(n) {
        if (n < 10) {
            n = n.toString();
            n = '0' + n;
        }
        return n;
    }
    getDateTime() {
        let tsNow = Date.now();
        let today = new Date(tsNow);
        let yr = today.getFullYear();
        let mth = today.getMonth() + 1;
        let day = today.getDate();
        let hr = today.getHours();
        let min = today.getMinutes();
        let sec = today.getSeconds();
        hr = this.makeTwoDigits(hr);
        min = this.makeTwoDigits(min);
        sec = this.makeTwoDigits(sec);
        let dateTime = `${yr}-${mth}-${day} ${hr}:${min}:${sec}`;
        console.log(dateTime);
        return dateTime;
    }

    async create(pName, pScore) {
        const nameScoreTime = {
            playersName: pName,
            playersScore: pScore,
            dateTime: this.getDateTime(),
        };

        // scores.push(score); // ????????????
        try {
            return new Promise((resolve, reject) => {
                connDB.query(
                    'INSERT INTO all_scores_input(player_name, score, date_time) VALUES(?, ?, ?)',
                    [pName, pScore, nameScoreTime.dateTime],
                    function(error, results, fields) {
                        console.log(
                            `${pName}'s score ${pScore} at ${nameScoreTime.dateTime} recorded!`,
                        );
                        resolve(results);
                        /*{
    "saved": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 0,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}*/
                    },
                );
            });
        } catch (err) {
            console.error(err);
        }
    }
    /*
        return new Promise(resolve => {
            fs.readFile(this._filename, DEFAULT_ENCODING, (error, data) => {
                if (error) return resolve([]);

                return resolve(JSON.parse(data));
            });
        });
        */
    async read() {
        try {
            return new Promise((resolve, reject) => {
                connDB.query(
                    'SELECT player_name, score, date_time FROM all_scores_input ORDER BY score DESC LIMIT 10',
                    function(error, results, fields) {
                        console.log('selectTopTen', results);
                        resolve(results);
                    },
                );
            });
        } catch (err) {
            console.error(err);
        }
    }

    async checkRank() {
        try {
            return new Promise((resolve, reject) => {
                connDB.query(
                    // SELECT x.player_name,x.score, x.rank FROM (SELECT player_name, score, @rownum := @rownum + 1 AS rank FROM all_scores_input JOIN (SELECT @rownum := 0) r ORDER BY t.score) x WHERE x.player_name = 'Player' AND x.score = '100'
                    `SELECT COUNT(*) from all_scores_input WHERE score > "100"`, // test pScore value only!
                    function(error, results, fields) {
                        console.log('checkRank', results); // undefined
                        resolve(results);
                    },
                );
            });
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = NameScoreTime;
