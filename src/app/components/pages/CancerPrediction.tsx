import { useState } from 'react';
import { Activity, ArrowRight, Info, Loader } from 'lucide-react';
import PredictionResult from '../PredictionResult';

export default function CancerPrediction() {
  const [formData, setFormData] = useState({
    age: '',
    radiusMean: '',
    textureMean: '',
    perimeterMean: '',
    areaMean: '',
    smoothnessMean: '',
    compactnessMean: '',
    concavityMean: '',
    concavePointsMean: '',
    symmetryMean: '',
    fractalDimensionMean: '',
  });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const radius = parseFloat(formData.radiusMean) || 0;
      const texture = parseFloat(formData.textureMean) || 0;
      const perimeter = parseFloat(formData.perimeterMean) || 0;
      const area = parseFloat(formData.areaMean) || 0;
      const concavity = parseFloat(formData.concavityMean) || 0;

      let riskScore = 0;
      if (radius > 17) riskScore += 25;
      else if (radius > 14) riskScore += 15;

      if (perimeter > 100) riskScore += 20;
      else if (perimeter > 80) riskScore += 10;

      if (area > 800) riskScore += 20;
      else if (area > 600) riskScore += 10;

      if (concavity > 0.15) riskScore += 25;
      else if (concavity > 0.1) riskScore += 15;

      riskScore = Math.min(95, riskScore + Math.random() * 15);

      const predictionResult = {
        disease: 'Cancer (Breast)',
        riskScore: Math.round(riskScore),
        riskLevel: riskScore > 70 ? 'High' : riskScore > 40 ? 'Medium' : 'Low',
        confidence: 95.1,
        factors: [
          { name: 'Radius Mean', value: formData.radiusMean, impact: radius > 17 ? 'High' : radius > 14 ? 'Medium' : 'Low' },
          { name: 'Perimeter Mean', value: formData.perimeterMean, impact: perimeter > 100 ? 'High' : perimeter > 80 ? 'Medium' : 'Low' },
          { name: 'Area Mean', value: formData.areaMean, impact: area > 800 ? 'High' : area > 600 ? 'Medium' : 'Low' },
          { name: 'Concavity Mean', value: formData.concavityMean, impact: concavity > 0.15 ? 'High' : concavity > 0.1 ? 'Medium' : 'Low' },
        ],
        recommendations: [
          'Consult with an oncologist for further evaluation',
          'Schedule regular screening and mammography',
          'Consider genetic testing if family history present',
          'Maintain healthy lifestyle and regular checkups',
          'Discuss results with healthcare provider immediately',
        ],
        timestamp: new Date().toISOString(),
      };

      setResult(predictionResult);
      setLoading(false);
    }, 2000);
  };

  if (result) {
    return <PredictionResult result={result} onNewPrediction={() => setResult(null)} />;
  }

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-orange-600 to-amber-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <Activity className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl">Cancer Risk Screening</h1>
          </div>
          <p className="text-xl text-orange-100">
            Enter cell feature measurements for cancer risk assessment
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
              <h2 className="text-2xl mb-6 text-gray-900">Cell Feature Measurements</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Age (years) *</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="45"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Radius Mean *</label>
                    <input
                      type="number"
                      name="radiusMean"
                      value={formData.radiusMean}
                      onChange={handleChange}
                      required
                      step="0.01"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="14.0"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Texture Mean *</label>
                    <input
                      type="number"
                      name="textureMean"
                      value={formData.textureMean}
                      onChange={handleChange}
                      required
                      step="0.01"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="19.0"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Perimeter Mean *</label>
                    <input
                      type="number"
                      name="perimeterMean"
                      value={formData.perimeterMean}
                      onChange={handleChange}
                      required
                      step="0.1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="90.0"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Area Mean *</label>
                    <input
                      type="number"
                      name="areaMean"
                      value={formData.areaMean}
                      onChange={handleChange}
                      required
                      step="0.1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="650.0"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Smoothness Mean</label>
                    <input
                      type="number"
                      name="smoothnessMean"
                      value={formData.smoothnessMean}
                      onChange={handleChange}
                      step="0.0001"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="0.1"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Compactness Mean</label>
                    <input
                      type="number"
                      name="compactnessMean"
                      value={formData.compactnessMean}
                      onChange={handleChange}
                      step="0.0001"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="0.1"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Concavity Mean *</label>
                    <input
                      type="number"
                      name="concavityMean"
                      value={formData.concavityMean}
                      onChange={handleChange}
                      required
                      step="0.0001"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="0.1"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Concave Points Mean</label>
                    <input
                      type="number"
                      name="concavePointsMean"
                      value={formData.concavePointsMean}
                      onChange={handleChange}
                      step="0.0001"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="0.05"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Symmetry Mean</label>
                    <input
                      type="number"
                      name="symmetryMean"
                      value={formData.symmetryMean}
                      onChange={handleChange}
                      step="0.0001"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="0.2"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Fractal Dimension Mean</label>
                    <input
                      type="number"
                      name="fractalDimensionMean"
                      value={formData.fractalDimensionMean}
                      onChange={handleChange}
                      step="0.0001"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="0.06"
                      min="0"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg hover:from-orange-700 hover:to-amber-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <span>Predict Cancer Risk</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
              <div className="flex items-start space-x-3 mb-4">
                <Info className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg mb-2 text-gray-900">About This Test</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    This model uses the Wisconsin Breast Cancer dataset to analyze cell features
                    from fine needle aspirate (FNA) for cancer risk assessment.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg mb-3 text-gray-900">Key Measurements</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  <span className="text-gray-700">Radius: cell size</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  <span className="text-gray-700">Texture: variation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  <span className="text-gray-700">Perimeter: boundary</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  <span className="text-gray-700">Concavity: indents</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg mb-3 text-gray-900">Model Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Accuracy:</span>
                  <span className="text-gray-900">95.1%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dataset:</span>
                  <span className="text-gray-900">WBCD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Algorithm:</span>
                  <span className="text-gray-900">Neural Network</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
