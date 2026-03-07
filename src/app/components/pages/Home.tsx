import { Link } from 'react-router';
import { Activity, Brain, Shield, BarChart3, FileText, Users, ArrowRight, CheckCircle } from 'lucide-react';

export default function Home() {
  const diseases = [
    {
      name: 'Diabetes',
      icon: Activity,
      description: 'Early detection of diabetes risk using glucose and BMI analysis',
      path: '/predict/diabetes',
      color: 'from-purple-500 to-pink-500',
    },
    {
      name: 'Heart Disease',
      icon: Activity,
      description: 'Cardiovascular risk assessment based on clinical parameters',
      path: '/predict/heart-disease',
      color: 'from-red-500 to-rose-500',
    },
    {
      name: 'COVID-19',
      icon: Shield,
      description: 'COVID-19 risk prediction using symptoms and exposure data',
      path: '/predict/covid',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'Cancer',
      icon: Activity,
      description: 'Cancer risk screening using multiple biomarker analysis',
      path: '/predict/cancer',
      color: 'from-orange-500 to-amber-500',
    },
  ];

  const features = [
    {
      icon: Brain,
      title: 'Advanced ML Models',
      description: 'State-of-the-art machine learning algorithms trained on extensive medical datasets',
    },
    {
      icon: BarChart3,
      title: 'Visual Analytics',
      description: 'Interactive charts and comprehensive reports for better understanding',
    },
    {
      icon: FileText,
      title: 'PDF Reports',
      description: 'Downloadable detailed prediction reports for medical records',
    },
    {
      icon: Shield,
      title: 'Transparent & Credible',
      description: 'Complete dataset and model information for full transparency',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm mb-6">
              <Brain className="w-4 h-4" />
              <span>AI-Powered Disease Prediction</span>
            </div>
            <h1 className="text-4xl md:text-6xl mb-6 text-gray-900">
              Predict Health Risks with
              <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Machine Learning Precision
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Advanced ML-based system for early disease detection. Input health parameters and
              receive instant risk assessments for Diabetes, Heart Disease, COVID-19, and Cancer.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/dashboard"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <span>Start Prediction</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 bg-white text-gray-700 rounded-lg border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all flex items-center space-x-2"
              >
                <span>Learn More</span>
              </Link>
            </div>
          </div>
        </div>
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* Disease Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4 text-gray-900">Supported Disease Predictions</h2>
          <p className="text-xl text-gray-600">Choose a disease type to start your risk assessment</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {diseases.map((disease) => (
            <Link
              key={disease.path}
              to={disease.path}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100 hover:border-transparent hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${disease.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <disease.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl mb-2 text-gray-900">{disease.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{disease.description}</p>
              <div className="flex items-center text-blue-600 group-hover:text-cyan-600 transition-colors">
                <span className="text-sm">Start Prediction</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4 text-gray-900">Why Choose MediPredict AI?</h2>
            <p className="text-xl text-gray-600">Advanced features for accurate and reliable predictions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl mb-2">95%+</div>
              <div className="text-blue-100">Prediction Accuracy</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl mb-2">50K+</div>
              <div className="text-blue-100">Predictions Made</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl mb-2">4</div>
              <div className="text-blue-100">Disease Types</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-12 text-center border border-blue-100">
          <Users className="w-16 h-16 text-blue-600 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl mb-4 text-gray-900">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join researchers and healthcare professionals using our platform for disease risk assessment
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/auth"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg"
            >
              Create Free Account
            </Link>
            </div>
        </div>
      </section>
    </div>
  );
}
