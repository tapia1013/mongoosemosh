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
    isPublished: true
  });

  // SAVE TO DATABASE... async
  const result = await course.save();
  console.log(result);
}

// CALL IT
createCourse();






