import { useState } from "react";
import api from "../utils/api";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "info", message: "Sending..." });

    try {
      await api.post("/contact", form);
      setStatus({ type: "success", message: "Message sent successfully!" });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({
        type: "error",
        message: err.response?.data?.message || "Server error. Please try again."
      });
    }
  };

  return (
    <>
      {/* Heading */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-semibold mb-4">Contact Us</h1>
        <p className="max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Reach out to Softwraith Solutions for services, training, or collaboration.
        </p>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 pb-32 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-8 border border-gray-200 dark:border-gray-800 rounded-2xl space-y-5"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded bg-transparent"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded bg-transparent"
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            className="w-full p-3 border rounded bg-transparent"
            required
          />

          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black"
          >
            Send Message
          </button>

          {status.message && (
            <div
              className={`p-3.5 border rounded-xl text-sm font-medium animate-fadeIn ${
                status.type === "success"
                  ? "bg-green-50 border-green-200 text-green-800"
                  : status.type === "error"
                  ? "bg-red-50 border-red-200 text-red-800"
                  : "bg-blue-50 border-blue-200 text-blue-800"
              }`}
            >
              {status.message}
            </div>
          )}
        </form>

        {/* Info */}
        <div className="p-8 border border-gray-200 dark:border-gray-800 rounded-2xl space-y-4">
          <p>
            <strong>Address:</strong><br />
            PPE-102, Peach Palm E, Omaxe Palm Green,<br />
            Sector-MU, Greater Noida – 201310
          </p>

          <p>
            <strong>Phone:</strong> +91 9891103337
          </p>

          <p>
            <strong>Email:</strong> softwraith.solutions@gmail.com
          </p>

          <p>
            <strong>Business Hours:</strong><br />
            Mon–Sat: 9:30 AM – 6:30 PM<br />
            Sunday: Closed
          </p>
        </div>
      </section>
    </>
  );
}
