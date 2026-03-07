import { Outlet, Link, useLocation } from 'react-router';
import { Activity, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

export default function Root() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Results', path: '/results' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-100 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-2 rounded-lg group-hover:scale-105 transition-transform">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                MediPredict AI
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="ml-4 pl-4 border-l border-gray-200 flex items-center">
                <SignedIn>
                  {/* Shows the user's avatar and a dropdown menu to manage account/logout */}
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
                <SignedOut>
                  {/* Redirects user to our custom auth page */}
                  <Link
                    to="/auth"
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-md hover:from-blue-700 hover:to-cyan-700 transition-all text-sm font-medium"
                  >
                    Sign In
                  </Link>
                </SignedOut>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-blue-50"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-sm ${
                    isActive(item.path)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-blue-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-gray-100 mt-2 pt-4 px-3 flex justify-center">
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
                <SignedOut>
                  <Link
                    to="/auth"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-md text-sm text-center"
                  >
                    Sign In
                  </Link>
                </SignedOut>
              </div>
            </div>
          )}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
      
      {/* ... Footer code (Unchanged) ... */}
    </div>
  );
}