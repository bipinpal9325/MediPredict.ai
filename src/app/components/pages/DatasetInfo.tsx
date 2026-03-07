import { Database, Activity } from 'lucide-react';

export default function DatasetInfo() {
  const datasets = [
    {
      title: 'Diabetes Dataset',
      color: 'from-purple-500 to-pink-500',
      description: 'Contains diagnostic measurements for predicting diabetes onset in Pima Indian women.',
      features: [
        'Pregnancies', 'Glucose', 'Blood Pressure', 'Skin Thickness', 
        'Insulin', 'BMI', 'Diabetes Pedigree Function', 'Age'
      ]
    },
    {
      title: 'Heart Disease Dataset',
      color: 'from-red-500 to-rose-500',
      description: 'Cleveland database for predicting the presence of heart disease in patients.',
      features: [
        'Age', 'Sex', 'Chest Pain Type', 'Resting BP', 'Cholesterol', 
        'Fasting Blood Sugar', 'Resting ECG', 'Max Heart Rate', 
        'Exercise Angina', 'Oldpeak', 'Slope', 'CA', 'Thal'
      ]
    },
    {
      title: 'COVID-19 Dataset',
      color: 'from-blue-500 to-cyan-500',
      description: 'Comprehensive symptom-based dataset for COVID-19 infection risk assessment.',
      features: [
        'Age', 'Temperature', 'Cough', 'Breathing Difficulty', 'Fatigue', 
        'Loss of Smell/Taste', 'Sore Throat', 'Body Aches', 
        'Exposure History', 'Travel History'
      ]
    },
    {
      title: 'Breast Cancer Dataset',
      color: 'from-orange-500 to-amber-500',
      description: 'Features computed from digitized images of fine needle aspirate (FNA) of breast masses.',
      features: [
        'Radius', 'Texture', 'Perimeter', 'Area', 'Smoothness', 
        'Compactness', 'Concavity', 'Concave Points', 'Symmetry', 
        'Fractal Dimension'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center space-x-3">
          <Database className="w-8 h-8 text-blue-600" />
          <span>Dataset Information</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore the research-grade datasets and clinical features powering our AI predictive models.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {datasets.map((dataset, index) => (
          <div 
            key={index} 
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            {/* Top Color Bar */}
            <div className={`h-3 w-full bg-gradient-to-r ${dataset.color}`}></div>
            
            <div className="p-8 flex-grow">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-gray-500" />
                {dataset.title}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {dataset.description}
              </p>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 border-b pb-2">
                  Clinical Features Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {dataset.features.map((feature, fIndex) => (
                    <span 
                      key={fIndex} 
                      className="px-3 py-1.5 bg-gray-50 text-gray-700 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}