import { Link } from 'react-router';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <div className="text-9xl text-blue-600 mb-4">404</div>
          <h1 className="text-4xl md:text-5xl mb-4 text-gray-900">Page Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            to="/"
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>Go Home</span>
          </Link>
          <Link
            to="/dashboard"
            className="px-8 py-4 bg-white text-gray-700 rounded-lg border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all flex items-center justify-center space-x-2"
          >
            <Search className="w-5 h-5" />
            <span>View Dashboard</span>
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
          <h2 className="text-2xl mb-4 text-gray-900">Quick Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              to="/about"
              className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors text-gray-700"
            >
              About
            </Link>
            <Link
              to="/dashboard"
              className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors text-gray-700"
            >
              Dashboard
            </Link>
            <Link
              to="/dataset-info"
              className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors text-gray-700"
            >
              Datasets
            </Link>
            <Link
              to="/contact"
              className="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors text-gray-700"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
