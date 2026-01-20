import { useEffect, useState } from "react";
import { authFetch } from "../../utils/api";

export default function Trainings() {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrainings = async () => {
      try {
        const res = await authFetch({
          method: "GET",
          url: "/api/courses",   // backend endpoint
        });

        setTrainings(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Trainings error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadTrainings();
  }, []);

  if (loading) {
    return <div>Loading trainings...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">My Trainings</h1>

      {trainings.length === 0 ? (
        <p>No trainings enrolled yet.</p>
      ) : (
        <ul className="space-y-3">
          {trainings.map((t) => (
            <li
              key={t._id}
              className="p-4 bg-white border rounded-lg"
            >
              <h3 className="font-medium">{t.title}</h3>
              <p className="text-sm text-gray-600">{t.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
