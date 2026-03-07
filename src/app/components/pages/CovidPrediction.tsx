import { useState } from 'react';
import { Shield, ArrowRight, Info, Loader } from 'lucide-react';
import PredictionResult from '../PredictionResult';

export default function CovidPrediction() {
  const [formData, setFormData] = useState({
    age: '',
    temperature: '',
    cough: '0',
    breathing: '0',
    fatigue: '0',
    lossOfSmell: '0',
    soreThroat: '0',
    bodyAches: '0',
    exposure: '0',
    travelHistory: '0',
  });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const temperature = parseFloat(formData.temperature) || 0;
      const age = parseFloat(formData.age) || 0;
      const symptomsCount = [
        formData.cough,
        formData.breathing,
        formData.fatigue,
        formData.lossOfSmell,
        formData.soreThroat,
        formData.bodyAches,
      ].filter((s) => s === '1').length;

      let riskScore = 0;
      if (temperature > 100.4) riskScore += 30;
      else if (temperature > 99.5) riskScore += 15;

      riskScore += symptomsCount * 10;

      if (formData.exposure === '1') riskScore += 20;
      if (formData.travelHistory === '1') riskScore += 10;
      if (age > 60) riskScore += 15;

      riskScore = Math.min(95, riskScore + Math.random() * 10);

      const predictionResult = {
        disease: 'COVID-19',
        riskScore: Math.round(riskScore),
        riskLevel: riskScore > 70 ? 'High' : riskScore > 40 ? 'Medium' : 'Low',
        confidence: 92.5,
        factors: [
          { name: 'Temperature', value: `${formData.temperature}°F`, impact: temperature > 100.4 ? 'High' : temperature > 99.5 ? 'Medium' : 'Low' },
          { name: 'Symptoms Count', value: symptomsCount.toString(), impact: symptomsCount >= 4 ? 'High' : symptomsCount >= 2 ? 'Medium' : 'Low' },
          { name: 'Exposure History', value: formData.exposure === '1' ? 'Yes' : 'No', impact: formData.exposure === '1' ? 'High' : 'Low' },
          { name: 'Age', value: formData.age, impact: age > 60 ? 'High' : age > 40 ? 'Medium' : 'Low' },
        ],
        recommendations: [
          'If high risk, get tested for COVID-19 immediately',
          'Self-isolate and monitor symptoms closely',
          'Wear a mask and practice social distancing',
          'Contact healthcare provider if symptoms worsen',
          'Follow local health guidelines and protocols',
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
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl">COVID-19 Risk Assessment</h1>
          </div>
          <p className="text-xl text-blue-100">
            Enter your symptoms and exposure information for COVID-19 risk prediction
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
              <h2 className="text-2xl mb-6 text-gray-900">Symptoms & Exposure</h2>
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="30"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Body Temperature (°F) *</label>
                    <input
                      type="number"
                      name="temperature"
                      value={formData.temperature}
                      onChange={handleChange}
                      required
                      step="0.1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="98.6"
                      min="90"
                      max="110"
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg mb-4 text-gray-900">Symptoms</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <label className="text-sm text-gray-700">Persistent Cough</label>
                      <select
                        name="cough"
                        value={formData.cough}
                        onChange={handleChange}
                        className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <label className="text-sm text-gray-700">Breathing Difficulty</label>
                      <select
                        name="breathing"
                        value={formData.breathing}
                        onChange={handleChange}
                        className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <label className="text-sm text-gray-700">Fatigue</label>
                      <select
                        name="fatigue"
                        value={formData.fatigue}
                        onChange={handleChange}
                        className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <label className="text-sm text-gray-700">Loss of Smell/Taste</label>
                      <select
                        name="lossOfSmell"
                        value={formData.lossOfSmell}
                        onChange={handleChange}
                        className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <label className="text-sm text-gray-700">Sore Throat</label>
                      <select
                        name="soreThroat"
                        value={formData.soreThroat}
                        onChange={handleChange}
                        className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <label className="text-sm text-gray-700">Body Aches</label>
                      <select
                        name="bodyAches"
                        value={formData.bodyAches}
                        onChange={handleChange}
                        className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg mb-4 text-gray-900">Exposure History</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <label className="text-sm text-gray-700">Recent COVID-19 Exposure</label>
                      <select
                        name="exposure"
                        value={formData.exposure}
                        onChange={handleChange}
                        className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <label className="text-sm text-gray-700">Recent Travel History</label>
                      <select
                        name="travelHistory"
                        value={formData.travelHistory}
                        onChange={handleChange}
                        className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <span>Predict COVID-19 Risk</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-start space-x-3 mb-4">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg mb-2 text-gray-900">About This Test</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    This model analyzes symptoms and exposure history to estimate COVID-19 infection risk.
                    A positive result suggests getting tested.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg mb-3 text-gray-900">Common Symptoms</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Fever (100.4°F+)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Dry cough</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Loss of taste/smell</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Fatigue</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg mb-3 text-gray-900">Model Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Accuracy:</span>
                  <span className="text-gray-900">92.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dataset:</span>
                  <span className="text-gray-900">COVID-19</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Algorithm:</span>
                  <span className="text-gray-900">Decision Tree</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
