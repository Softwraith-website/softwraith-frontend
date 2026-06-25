import { useEffect, useState } from "react";
import { BookOpen, Search, Sparkles } from "lucide-react";
import courseService from "../services/courseService";
import CourseCard from "../components/ui/CourseCard";
import EnrollButton from "../components/EnrollButton";
import Spinner from "../components/ui/Spinner";
import EmptyState from "../components/ui/EmptyState";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");

  useEffect(() => {
    courseService.getAll()
      .then(setCourses)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = ["All", ...new Set(courses.map((c) => c.category).filter(Boolean))];
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  const filtered = courses.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch = !q || c.title.toLowerCase().includes(q) || c.description?.toLowerCase().includes(q);
    const matchCat = selectedCategory === "All" || c.category === selectedCategory;
    const matchLevel = selectedLevel === "All" || c.level === selectedLevel;
    return matchSearch && matchCat && matchLevel;
  });

  if (loading) {
    return <div className="min-h-[60vh] flex items-center justify-center"><Spinner size="lg" /></div>;
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 border border-blue-200">
          <Sparkles className="w-3.5 h-3.5" />
          LMS Portal
        </div>
        <h1 className="text-4xl font-bold text-gray-900 leading-tight">
          Explore Our Training Programs
        </h1>
        <p className="mt-4 max-w-2xl text-gray-600">
          Enhance your career with our industry-led, project-focused technical training courses.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 mb-10 pb-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition
                  ${selectedCategory === cat ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 transition text-sm"
            />
          </div>
        </div>

        {/* Level filter */}
        <div className="flex gap-2">
          {levels.map((lv) => (
            <button
              key={lv}
              onClick={() => setSelectedLevel(lv)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold border transition
                ${selectedLevel === lv ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}
            >
              {lv}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No Courses Found"
          message="No courses match your search or filter."
          icon={BookOpen}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              href={`/courses/${course._id}`}
              action={<EnrollButton course={course} />}
            />
          ))}
        </div>
      )}
    </section>
  );
}
