import { Download, RefreshCw, TrendingUp, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import jsPDF from 'jspdf';

interface PredictionResultProps {
  result: {
    disease: string;
    riskScore: number;
    riskLevel: string;
    confidence: number;
    factors: Array<{ name: string; value: string; impact: string }>;
    recommendations: string[];
    timestamp: string;
  };
  onNewPrediction: () => void;
}

export default function PredictionResult({ result, onNewPrediction }: PredictionResultProps) {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High':
        return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' };
      case 'Medium':
        return { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200' };
      case 'Low':
        return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200' };
    }
  };

  const riskColors = getRiskColor(result.riskLevel);

  const pieData = [
    { name: 'Risk', value: result.riskScore },
    { name: 'Safe', value: 100 - result.riskScore },
  ];

  const COLORS = result.riskLevel === 'High' ? ['#dc2626', '#e5e7eb'] : result.riskLevel === 'Medium' ? ['#eab308', '#e5e7eb'] : ['#16a34a', '#e5e7eb'];

  const factorsData = result.factors.map((factor) => ({
    name: factor.name,
    value: factor.impact === 'High' ? 3 : factor.impact === 'Medium' ? 2 : 1,
  }));

  const downloadPDF = () => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.text('MediPredict AI - Prediction Report', 20, 20);

    doc.setFontSize(12);
    doc.text(`Disease: ${result.disease}`, 20, 35);
    doc.text(`Date: ${new Date(result.timestamp).toLocaleString()}`, 20, 42);

    // Risk Score
    doc.setFontSize(16);
    doc.text('Risk Assessment', 20, 55);
    doc.setFontSize(12);
    doc.text(`Risk Score: ${result.riskScore}%`, 20, 65);
    doc.text(`Risk Level: ${result.riskLevel}`, 20, 72);
    doc.text(`Model Confidence: ${result.confidence}%`, 20, 79);

    // Factors
    doc.setFontSize(16);
    doc.text('Key Factors', 20, 95);
    doc.setFontSize(10);
    let yPos = 105;
    result.factors.forEach((factor) => {
      doc.text(`${factor.name}: ${factor.value} (Impact: ${factor.impact})`, 20, yPos);
      yPos += 7;
    });

    // Recommendations
    doc.setFontSize(16);
    doc.text('Recommendations', 20, yPos + 10);
    doc.setFontSize(10);
    yPos += 20;
    result.recommendations.forEach((rec, index) => {
      const lines = doc.splitTextToSize(`${index + 1}. ${rec}`, 170);
      doc.text(lines, 20, yPos);
      yPos += lines.length * 7;
    });

    // Disclaimer
    yPos += 10;
    doc.setFontSize(8);
    const disclaimer = 'Disclaimer: This prediction is for educational and research purposes only. Always consult with qualified healthcare professionals for medical advice.';
    const disclaimerLines = doc.splitTextToSize(disclaimer, 170);
    doc.text(disclaimerLines, 20, yPos);

    doc.save(`${result.disease}_prediction_${new Date().getTime()}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${riskColors.bg} mb-4`}>
            {result.riskLevel === 'Low' ? (
              <CheckCircle className={`w-10 h-10 ${riskColors.text}`} />
            ) : (
              <AlertCircle className={`w-10 h-10 ${riskColors.text}`} />
            )}
          </div>
          <h1 className="text-4xl mb-2 text-gray-900">Prediction Complete</h1>
          <p className="text-xl text-gray-600">{result.disease} Risk Assessment</p>
        </div>

        {/* Risk Score Card */}
        <div className={`bg-white rounded-xl shadow-lg p-8 mb-8 border-2 ${riskColors.border}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl mb-4 text-gray-900">Risk Assessment</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Risk Score</span>
                    <span className="text-3xl text-gray-900">{result.riskScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${
                        result.riskLevel === 'High'
                          ? 'bg-red-600'
                          : result.riskLevel === 'Medium'
                          ? 'bg-yellow-500'
                          : 'bg-green-600'
                      }`}
                      style={{ width: `${result.riskScore}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Risk Level</span>
                  <span className={`px-4 py-2 rounded-full ${riskColors.bg} ${riskColors.text}`}>
                    {result.riskLevel}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Model Confidence</span>
                  <span className="text-gray-900">{result.confidence}%</span>
                </div>
              </div>
            </div>
            <div>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Factors Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-xl mb-4 text-gray-900">Key Risk Factors</h3>
            <div className="space-y-3">
              {result.factors.map((factor, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-gray-900">{factor.name}</p>
                    <p className="text-sm text-gray-600">Value: {factor.value}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      factor.impact === 'High'
                        ? 'bg-red-100 text-red-700'
                        : factor.impact === 'Medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {factor.impact}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-xl mb-4 text-gray-900">Impact Analysis</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={factorsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} fontSize={12} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 mb-8">
          <h3 className="text-xl mb-4 text-gray-900">Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm">
                  {index + 1}
                </div>
                <p className="text-gray-700 text-sm">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg mb-2 text-gray-900">Important Disclaimer</h3>
              <p className="text-gray-700 leading-relaxed">
                This prediction is generated by a machine learning model for educational and research purposes only.
                It should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always
                consult with qualified healthcare professionals regarding your health concerns.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={downloadPDF}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <Download className="w-5 h-5" />
            <span>Download PDF Report</span>
          </button>
          <button
            onClick={onNewPrediction}
            className="px-8 py-4 bg-white text-gray-700 rounded-lg border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-5 h-5" />
            <span>New Prediction</span>
          </button>
          <Link
            to="/results"
            className="px-8 py-4 bg-white text-gray-700 rounded-lg border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all flex items-center justify-center space-x-2"
          >
            <span>View All Results</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
