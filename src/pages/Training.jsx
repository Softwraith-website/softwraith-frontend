const trainings = [
  {
    title: "Full-Stack Web Development",
    description:
      "End-to-end web development training covering HTML, CSS, JavaScript, React, Node.js, and databases with real-world projects.",
    duration: "12 Weeks",
    audience: "Students & Professionals",
  },
  {
    title: "Python Programming",
    description:
      "From fundamentals to advanced concepts including data handling, scripting, and problem-solving using Python.",
    duration: "8 Weeks",
    audience: "Beginners",
  },
  {
    title: "Data Science & AI Fundamentals",
    description:
      "Hands-on introduction to data analysis, machine learning concepts, and practical AI applications.",
    duration: "10 Weeks",
    audience: "Students & Working Professionals",
  },
  {
    title: "Cloud Computing",
    description:
      "Practical training on cloud fundamentals, deployment models, and real-world cloud-based solutions.",
    duration: "6 Weeks",
    audience: "IT Aspirants",
  },
  {
    title: "Corporate IT Training",
    description:
      "Customized training programs for organizations to upskill teams in modern technologies and tools.",
    duration: "Flexible",
    audience: "Enterprises",
  },
  {
    title: "Internship & Project Mentorship",
    description:
      "Industry-linked internships and guided projects to build practical experience and job readiness.",
    duration: "Ongoing",
    audience: "College Students",
  },
];

export default function Training() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Heading */}
      <div className="max-w-3xl mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-black dark:text-white">
          Training & Skill Development
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Our training programs are designed to bridge the gap between academics
          and industry by focusing on practical skills, real-world projects, and
          career readiness.
        </p>
      </div>

      {/* Training Cards */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {trainings.map((item, index) => (
          <div
            key={index}
            className="
  border border-gray-200 dark:border-gray-800
  rounded-xl p-6
  bg-white dark:bg-black
  transition-all duration-300
  hover:-translate-y-1 hover:shadow-lg
  dark:hover:border-gray-600 dark:hover:shadow-[0_0_0_1px_rgba(255,255,255,0.1)]
"

          >
            <h3 className="text-xl font-semibold text-black dark:text-white mb-3">
              {item.title}
            </h3>

            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
              {item.description}
            </p>

            <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <p>
                <strong>Duration:</strong> {item.duration}
              </p>
              <p>
                <strong>Ideal For:</strong> {item.audience}
              </p>
            </div>

            <button
              className="mt-6 inline-block px-5 py-2 rounded-full text-sm font-semibold
                         bg-black text-white dark:bg-white dark:text-black"
            >
              Enquire Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
