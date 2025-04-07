const nedb = require('nedb');
const { init } = require('../app');
class AppModel{
    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new nedb({ filename: dbFilePath, autoload: true });
            console.log('DB connected to ' + dbFilePath);
        } else {
            this.db = new nedb();
        }
    
    }

    // adding a sample user to test loging functionality
init() { 
    const sample ={
     username: 'organiser1',
     password: 'pasword123'
    };
    this.db.insert(sample, (err, doc) => {
        if (err) {
          console.log('Error inserting sample user:', err);
        } else {
          console.log('Sample organiser inserted:', doc);
        }
      });
 }
// Check if a user with the given username and password exists
validateUser(username, password) {
    return new Promise((resolve, reject) => {
        this.db.findOne({ username, password }, (err, user) => {
          if (err) {
            console.log('Error in validateUser:', err);
            reject(err);
          } else {
            resolve(user);
          }
        });
      });
  }
 

}
module.exports=AppModel;
