const Courses: React.FC = () => {
  const courses = [
    {
      title: 'DIT',
      duration: '01 Year',
      description: 'Learn the fundamentals of Information Technology with hands-on training and industry-relevant skills.',
    },
    {
      title: 'CIT',
      duration: '06 Months',
      description: 'A short-term course to master computer applications and IT essentials for beginners.',
    },
    {
      title: 'OAT',
      duration: '03 Months',
      description: 'Office Automation Tools course to enhance productivity with software skills.',
    },
    {
      title: 'Graphic Designing',
      duration: '06 Months',
      description: 'Unleash your creativity with tools like Adobe Photoshop and Illustrator.',
    },
  ];

  return (
    <section className="bg-white text-teal-900 p-5 my-5">
      <h2 className="text-2xl font-bold mb-5">Available Courses</h2>
      <div className="flex flex-wrap justify-center gap-5">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg w-64 p-4 shadow hover:-translate-y-1 transition-transform"
          >
            <h3 className="text-xl font-semibold text-teal-900 mb-2">{course.title}</h3>
            <p className="text-sm">
              <strong>Duration:</strong> {course.duration}
            </p>
            <p className="text-sm">{course.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Courses;