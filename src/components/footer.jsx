import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-black border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-black dark:text-white">
              Softwraith Solutions
            </h3>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Softwraith Solutions Private Limited is a technology-driven company
              providing IT services, software development, and industry-oriented
              training programs for businesses and individuals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-black dark:text-white">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/training" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                  Training
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-black dark:text-white">
              Contact
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                📍 Greater Noida, Uttar Pradesh, India
              </li>
              <li>
                📧 softwraith.solutions@gmail.com
              </li>
              <li>
                📞 +91-9891103337
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            © {new Date().getFullYear()} Softwraith Solutions Private Limited. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
