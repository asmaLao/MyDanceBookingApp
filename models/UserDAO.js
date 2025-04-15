const Datastore = require('nedb');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserDAO {

    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new Datastore({ filename: dbFilePath, autoload: true });
            console.log("UserDAO connected to", dbFilePath);
        } else {
            this.db = new Datastore();
        }
    }
    createOrganiser(username, password) {
        return bcrypt.hash(password, saltRounds)
            .then(hash => {
                const organiser = {
                    type: 'organiser',
                    username: username,
                    password: hash
                };
                return new Promise((resolve, reject) => {
                    this.db.insert(organiser, (err, doc) => {
                        if (err) reject(err);
                        else resolve(doc);
                    });
                });
            });
    }

    lookupOrganiser(username) {
        return new Promise((resolve, reject) => {
            this.db.findOne({ username: username, type: 'organiser' }, (err, doc) => {
                if (err) reject(err);
                else resolve(doc);
            });
        });
    }
    getAllOrganisers() {
        return new Promise((resolve, reject) => {
            this.db.find({ type: 'organiser' }, (err, docs) => {
                if (err) reject(err);
                else resolve(docs);
            });
        });
    }

    deleteOrganiser(id) {
        return new Promise((resolve, reject) => {
            this.db.remove({ _id: id }, {}, (err, numRemoved) => {
                if (err) reject(err);
                else resolve(numRemoved);
            });
        });
    }
    


   
}

const userDAO = new UserDAO('./data/organisers.db');  
module.exports = userDAO; 

