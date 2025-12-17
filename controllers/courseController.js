const Course = require('../models/Course');
const CourseEnrollment = require('../models/CourseEnrollment');

const createCourse = async (req, res) => {
  try {
    const { title, description, instructor, duration, price, category, level, syllabus } = req.body;
    
    if (!title || !description || !instructor || !duration || !price || !category) {
      return res.status(400).json({ success: false, message: 'All required fields must be filled' });
    }

    const course = new Course({
      title,
      description,
      instructor,
      duration,
      price,
      category,
      level: level || 'Beginner',
      syllabus: syllabus || [],
      image: req.body.image || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&q=80'
    });

    await course.save();
    console.log(`✅ Course created: ${title}`);

    return res.json({ success: true, message: 'Course created successfully', course });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({ status: 'active' }).sort({ createdAt: -1 });
    return res.json({ success: true, courses });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    return res.json({ success: true, courses });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const enrollCourse = async (req, res) => {
  try {
    const { courseId, studentName, email, phone, qualification, experience, userEmail } = req.body;
    
    if (!courseId || !studentName || !email || !phone || !qualification) {
      return res.status(400).json({ success: false, message: 'All required fields must be filled' });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const enrollment = new CourseEnrollment({
      courseId,
      studentName,
      email,
      phone,
      qualification,
      experience: experience || '',
      enrolledBy: userEmail
    });

    await enrollment.save();
    
    // Update enrolled students count
    await Course.findByIdAndUpdate(courseId, { $inc: { enrolledStudents: 1 } });

    console.log(`✅ Course enrollment: ${studentName} enrolled in ${course.title}`);

    return res.json({ success: true, message: 'Enrolled successfully', enrollment });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    return res.json({ success: true, message: 'Course updated successfully', course });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);
    
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    return res.json({ success: true, message: 'Course deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getEnrollments = async (req, res) => {
  try {
    const enrollments = await CourseEnrollment.find().populate('courseId').sort({ enrollmentDate: -1 });
    return res.json({ success: true, enrollments });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { createCourse, getCourses, getAllCourses, enrollCourse, updateCourse, deleteCourse, getEnrollments };