const db = require("../db/db.json")
const fs = require("fs")
const util = require('util')
const path = require('path')

const writeFileAsync = util.promisify(fs.writeFile)

module.exports = function(app) {

    app.get('/api/db', function(req, res) {
        res.json(db);
    });

    app.post("/api/db", function(req, res) {
       let note = req.body;
       
       console.log(`Adding note: ${note.title}`);
       db.push(note);

       writeFileAsync(path.join(__dirname,'../db/db.json'), JSON.stringify(db))
        .then(() => {
            console.log('Jobs done!')
        })
        res.json(note)
    });
}