import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* BRAND */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Softwraith
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Building practical technology solutions and future-ready talent
            through real-world engineering and training.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            Quick links
          </h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-gray-900">Home</Link></li>
            <li><Link to="/about" className="hover:text-gray-900">About</Link></li>
            <li><Link to="/services" className="hover:text-gray-900">Services</Link></li>
            <li><Link to="/contact" className="hover:text-gray-900">Contact</Link></li>
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            What we do
          </h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Software Development</li>
            <li>IT Services</li>
            <li>Industry Training</li>
            <li>Mentorship</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            Contact
          </h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Email: softwraith.solutions@gmail.com</li>
            <li>Location:📍PPE-102, Peach Palm E, Omaxe Palm Green, Greater Noida</li>
          </ul>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-gray-200 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Softwraith. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
