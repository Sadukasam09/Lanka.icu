import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Palmtree as PalmTree, Menu, X } from 'lucide-react';

interface NavbarProps {
  isScrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <PalmTree size={32} className="text-primary" />
          <span className="text-2xl font-bold text-primary">Ceylon Adventures</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `text-m font-medium transition-colors hover:text-primary ${
                isActive ? 'text-primary' : isScrolled ? 'text-neutral-800' : 'text-white'
              }`
            }
            end
          >
            Home
          </NavLink>
          <NavLink 
            to="/packages" 
            className={({ isActive }) => 
              `text-m font-medium transition-colors hover:text-primary ${
                isActive ? 'text-primary' : isScrolled ? 'text-neutral-800' : 'text-white'
              }`
            }
          >
            Tour Packages
          </NavLink>
          <NavLink 
            to="/destinations" 
            className={({ isActive }) => 
              `text-m font-medium transition-colors hover:text-primary ${
                isActive ? 'text-primary' : isScrolled ? 'text-neutral-800' : 'text-white'
              }`
            }
          >
            Destinations
          </NavLink>
          <NavLink 
            to="/testimonials" 
            className={({ isActive }) => 
              `text-m font-medium transition-colors hover:text-primary ${
                isActive ? 'text-primary' : isScrolled ? 'text-neutral-800' : 'text-white'
              }`
            }
          >
            Testimonials
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              `text-m font-medium transition-colors hover:text-primary ${
                isActive ? 'text-primary' : isScrolled ? 'text-neutral-800' : 'text-white'
              }`
            }
          >
            About
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => 
              `text-m font-medium transition-colors hover:text-primary ${
                isActive ? 'text-primary' : isScrolled ? 'text-neutral-800' : 'text-white'
              }`
            }
          >
            Contact
          </NavLink>
        </nav>

        <button className="btn btn-primary hidden md:inline-flex">Book Now</button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-neutral-800"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="container py-4 flex flex-col space-y-4">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors py-2 ${
                  isActive ? 'text-primary' : 'text-neutral-800'
                }`
              }
              onClick={toggleMenu}
              end
            >
              Home
            </NavLink>
            <NavLink 
              to="/packages" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors py-2 ${
                  isActive ? 'text-primary' : 'text-neutral-800'
                }`
              }
              onClick={toggleMenu}
            >
              Tour Packages
            </NavLink>
            <NavLink 
              to="/destinations" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors py-2 ${
                  isActive ? 'text-primary' : 'text-neutral-800'
                }`
              }
              onClick={toggleMenu}
            >
              Destinations
            </NavLink>
            <NavLink 
              to="/testimonials" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors py-2 ${
                  isActive ? 'text-primary' : 'text-neutral-800'
                }`
              }
              onClick={toggleMenu}
            >
              Testimonials
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors py-2 ${
                  isActive ? 'text-primary' : 'text-neutral-800'
                }`
              }
              onClick={toggleMenu}
            >
              About
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors py-2 ${
                  isActive ? 'text-primary' : 'text-neutral-800'
                }`
              }
              onClick={toggleMenu}
            >
              Contact
            </NavLink>
            <button className="btn btn-primary w-full mt-4">Book Now</button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;