const nedb = require('nedb');
const path = require('path');
class AppModel{
    
    constructor(dbFilePath) {
        if (dbFilePath) {
          const fullPath = path.join(__dirname, '..', dbFilePath);
          this.db = new nedb({ filename: fullPath, autoload: true });
          console.log('DB connected to ' + fullPath);
        } else {
          this.db = new nedb(); 
        }
    
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
      
  
  
      
      


}
module.exports=AppModel;
