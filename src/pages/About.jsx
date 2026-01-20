import Layout from "../components/Layout";
import shailendra from "../assets/director-shailendra.jpg";
import meena from "../assets/director-meena.jpg";

export default function About() {
  return (

      <section className="max-w-7xl mx-auto px-6 py-20">
        {/* About Company */}
        <div className="max-w-3xl mb-20">
          <h1 className="text-4xl font-bold text-black dark:text-white">
            About Softwraith Solutions
          </h1>

          <p className="mt-6 text-gray-700 dark:text-gray-400 leading-relaxed">
            Softwraith Solutions Private Limited is a technology-driven company
            delivering innovative IT services, custom software solutions, and
            industry-focused training programs. We help businesses, institutions,
            and individuals adopt modern technologies with confidence.
          </p>

          <p className="mt-4 text-gray-700 dark:text-gray-400 leading-relaxed">
            With a strong focus on quality, reliability, and long-term value,
            Softwraith Solutions bridges the gap between technology and education
            through practical, scalable, and future-ready solutions.
          </p>
        </div>

        {/* Leadership Section */}
        <div>
          <h2 className="text-3xl font-bold text-black dark:text-white mb-10">
            Leadership
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-4xl">
            {/* Director 1 */}
            <div className="flex items-center gap-6">
              <img
                src={shailendra}
                alt="Shailendra Singh Chauhan"
                className="w-24 h-24 rounded-full object-cover border border-gray-200 dark:border-gray-800"
              />

              <div>
                <h3 className="text-xl font-semibold text-black dark:text-white">
                  Shailendra Singh Chauhan
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Director
                </p>
              </div>
            </div>

            {/* Director 2 */}
            <div className="flex items-center gap-6">
              <img
                src={meena}
                alt="Mrs. Meena Bhadauria"
                className="w-24 h-24 rounded-full object-cover border border-gray-200 dark:border-gray-800"
              />

              <div>
                <h3 className="text-xl font-semibold text-black dark:text-white">
                  Mrs. Meena Bhadauria
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Director
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}
