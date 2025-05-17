// src/components/Navbar.tsx
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-emerald-900 py-4 sticky top-0 z-50 shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-white text-2xl font-extrabold tracking-tight hover:text-emerald-300 transition-colors duration-300 transform hover:scale-105 pb-1.5"
            >
              Better
            </Link>
            <div className="hidden md:flex ml-10 space-x-8">
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  isActive 
                    ? "text-emerald-300 font-medium tracking-wide border-b-2 border-emerald-300 pb-1 transition-all duration-300" 
                    : "text-white font-medium tracking-wide hover:text-emerald-300 hover:border-b-2 hover:border-emerald-300 transition-all duration-300 pb-1"
                }
              >
                About Us
              </NavLink>
              <NavLink 
                to="/calculator" 
                className={({ isActive }) => 
                  isActive 
                    ? "text-emerald-300 font-medium tracking-wide border-b-2 border-emerald-300 pb-1 transition-all duration-300" 
                    : "text-white font-medium tracking-wide hover:text-emerald-300 hover:border-b-2 hover:border-emerald-300 transition-all duration-300 pb-1"
                }
              >
                Mortgage Calculator
              </NavLink>
              <NavLink 
                to="/start" 
                className={({ isActive }) => 
                  isActive 
                    ? "text-emerald-300 font-medium tracking-wide border-b-2 border-emerald-300 pb-1 transition-all duration-300" 
                    : "text-white font-medium tracking-wide hover:text-emerald-300 hover:border-b-2 hover:border-emerald-300 transition-all duration-300 pb-1"
                }
              >
                Start Page
              </NavLink>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-5">
            <div className="rounded-full bg-white/10 p-2 cursor-pointer hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
            </div>
            <button className="text-white font-medium hover:text-emerald-300 transition-colors duration-300 relative group">
              Sign in
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-300 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <Link
              to="/start"
              className="bg-emerald-400 text-emerald-900 font-semibold py-2.5 px-7 rounded-full hover:bg-emerald-300 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              Continue
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-emerald-300 transition-colors duration-300"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu with slide animation */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="space-y-2 py-2">
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                isActive
                  ? "block text-emerald-300 bg-emerald-900/50 font-medium px-3 py-2.5 rounded-md transition-colors duration-300"
                  : "block text-white hover:bg-emerald-800 hover:text-emerald-300 font-medium px-3 py-2.5 rounded-md transition-colors duration-300"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </NavLink>
            <NavLink 
              to="/calculator" 
              className={({ isActive }) => 
                isActive
                  ? "block text-emerald-300 bg-emerald-900/50 font-medium px-3 py-2.5 rounded-md transition-colors duration-300"
                  : "block text-white hover:bg-emerald-800 hover:text-emerald-300 font-medium px-3 py-2.5 rounded-md transition-colors duration-300"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Mortgage Calculator
            </NavLink>
            <NavLink 
              to="/start" 
              className={({ isActive }) => 
                isActive
                  ? "block text-emerald-300 bg-emerald-900/50 font-medium px-3 py-2.5 rounded-md transition-colors duration-300"
                  : "block text-white hover:bg-emerald-800 hover:text-emerald-300 font-medium px-3 py-2.5 rounded-md transition-colors duration-300"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Start Page
            </NavLink>
            <Link
              to="/start"
              className="block bg-emerald-400 text-emerald-900 font-semibold py-2.5 px-4 mt-4 rounded-full text-center transition-all duration-300 hover:bg-emerald-300 transform hover:translate-x-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Continue
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;