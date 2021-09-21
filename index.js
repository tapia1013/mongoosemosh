const mongoose = require('mongoose');

// returns a promise
mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Could not connect to mongodb...', err))


// Schema to define shape of document
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

// Classes, objects
// Human, John
// Course, nodeCOurse

// Compile Schema into a model
const Course = mongoose.model('Course', courseSchema);

// async function to save
async function createCourse() {
  // Create object based on the Class Course
  const course = new Course({
    // initialize course object
    name: 'React.js Course',
    author: 'Vee',
    tags: ['react', 'frontend'],
    isPublished: false
  });

  // SAVE TO DATABASE... async
  const result = await course.save();
  console.log(result);
}
// CALL IT
// createCourse();

async function getCourses() {
  /**
   *               OPERATORS
   * eq (equal)
   * ne (not equal)
   * gt (greater than)
   * gte (greater than or equal to)
   * lt( less than)
   * lte (less than or equal to)
   * in
   * nin (not in)
   * 
   * 
   *           LOGIC OPERATORS
   * or
   * and
   * 
   */

  // for skip pagination
  const pageNumber = 2;
  const pageSize = 10;
  // /api/course?pageNumber=2&pageSize=10


  const courses = await Course
    .find({ author: 'Vee', isPublished: true })
    // get all courses that are greater than $10
    // .find({ price: { $gte: 10, $lte: 20 } })
    // for multiple values we use $in
    // .find({ price: { $in: [10, 15, 20] } })
    // Logic Operators
    // .find()
    // .or([{ author: 'Mosh' }, { isPublished: true }])
    // .and([{}])
    // regex
    // .find({ author: /^Jay/ })
    // author ends with string
    // .find({ author: /Vee$/ })
    // author contains vee
    // .find({ author: /.*Vee.*/i })

    // SKIP IS FOR PAGINATION
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tag: 1 })
    // Count
    .count() // 2
  console.log(courses);
}
getCourses()



// 14.Excerise.1



