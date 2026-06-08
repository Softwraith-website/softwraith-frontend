import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Search, ArrowRight, Sparkles } from "lucide-react";
import api from "../utils/api";
import Spinner from "../components/ui/Spinner";
import EmptyState from "../components/ui/EmptyState";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await api.get("/courses");
        setCourses(data);
      } catch (err) {
        console.error("Failed to load courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const categories = ["All", ...new Set(courses.map((c) => c.category).filter(Boolean))];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 border border-blue-200">
          <Sparkles className="w-3.5 h-3.5" />
          LMS Portal
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
          Explore Our Training Programs
        </h1>
        <p className="mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
          Enhance your career with our industry-led, project-focused technical training courses. Self-paced and cohort-supported modules.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-10 pb-6 border-b border-gray-200">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition
                ${selectedCategory === cat
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 transition text-sm"
          />
        </div>
      </div>

      {/* Grid */}
      {filteredCourses.length === 0 ? (
        <EmptyState
          title="No Courses Found"
          message="We couldn't find any courses matching your search or category filter."
          icon={BookOpen}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between"
            >
              {/* Optional Thumbnail Placeholder/Draw */}
              <div className="bg-gray-950 aspect-video flex items-center justify-center p-6 text-white relative">
                <BookOpen className="w-10 h-10 text-blue-500 opacity-60" />
                <span className="absolute bottom-4 left-4 bg-gray-900/80 backdrop-blur text-xs font-semibold px-2.5 py-1 rounded border border-gray-800 uppercase tracking-wider">
                  {course.category || "General"}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-snug">
                    {course.title}
                  </h3>
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                    {course.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    {course.price > 0 ? `Rs ${course.price}` : "Free"}
                  </span>

                  <Link
                    to={`/courses/${course._id}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
                  >
                    View details
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
