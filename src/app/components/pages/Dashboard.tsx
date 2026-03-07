import { Link } from 'react-router';
import { Activity, Heart, Shield, Droplet, ArrowRight, Clock, AlertCircle, Lock, CheckCircle } from 'lucide-react';
import { useFeatureAccess, PREDICTION_FEATURES, FREE_PLAN_LIMIT } from '../../utils/featureAccess';

export default function Dashboard() {
  const { canAccessFeature, usageCount, isPremium, activePlan } = useFeatureAccess();

  const limitReached = usageCount >= FREE_PLAN_LIMIT;
  const progressPercent = Math.min(100, (usageCount / FREE_PLAN_LIMIT) * 100);

  const predictions = [
    {
      name: 'Diabetes Prediction',
      icon: Droplet,
      featureId: PREDICTION_FEATURES.DIABETES,
      description: 'Assess diabetes risk based on glucose levels, BMI, age, and other factors',
      path: '/predict/diabetes',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
      accuracy: '96.2%',
    },
    {
      name: 'Heart Disease Prediction',
      icon: Heart,
      featureId: PREDICTION_FEATURES.HEART_DISEASE,
      description: 'Evaluate cardiovascular risk using clinical and lifestyle parameters',
      path: '/predict/heart-disease',
      color: 'from-red-500 to-rose-500',
      bgColor: 'from-red-50 to-rose-50',
      accuracy: '94.8%',
    },
    {
      name: 'COVID-19 Risk Assessment',
      icon: Shield,
      featureId: PREDICTION_FEATURES.COVID,
      description: 'Predict COVID-19 infection risk based on symptoms and exposure',
      path: '/predict/covid',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      accuracy: '92.5%',
    },
    {
      name: 'Cancer Risk Screening',
      icon: Activity,
      featureId: PREDICTION_FEATURES.CANCER,
      description: 'Multi-factor cancer risk analysis using biomarkers and genetics',
      path: '/predict/cancer',
      color: 'from-orange-500 to-amber-500',
      bgColor: 'from-orange-50 to-amber-50',
      accuracy: '95.1%',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl mb-4 font-bold">Disease Prediction Dashboard</h1>
          <p className="text-xl text-blue-100 mb-6">Select a disease type to start your risk assessment</p>
          
          {/* Active Header Badge dependent on Plan */}
          {!isPremium ? (
             <div className="inline-flex flex-col gap-2 p-4 rounded-xl border bg-white/10 border-white/20 text-white min-w-[300px]">
               <div className="flex justify-between items-center text-sm font-medium">
                 <span>Free Plan Usage: {usageCount} / {FREE_PLAN_LIMIT}</span>
               </div>
               <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
                 <div className="h-full bg-gradient-to-r from-cyan-300 to-blue-300 transition-all" style={{ width: `${progressPercent}%` }} />
               </div>
               {limitReached && (
                 <p className="text-xs text-red-200 mt-1 flex items-center gap-1">
                   <AlertCircle className="w-3 h-3" /> Limit reached. Please upgrade.
                 </p>
               )}
             </div>
          ) : (
            <div className="inline-flex bg-white/20 border border-white/30 backdrop-blur-md text-white px-5 py-3 rounded-lg text-sm font-semibold items-center gap-2 w-fit shadow-lg">
              <CheckCircle className="w-5 h-5 text-green-300" />
              {activePlan.charAt(0).toUpperCase() + activePlan.slice(1)} Plan – Active (Unlimited Predictions)
            </div>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {predictions.map((prediction) => {
            const hasAccess = canAccessFeature(prediction.featureId);
            // Redirect unauthorized users to pricing
            const targetPath = hasAccess ? prediction.path : '/pricing';

            return (
              <div key={prediction.path} className={`relative bg-gradient-to-br ${prediction.bgColor} rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${prediction.color} flex items-center justify-center shadow-inner`}>
                    <prediction.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <div className="flex gap-2">
                    {/* Badge completely disappears for Premium Users */}
                    {!hasAccess && (
                      <div className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 shadow-sm">
                        <Lock className="w-3 h-3" /> Premium
                      </div>
                    )}
                    <div className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-gray-200 shadow-sm font-medium">
                      {prediction.accuracy} accurate
                    </div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-2 text-gray-900">{prediction.name}</h3>
                <p className="text-gray-600 mb-6">{prediction.description}</p>
                
                <Link 
                  to={targetPath} 
                  className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all shadow-sm ${
                    hasAccess 
                      ? `bg-gradient-to-r ${prediction.color} text-white hover:opacity-90` 
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {/* Dynamic Button Text & Icon */}
                  <span>{hasAccess ? 'Start Prediction' : 'Unlock Feature'}</span>
                  {!hasAccess ? <Lock className="w-4 h-4 text-gray-500" /> : <ArrowRight className="w-4 h-4" />}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}