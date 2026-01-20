export default function Home() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-32 pb-24">
      {/* Hero Content */}
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-black dark:text-white">
          Innovative IT Solutions & Training
          <br />
          <span className="text-gray-600 dark:text-gray-400">
            for a Smarter Tomorrow
          </span>
        </h1>

        <p className="mt-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Softwraith Solutions Private Limited delivers reliable software
          development, IT services, and industry-oriented training programs to
          help businesses and individuals grow in the digital era.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="/services"
            className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full text-sm font-semibold transition hover:opacity-90"
          >
            Explore Services
          </a>

          <a
            href="/training"
            className="border border-gray-300 dark:border-gray-700 px-6 py-3 rounded-full text-sm font-semibold text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 transition"
          >
            View Training Programs
          </a>
        </div>
      </div>
    </section>
  );
}
