import React, { useState } from 'react';
import { Container, Row, Col, Card, Dropdown, Form, InputGroup } from 'react-bootstrap';
import '../styles/CourseCatalog.css';
import { useNavigate } from 'react-router-dom';

const courses = [
  {
    id: 1,
    title: 'Introduction to Machine Learning',
    level: 'Beginner',
    duration: '8 weeks',
    instructor: 'Dr. Sarah Johnson',
    description: 'Learn the fundamentals of machine learning algorithms and applications.',
    category: 'Machine Learning',
    image: 'course1.jpg',
  },
  {
    id: 2,
    title: 'Advanced Python Programming',
    level: 'Intermediate',
    duration: '10 weeks',
    instructor: 'Prof. Michael Chen',
    description: 'Master advanced Python concepts including decorators, generators, and more.',
    category: 'Programming',
    image: 'course2.jpg',
  },
  {
    id: 3,
    title: 'Data Structures & Algorithms',
    level: 'Intermediate',
    duration: '12 weeks',
    instructor: 'Dr. James Wilson',
    description: 'Comprehensive guide to data structures and algorithm design techniques.',
    category: 'Computer Science',
    image: 'course3.jpg',
  },
  {
    id: 4,
    title: 'Web Development with React',
    level: 'Intermediate',
    duration: '10 weeks',
    instructor: 'Dr. Emily Davis',
    description: 'Build dynamic and responsive web applications using React.',
    category: 'Web Development',
    image: 'course4.jpg',
  },
  {
    id: 5,
    title: 'Introduction to Data Science',
    level: 'Beginner',
    duration: '8 weeks',
    instructor: 'Prof. Robert Brown',
    description: 'Learn the basics of data analysis, visualization, and basic statistics.',
    category: 'Data Science',
    image: 'course5.jpg',
  },
  {
    id: 6,
    title: 'Advanced JavaScript Concepts',
    level: 'Intermediate',
    duration: '6 weeks',
    instructor: 'Dr. Laura Green',
    description: 'Dive deep into advanced JavaScript topics such as closures, promises, and async/await.',
    category: 'Programming',
    image: 'course6.jpg',
  },
  {
    id: 7,
    title: 'Artificial Intelligence Fundamentals',
    level: 'Advanced',
    duration: '14 weeks',
    instructor: 'Prof. John Taylor',
    description: 'Explore the core concepts of AI, including search algorithms, neural networks, and machine learning.',
    category: 'Artificial Intelligence',
    image: 'course7.jpg',
  },
  {
    id: 8,
    title: 'Mobile App Development with Flutter',
    level: 'Intermediate',
    duration: '10 weeks',
    instructor: 'Dr. Kate Martinez',
    description: 'Learn to build mobile applications using the Flutter framework.',
    category: 'Mobile Development',
    image: 'course8.jpg',
  },
  {
    id: 9,
    title: 'Database Management Systems',
    level: 'Intermediate',
    duration: '12 weeks',
    instructor: 'Prof. Alan Smith',
    description: 'Understand the principles of database design, normalization, and querying with SQL.',
    category: 'Database',
    image: 'course9.jpg',
  },
  {
    id: 10,
    title: 'Cloud Computing with AWS',
    level: 'Advanced',
    duration: '16 weeks',
    instructor: 'Dr. Mike Lee',
    description: 'Learn how to deploy applications and manage infrastructure using Amazon Web Services (AWS).',
    category: 'Cloud Computing',
    image: 'course10.jpg',
  },
  {
    id: 11,
    title: 'Introduction to Cloud Computing',
    level: 'Beginner',
    duration: '8 weeks',
    instructor: 'Dr. Anna White',
    description: 'Understand the basics of cloud computing and services like AWS, Google Cloud, and Azure.',
    category: 'Cloud Computing',
    image: 'course11.jpg',
  },
  {
    id: 12,
    title: 'Full Stack Web Development',
    level: 'Advanced',
    duration: '16 weeks',
    instructor: 'Prof. William Black',
    description: 'Learn to build complete web applications using front-end and back-end technologies like React, Node.js, and MongoDB.',
    category: 'Web Development',
    image: 'course12.jpg',
  },
  {
    id: 13,
    title: 'Game Development with Unity',
    level: 'Intermediate',
    duration: '12 weeks',
    instructor: 'Dr. Lucas Young',
    description: 'Learn the fundamentals of game development using the Unity game engine.',
    category: 'Game Development',
    image: 'course13.jpg',
  },
  {
    id: 14,
    title: 'Cybersecurity Basics',
    level: 'Beginner',
    duration: '6 weeks',
    instructor: 'Prof. Chloe Harris',
    description: 'Learn the key principles of cybersecurity, including encryption, firewalls, and common threats.',
    category: 'Cybersecurity',
    image: 'course14.jpg',
  },
  {
    id: 15,
    title: 'Introduction to Blockchain Technology',
    level: 'Beginner',
    duration: '8 weeks',
    instructor: 'Dr. Oscar Evans',
    description: 'Explore the fundamentals of blockchain technology and its applications in cryptocurrencies and beyond.',
    category: 'Blockchain',
    image: 'course15.jpg',
  },
  {
    id: 16,
    title: 'Data Analysis with Python',
    level: 'Intermediate',
    duration: '10 weeks',
    instructor: 'Prof. Mark Wilson',
    description: 'Learn how to analyze and visualize data using Python libraries such as Pandas, NumPy, and Matplotlib.',
    category: 'Data Science',
    image: 'course16.jpg',
  },
  {
    id: 17,
    title: 'Introduction to Natural Language Processing',
    level: 'Advanced',
    duration: '12 weeks',
    instructor: 'Dr. Olivia Carter',
    description: 'Learn about Natural Language Processing (NLP) and work with tools like NLTK and spaCy for text analysis.',
    category: 'Artificial Intelligence',
    image: 'course17.jpg',
  },
  {
    id: 18,
    title: 'Introduction to IoT (Internet of Things)',
    level: 'Beginner',
    duration: '8 weeks',
    instructor: 'Prof. Sarah Adams',
    description: 'Understand the principles behind IoT, including sensors, data collection, and cloud connectivity.',
    category: 'IoT',
    image: 'course18.jpg',
  },
  {
    id: 19,
    title: 'Digital Marketing and SEO',
    level: 'Intermediate',
    duration: '10 weeks',
    instructor: 'Dr. Brian Parker',
    description: 'Learn how to implement effective digital marketing strategies and improve website visibility using SEO techniques.',
    category: 'Digital Marketing',
    image: 'course19.jpg',
  },
  {
    id: 20,
    title: 'Introduction to DevOps Practices',
    level: 'Intermediate',
    duration: '12 weeks',
    instructor: 'Prof. Elizabeth Green',
    description: 'Explore the principles and practices of DevOps, including continuous integration, delivery, and monitoring.',
    category: 'DevOps',
    image: 'course20.jpg',
  },
  {
    id: 21,
    title: 'Introduction to Data Science',
    level: 'Beginner',
    duration: '10 weeks',
    instructor: 'Dr. Emily Thompson',
    description: 'Learn the basics of data science, including data manipulation, visualization, and basic statistics.',
    category: 'Data Science',
    image: 'course21.jpg',
  },
  {
    id: 22,
    title: 'Advanced React Development',
    level: 'Advanced',
    duration: '12 weeks',
    instructor: 'Prof. James Lee',
    description: 'Dive deeper into React development, covering advanced patterns, hooks, and state management techniques.',
    category: 'Web Development',
    image: 'course22.jpg',
  },
  {
    id: 23,
    title: 'Machine Learning with TensorFlow',
    level: 'Intermediate',
    duration: '10 weeks',
    instructor: 'Dr. Michael Brown',
    description: 'Learn how to build and train machine learning models using TensorFlow and Keras.',
    category: 'Machine Learning',
    image: 'course23.jpg',
  },
  {
    id: 24,
    title: 'Introduction to Augmented Reality',
    level: 'Beginner',
    duration: '8 weeks',
    instructor: 'Prof. William Walker',
    description: 'Explore the world of augmented reality (AR) and learn how to create AR applications.',
    category: 'AR/VR',
    image: 'course24.jpg',
  },
  {
    id: 25,
    title: 'JavaScript for Web Development',
    level: 'Beginner',
    duration: '8 weeks',
    instructor: 'Dr. Rachel Scott',
    description: 'Learn the basics of JavaScript and its application in web development.',
    category: 'Web Development',
    image: 'course25.jpg',
  },
  {
    id: 26,
    title: 'Deep Learning Fundamentals',
    level: 'Advanced',
    duration: '12 weeks',
    instructor: 'Prof. David Martin',
    description: 'Master deep learning techniques including neural networks, CNNs, RNNs, and more.',
    category: 'Artificial Intelligence',
    image: 'course26.jpg',
  },
  {
    id: 27,
    title: 'Introduction to UX/UI Design',
    level: 'Beginner',
    duration: '8 weeks',
    instructor: 'Dr. Jessica King',
    description: 'Learn the fundamentals of UX/UI design, including user-centered design, wireframing, and prototyping.',
    category: 'Design',
    image: 'course27.jpg',
  },
  {
    id: 28,
    title: 'Mobile App Development with Flutter',
    level: 'Intermediate',
    duration: '10 weeks',
    instructor: 'Prof. Daniel Harris',
    description: 'Learn how to develop cross-platform mobile applications using Flutter.',
    category: 'Mobile Development',
    image: 'course28.jpg',
  },
  {
    id: 29,
    title: 'Introduction to Agile Methodology',
    level: 'Beginner',
    duration: '6 weeks',
    instructor: 'Dr. Lisa Clark',
    description: 'Learn the basics of Agile methodology and how to implement Agile in your projects.',
    category: 'Project Management',
    image: 'course29.png',
  },
  {
    id: 30,
    title: 'Full Stack JavaScript Development',
    level: 'Advanced',
    duration: '16 weeks',
    instructor: 'Prof. Robert Lewis',
    description: 'Master full stack web development using JavaScript, covering Node.js, Express, React, and MongoDB.',
    category: 'Web Development',
    image: 'course30.jpg',

  },
];




