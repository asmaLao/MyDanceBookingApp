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

    addCourse(name, description, duration, startDate, time,  price, location) {
        const newCourse = {
          type: 'course',
          name,
          description,
          duration,
          startDate,
          time,
          price: parseFloat(price),
          location,
          createdAt: new Date().toISOString()
        };
      
        return new Promise((resolve, reject) => {
          this.db.insert(newCourse, (err, doc) => {
            if (err) reject(err);
            else {
              console.log('Course added:', doc);
              resolve(doc);
            }
          });
        });
      }

      getAllCourses() {
        return new Promise((resolve, reject) => {
          this.db.find({type: 'course'}, (err, docs) => {
            if (err) {
              reject(err);
            } else {
              resolve(docs);
              console.log('Courses fetched:', docs);
            }
          });
        });
      }

      deleteCourse(courseId) {
        return new Promise((resolve, reject) => {
          this.db.remove({ _id: courseId }, {}, (err, numRemoved) => {
            if (err) {
              reject(err);
            } else {
              resolve(numRemoved);
            }
          });
        });
      }

      getCourseById(id) {
        return new Promise((resolve, reject) => {
          this.db.findOne({ _id: id }, (err, doc) => {
            if (err) reject(err);
            else resolve(doc);
          });
        });
      }
      
      updateCourse(id, updatedFields) {
        return new Promise((resolve, reject) => {
          this.db.update({ _id: id }, { $set: updatedFields }, {}, (err, numUpdated) => {
            if (err) reject(err);
            else resolve(numUpdated);
          });
        });
      }
      
      addEnrolment(courseId, name, email) {
        const enrolment = {
          type: 'enrolment',
          courseId,
          name,
          email,
          enrolledAt: new Date().toISOString()
        };
      
        return new Promise((resolve, reject) => {
          this.db.insert(enrolment, (err, doc) => {
            if (err) reject(err);
            else {
              console.log('New enrolment:', doc);
              resolve(doc);
            }
          });
        });
      }
      getCourseById(courseId) {
        return new Promise((resolve, reject) => {
          this.db.findOne({ _id: courseId, type: 'course' }, (err, course) => {
            if (err) {
              reject(err);
            } else {
              resolve(course);
            }
          });
        });
      }

      getEnrolmentsByCourse(courseId) {
        return new Promise((resolve, reject) => {
          this.db.find({ type: 'enrolment', courseId }, (err, enrolments) => {
            if (err) reject(err);
            else resolve(enrolments);
          });
        });
      }
      
      // Get all organisers
getAllOrganisers() {
    return new Promise((resolve, reject) => {
      this.db.find({ type: 'organiser' }, (err, docs) => {
        if (err) reject(err);
        else resolve(docs);
      });
    });
  }
  
  // Add organiser
  addOrganiser(username, password) {
    const organiser = {
      type: 'organiser',
      username,
      password
    };
    return new Promise((resolve, reject) => {
      this.db.insert(organiser, (err, doc) => {
        if (err) reject(err);
        else {
          console.log('Organiser added:', doc);
          resolve(doc);
        }
      });
    });
  }
  
  // Delete organiser
  deleteOrganiser(id) {
    return new Promise((resolve, reject) => {
      this.db.remove({ _id: id }, {}, (err, numRemoved) => {
        if (err) reject(err);
        else resolve(numRemoved);
      });
    });
  }
  
      
      


}
module.exports=AppModel;
