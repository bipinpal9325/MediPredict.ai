import { Brain, Target, Users, Award, TrendingUp, Shield } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Brain,
      title: 'Innovation',
      description: 'Leveraging cutting-edge ML algorithms for healthcare advancement',
    },
    {
      icon: Shield,
      title: 'Accuracy',
      description: 'Rigorous testing ensuring high prediction accuracy and reliability',
    },
    {
      icon: Users,
      title: 'Accessibility',
      description: 'Making advanced health predictions available to all',
    },
    {
      icon: Award,
      title: 'Credibility',
      description: 'Transparent methodology and scientifically validated models',
    },
  ];

  const team = [
    { role: 'ML Engineers', count: '5+' },
    { role: 'Medical Advisors', count: '3+' },
    { role: 'Data Scientists', count: '4+' },
    { role: 'Researchers', count: '10+' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl mb-6">About MediPredict AI</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Pioneering the future of healthcare through artificial intelligence and machine learning
              for early disease detection and prevention
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm mb-6">
              <Target className="w-4 h-4" />
              <span>Our Mission</span>
            </div>
            <h2 className="text-3xl md:text-4xl mb-6 text-gray-900">
              Empowering Early Disease Detection Through AI
            </h2>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              MediPredict AI was founded with a singular mission: to democratize access to advanced
              disease prediction technology. We believe that early detection saves lives, and everyone
              deserves access to cutting-edge health assessment tools.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our platform combines the latest advances in machine learning with comprehensive medical
              datasets to provide accurate, reliable, and transparent disease risk predictions that
              can guide preventive healthcare decisions.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-lg p-3">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl mb-2 text-gray-900">Advanced Analytics</h3>
                  <p className="text-gray-600">
                    Sophisticated algorithms analyzing multiple health parameters for comprehensive risk assessment
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-cyan-600 text-white rounded-lg p-3">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl mb-2 text-gray-900">Validated Models</h3>
                  <p className="text-gray-600">
                    Rigorously tested models validated against real-world medical data
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-purple-600 text-white rounded-lg p-3">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl mb-2 text-gray-900">Research-Backed</h3>
                  <p className="text-gray-600">
                    Built on peer-reviewed research and medical best practices
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4 text-gray-900">Our Core Values</h2>
            <p className="text-xl text-gray-600">Principles that guide our work every day</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl mb-2 text-gray-900">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Technology Section */}
      <section className="bg-gradient-to-br from-blue-50 to-cyan-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4 text-gray-900">Our Technology Stack</h2>
            <p className="text-xl text-gray-600">Built with industry-leading tools and frameworks</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {['Python', 'TensorFlow', 'Scikit-learn', 'React', 'Pandas', 'NumPy', 'Keras', 'PyTorch'].map((tech) => (
              <div key={tech} className="bg-white rounded-lg shadow-sm p-4 text-center border border-blue-100">
                <span className="text-gray-700">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
