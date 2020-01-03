'use strict';

const DEFAULT_ENCODING = 'utf8';
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
        hr = this.makeTwoDigits(mth);
        hr = this.makeTwoDigits(hr);
        min = this.makeTwoDigits(min);
        sec = this.makeTwoDigits(sec);
        let dateTime = `${yr}-${mth}-${day} ${hr}:${min}:${sec}`;
        console.log(dateTime);
        return dateTime;
    }

    async create(pName, pScore) {
        console.log(pName);
        console.log(pScore);
        let dateTimeNow = this.getDateTime(); // CHANGE BACK TO FRONTEND
        console.log(dateTimeNow);
        try {
            return new Promise((resolve, reject) => {
                connDB.query(
                    'INSERT INTO all_scores_input(player_name, score, date_time) VALUES(?, ?, ?)',
                    [pName, pScore, dateTimeNow],
                    function(error, results, fields) {
                        if (error) {
                            console.error(error);
                        }
                        console.log(`${pName}'s score ${pScore} at ${dateTimeNow} recorded!`);
                        resolve(results);
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
