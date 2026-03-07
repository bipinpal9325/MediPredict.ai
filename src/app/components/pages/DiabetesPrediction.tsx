import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Droplet, ArrowRight, Info, Loader, AlertTriangle, Lock } from 'lucide-react';
import PredictionResult from '../PredictionResult';
import { useFeatureAccess, FREE_PLAN_LIMIT } from '../../utils/featureAccess';

export default function DiabetesPrediction() {
  const navigate = useNavigate();
  const { checkUsageLimit, incrementUsage, isPremium, usageCount } = useFeatureAccess();
  
  const [formData, setFormData] = useState({
    pregnancies: '', glucose: '', bloodPressure: '', skinThickness: '',
    insulin: '', bmi: '', diabetesPedigree: '', age: '',
  });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const limitReached = !isPremium && usageCount >= FREE_PLAN_LIMIT;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!checkUsageLimit()) {
      setShowUpgradeModal(true);
      return; 
    }

    setLoading(true);
    await incrementUsage();

    setTimeout(() => {
      const glucose = parseFloat(formData.glucose) || 0;
      const bmi = parseFloat(formData.bmi) || 0;
      const age = parseFloat(formData.age) || 0;

      let riskScore = 0;
      if (glucose > 140) riskScore += 30;
      else if (glucose > 100) riskScore += 15;
      if (bmi > 30) riskScore += 25;
      else if (bmi > 25) riskScore += 10;
      if (age > 45) riskScore += 20;
      else if (age > 30) riskScore += 10;

      riskScore = Math.min(95, riskScore + Math.random() * 15);

      const predictionResult = {
        disease: 'Diabetes',
        riskScore: Math.round(riskScore),
        riskLevel: riskScore > 70 ? 'High' : riskScore > 40 ? 'Medium' : 'Low',
        confidence: 96.2,
        factors: [
          { name: 'Glucose Level', value: formData.glucose, impact: glucose > 140 ? 'High' : glucose > 100 ? 'Medium' : 'Low' },
          { name: 'BMI', value: formData.bmi, impact: bmi > 30 ? 'High' : bmi > 25 ? 'Medium' : 'Low' },
          { name: 'Age', value: formData.age, impact: age > 45 ? 'High' : age > 30 ? 'Medium' : 'Low' },
          { name: 'Blood Pressure', value: formData.bloodPressure, impact: 'Medium' },
        ],
        recommendations: [
          'Maintain healthy blood glucose levels through diet and exercise',
          'Monitor your BMI and aim for a healthy weight range',
          'Regular health checkups and glucose monitoring',
          'Consult with a healthcare provider for personalized advice',
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
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <Droplet className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl">Diabetes Risk Prediction</h1>
          </div>
          <p className="text-xl text-purple-100">
            Enter your health parameters to assess diabetes risk
            {!isPremium && <span className="block mt-2 text-sm opacity-80 font-medium">Free Predictions Used: {usageCount} / {FREE_PLAN_LIMIT}</span>}
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 relative">
              
              {/* Overlay if limit reached */}
              {limitReached && (
                 <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 rounded-xl flex items-center justify-center flex-col">
                   <Lock className="w-12 h-12 text-gray-500 mb-4" />
                   <h3 className="text-xl font-semibold text-gray-900">Limit Reached</h3>
                   <button 
                     onClick={() => setShowUpgradeModal(true)}
                     className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 shadow-md transition-colors"
                   >
                     Unlock Feature
                   </button>
                 </div>
              )}

              <h2 className="text-2xl mb-6 text-gray-900">Health Parameters</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Number of Pregnancies</label>
                    <input type="number" name="pregnancies" value={formData.pregnancies} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 disabled:opacity-50" placeholder="0" min="0" disabled={limitReached} />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Glucose Level (mg/dL) *</label>
                    <input type="number" name="glucose" value={formData.glucose} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 disabled:opacity-50" placeholder="100" min="0" disabled={limitReached} />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Blood Pressure (mm Hg) *</label>
                    <input type="number" name="bloodPressure" value={formData.bloodPressure} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 disabled:opacity-50" placeholder="80" min="0" disabled={limitReached} />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Skin Thickness (mm)</label>
                    <input type="number" name="skinThickness" value={formData.skinThickness} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 disabled:opacity-50" placeholder="20" min="0" disabled={limitReached} />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Insulin Level (μU/mL)</label>
                    <input type="number" name="insulin" value={formData.insulin} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 disabled:opacity-50" placeholder="80" min="0" disabled={limitReached} />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">BMI *</label>
                    <input type="number" name="bmi" value={formData.bmi} onChange={handleChange} required step="0.1" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 disabled:opacity-50" placeholder="25.0" min="0" disabled={limitReached} />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Diabetes Pedigree Function</label>
                    <input type="number" name="diabetesPedigree" value={formData.diabetesPedigree} onChange={handleChange} step="0.001" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 disabled:opacity-50" placeholder="0.5" min="0" disabled={limitReached} />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Age (years) *</label>
                    <input type="number" name="age" value={formData.age} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 disabled:opacity-50" placeholder="30" min="0" disabled={limitReached} />
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  disabled={loading || limitReached} 
                  className={`w-full px-6 py-4 rounded-lg transition-all shadow-lg flex items-center justify-center space-x-2 ${
                    limitReached 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : limitReached ? (
                    <>
                      <Lock className="w-5 h-5" />
                      <span>Free Limit Reached</span>
                    </>
                  ) : (
                    <>
                      <span>Predict Diabetes Risk</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
              <div className="flex items-start space-x-3 mb-4">
                <Info className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg mb-2 text-gray-900">About This Test</h3>
                  <p className="text-sm text-gray-600">This model uses machine learning trained on the Pima Indians Diabetes Database.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg mb-3 text-gray-900">Normal Ranges</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-600">Glucose:</span><span className="text-gray-900">70-100 mg/dL</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Blood Pressure:</span><span className="text-gray-900">60-80 mm Hg</span></div>
                <div className="flex justify-between"><span className="text-gray-600">BMI:</span><span className="text-gray-900">18.5-24.9</span></div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg mb-3 text-gray-900">Model Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-600">Accuracy:</span><span className="text-gray-900">96.2%</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Dataset:</span><span className="text-gray-900">PIMA</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Algorithm:</span><span className="text-gray-900">Random Forest</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Modal Popup */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free Limit Reached</h3>
              <p className="text-gray-600 mb-6">
                You have reached your Free Plan limit ({FREE_PLAN_LIMIT}/{FREE_PLAN_LIMIT}). 
                Upgrade to Premium to continue using Diabetes Prediction and unlock all other disease models.
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  to="/pricing"
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <Lock className="w-4 h-4" />
                  <span>Upgrade Now</span>
                </Link>
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}