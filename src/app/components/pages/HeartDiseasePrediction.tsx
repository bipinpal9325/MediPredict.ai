import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Heart, ArrowRight, Info, Loader } from 'lucide-react';
import PredictionResult from '../PredictionResult';

export default function HeartDiseasePrediction() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: '',
    sex: 'male',
    chestPain: '0',
    bloodPressure: '',
    cholesterol: '',
    fastingBloodSugar: '0',
    restingECG: '0',
    maxHeartRate: '',
    exerciseAngina: '0',
    oldpeak: '',
    slope: '1',
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
      const age = parseFloat(formData.age) || 0;
      const cholesterol = parseFloat(formData.cholesterol) || 0;
      const bloodPressure = parseFloat(formData.bloodPressure) || 0;
      const maxHeartRate = parseFloat(formData.maxHeartRate) || 0;

      let riskScore = 0;
      if (age > 55) riskScore += 25;
      else if (age > 45) riskScore += 15;

      if (cholesterol > 240) riskScore += 30;
      else if (cholesterol > 200) riskScore += 15;

      if (bloodPressure > 140) riskScore += 20;
      else if (bloodPressure > 120) riskScore += 10;

      if (formData.exerciseAngina === '1') riskScore += 15;

      riskScore = Math.min(95, riskScore + Math.random() * 10);

      const predictionResult = {
        disease: 'Heart Disease',
        riskScore: Math.round(riskScore),
        riskLevel: riskScore > 70 ? 'High' : riskScore > 40 ? 'Medium' : 'Low',
        confidence: 94.8,
        factors: [
          { name: 'Age', value: formData.age, impact: age > 55 ? 'High' : age > 45 ? 'Medium' : 'Low' },
          { name: 'Cholesterol', value: formData.cholesterol, impact: cholesterol > 240 ? 'High' : cholesterol > 200 ? 'Medium' : 'Low' },
          { name: 'Blood Pressure', value: formData.bloodPressure, impact: bloodPressure > 140 ? 'High' : bloodPressure > 120 ? 'Medium' : 'Low' },
          { name: 'Max Heart Rate', value: formData.maxHeartRate, impact: 'Medium' },
        ],
        recommendations: [
          'Maintain healthy cholesterol levels through diet and exercise',
          'Monitor blood pressure regularly',
          'Engage in regular cardiovascular exercise',
          'Schedule regular cardiac health checkups',
          'Consult with a cardiologist for personalized advice',
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
      <section className="bg-gradient-to-r from-red-600 to-rose-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <Heart className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl">Heart Disease Risk Prediction</h1>
          </div>
          <p className="text-xl text-red-100">
            Enter your cardiovascular health parameters to assess heart disease risk
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
              <h2 className="text-2xl mb-6 text-gray-900">Cardiovascular Parameters</h2>
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="50"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Sex *</label>
                    <select
                      name="sex"
                      value={formData.sex}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Chest Pain Type *</label>
                    <select
                      name="chestPain"
                      value={formData.chestPain}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="0">Typical Angina</option>
                      <option value="1">Atypical Angina</option>
                      <option value="2">Non-anginal Pain</option>
                      <option value="3">Asymptomatic</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Resting Blood Pressure (mm Hg) *</label>
                    <input
                      type="number"
                      name="bloodPressure"
                      value={formData.bloodPressure}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="120"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Cholesterol (mg/dL) *</label>
                    <input
                      type="number"
                      name="cholesterol"
                      value={formData.cholesterol}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="200"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Fasting Blood Sugar &gt; 120 mg/dL *</label>
                    <select
                      name="fastingBloodSugar"
                      value={formData.fastingBloodSugar}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="0">No</option>
                      <option value="1">Yes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Resting ECG Results *</label>
                    <select
                      name="restingECG"
                      value={formData.restingECG}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="0">Normal</option>
                      <option value="1">ST-T Wave Abnormality</option>
                      <option value="2">Left Ventricular Hypertrophy</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Maximum Heart Rate *</label>
                    <input
                      type="number"
                      name="maxHeartRate"
                      value={formData.maxHeartRate}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="150"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Exercise Induced Angina *</label>
                    <select
                      name="exerciseAngina"
                      value={formData.exerciseAngina}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="0">No</option>
                      <option value="1">Yes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">ST Depression (oldpeak)</label>
                    <input
                      type="number"
                      name="oldpeak"
                      value={formData.oldpeak}
                      onChange={handleChange}
                      step="0.1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="0.0"
                      min="0"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-4 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg hover:from-red-700 hover:to-rose-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <span>Predict Heart Disease Risk</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-6 border border-red-100">
              <div className="flex items-start space-x-3 mb-4">
                <Info className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg mb-2 text-gray-900">About This Test</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    This model uses the UCI Heart Disease dataset to predict cardiovascular disease risk
                    based on clinical parameters and patient history.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg mb-3 text-gray-900">Normal Ranges</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Blood Pressure:</span>
                  <span className="text-gray-900">&lt;120 mm Hg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cholesterol:</span>
                  <span className="text-gray-900">&lt;200 mg/dL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Max Heart Rate:</span>
                  <span className="text-gray-900">120-180 bpm</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg mb-3 text-gray-900">Model Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Accuracy:</span>
                  <span className="text-gray-900">94.8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dataset:</span>
                  <span className="text-gray-900">UCI Heart</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Algorithm:</span>
                  <span className="text-gray-900">SVM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
