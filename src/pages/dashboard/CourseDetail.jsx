import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../utils/api";

export default function CourseDetail() {
  const { courseId } = useParams();
  const [lectures, setLectures] = useState([]);
  const [activeLecture, setActiveLecture] = useState(null);

  useEffect(() => {
    api
      .get(`/lectures/${courseId}`)
      .then((res) => {
        setLectures(res.data);
        if (res.data.length > 0) {
          setActiveLecture(res.data[0]);
        }
      })
      .catch((err) => console.error(err));
  }, [courseId]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Lecture List */}
      <aside className="lg:col-span-1 border rounded-lg p-4">
        <h2 className="font-semibold mb-4">Lectures</h2>

        <ul className="space-y-2">
          {lectures.map((lec) => (
            <li
              key={lec._id}
              onClick={() => setActiveLecture(lec)}
              className={`cursor-pointer p-2 rounded ${
                activeLecture?._id === lec._id
                  ? "bg-gray-200 font-medium"
                  : "hover:bg-gray-100"
              }`}
            >
              {lec.title}
            </li>
          ))}
        </ul>
      </aside>

      {/* Video Player */}
      <section className="lg:col-span-3 border rounded-lg p-6">
        {activeLecture ? (
          <>
            <h1 className="text-xl font-semibold mb-4">
              {activeLecture.title}
            </h1>

            <video
              src={activeLecture.videoUrl}
              controls
              className="w-full rounded-lg bg-black"
            />

            {activeLecture.description && (
              <p className="mt-4 text-gray-600">
                {activeLecture.description}
              </p>
            )}
          </>
        ) : (
          <p>No lectures available</p>
        )}
      </section>
    </div>
  );
}
