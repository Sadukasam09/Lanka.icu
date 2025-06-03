import React from 'react';
import { Link } from 'react-router-dom';
import { Palmtree as PalmTree, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-white pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <PalmTree size={24} className="text-primary" />
              <span className="text-lg font-bold">Ceylon Adventures</span>
            </div>
            <p className="text-neutral-400 mb-6">
              Experience the beauty and culture of Sri Lanka with our expertly guided tours.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-neutral-400 hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/packages" className="text-neutral-400 hover:text-primary transition-colors">Tour Packages</Link>
              </li>
              <li>
                <Link to="/destinations" className="text-neutral-400 hover:text-primary transition-colors">Destinations</Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-neutral-400 hover:text-primary transition-colors">Testimonials</Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-400 hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-400 hover:text-primary transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-primary mt-1 flex-shrink-0" />
                <span className="text-neutral-400">123 Galle Road, Colombo, Sri Lanka</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-primary flex-shrink-0" />
                <span className="text-neutral-400">+94 11 234 5678</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-primary flex-shrink-0" />
                <span className="text-neutral-400">info@ceylon-adventures.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-neutral-400 mb-4">Subscribe to our newsletter for travel updates and special offers.</p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white"
              />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-12 pt-8 text-center">
          <p className="text-neutral-500">
            &copy; {new Date().getFullYear()} Ceylon Adventures. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;