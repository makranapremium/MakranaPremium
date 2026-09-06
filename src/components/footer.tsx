import {
  Instagram,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Heart,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 lg:gap-16">
          {/* Brand Section */}
          <div>
            <div className="mb-6 sm:mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Makrana Premium
              </h3>
              <p className="mt-2 sm:mt-3 text-gray-300 text-sm sm:text-base leading-relaxed">
                Exquisite marble craftsmanship blending tradition with luxury.
                Creating timeless beauty for your spaces.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 text-sm sm:text-base">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                <a
                  href="tel:+917976973338"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  +91 79769 73338
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                <a
                  href="mailto:abdulriyaz1009@gmail.com"
                  className="text-gray-300 hover:text-white transition-colors break-all"
                >
                  abdulriyaz1009@gmail.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 mt-1" />
                <span className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Opposite to Modi Masjid
                  <br />
                  Bypass Road, Makrana - 341505
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">
              Quick Links
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/#about" },
                { name: "Collections", href: "/collections" },
                { name: "Gallery", href: "/gallery" },
                { name: "Contact", href: "/contact" },
                { name: "Privacy Policy", href: "/privacy-policy" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center group text-sm sm:text-base"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services & Social */}
          <div>
            <h4 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">
              Our Services
            </h4>
            <ul className="space-y-2 sm:space-y-3 mb-6">
              {[
                "Custom Marble Cutting",
                "Installation Services",
                "Design Consultation",
                "Quality Assurance",
                "Maintenance Support",
              ].map((service) => (
                <li key={service}>
                  <span className="text-gray-300 flex items-center text-sm sm:text-base">
                    <ArrowRight className="w-3 h-3 mr-2 text-yellow-400" />
                    {service}
                  </span>
                </li>
              ))}
            </ul>

            {/* Social Media */}
            <div>
              <h5 className="text-sm sm:text-lg font-medium text-white mb-2 sm:mb-4">
                Follow Us
              </h5>
              <div className="flex space-x-3 sm:space-x-4">
                <a
                  href="https://www.instagram.com/makranapremiummarble?igsh=OXk0YTR6NDdhczM1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 text-sm sm:text-base">
            <div className="flex items-center space-x-2 text-gray-400 text-center sm:text-left">
              <span>© 2025 Makrana Premium. All Rights Reserved.</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-400 text-center sm:text-right">
              <span>Made with</span>
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 fill-current" />
              <span>in Rajasthan</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