const CourseCatalog = () => {
  const navigate = useNavigate();

  const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');

  // State to manage the filters and search query
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle category selection change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Handle level selection change
  const handleLevelChange = (level) => {
    setSelectedLevel(level);
  };

  // Filter courses based on search term, category, and level
  const filteredCourses = courses.filter((course) => {
    const matchesSearchTerm =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All Categories' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All Levels' || course.level === selectedLevel;

    return matchesSearchTerm && matchesCategory && matchesLevel;
  });

  return (
    <div className="d-flex">
      {/* Main Content */}
      <div className="content flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold">Course Catalog</h4>
          <button className="btn btn-outline-secondary">Help</button>
        </div>

        {/* Search & Filters */}
        <div className="d-flex gap-3 mb-4 flex-wrap">
          {/* Search Field */}
          <InputGroup className="search-box">
            <Form.Control
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </InputGroup>

          {/* Categories Dropdown */}
          <Dropdown>
            <Dropdown.Toggle className="border">
              {selectedCategory}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleCategoryChange('All Categories')}>
                All Categories
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleCategoryChange('Data Science')}>
                Data Science
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleCategoryChange('Programming')}>
                Programming
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleCategoryChange('Computer Science')}>
                Computer Science
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleCategoryChange('Web Development')}>
                Web Development
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleCategoryChange('Artificial Intelligence')}>
                Artificial Intelligence
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleCategoryChange('Database')}>
                Database
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* Levels Dropdown */}
          <Dropdown>
            <Dropdown.Toggle className="border">
              {selectedLevel}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleLevelChange('All Levels')}>
                All Levels
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleLevelChange('Beginner')}>
                Beginner
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleLevelChange('Intermediate')}>
                Intermediate
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleLevelChange('Advanced')}>
                Advanced
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <Row>
          {filteredCourses.map(course => (
            <Col sm={12} md={6} lg={4} key={course.id} className="mb-4" data-aos="fade-up">

              <Card className="shadow-sm h-100">
                <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
                  <img
                    src={`/images/${course.image}`}
                    alt={course.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                </div>

                <Card.Body className="d-flex flex-column justify-content-between">
                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="badge bg-light text-dark">{course.level}</span>
                      <span className="badge bg-secondary text-light">{course.duration}</span>
                    </div>
                    <Card.Title>{course.title}</Card.Title>
                    <Card.Text>{course.description}</Card.Text>
                    <p className="instructor">
                      <strong>Instructor:</strong> {course.instructor}
                    </p>
                  </div>

                  {/* Push button to bottom */}
                  <div className="mt-auto">
                    {enrolledCourses.includes(course.id) ? (
                      <button
                        className="btn btn-success w-100"
                        onClick={() =>
                          navigate(`/home/student/course/${course.id}/lesson/1`, { state: { course } })} // navigate to the lesson page
                      >
                        Continue Learning
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary w-100"
                        onClick={() => navigate(`/home/enroll/${course.id}`, { state: { course } })} // navigate to the enroll page
                      >
                        Enroll Now
                      </button>
                    )}
                  </div>


                </Card.Body>

              </Card>
            </Col>
          ))}
        </Row>



      </div>
    </div>
  );
};

export default CourseCatalog;