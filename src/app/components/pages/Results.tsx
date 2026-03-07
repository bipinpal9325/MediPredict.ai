import { useState } from 'react';
import { Download, TrendingUp, Calendar, X, ExternalLink } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Prediction {
  id: number;
  disease: string;
  date: string;
  risk: number;
  level: string;
}

export default function Results() {
  const [timeFilter, setTimeFilter] = useState('all');
  
  const [selectedPrediction, setSelectedPrediction] = useState<Prediction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock historical data
  const predictions: Prediction[] = [
    { id: 1, disease: 'Diabetes', date: '2026-02-12', risk: 35, level: 'Low' },
    { id: 2, disease: 'Heart Disease', date: '2026-02-11', risk: 55, level: 'Medium' },
    { id: 3, disease: 'COVID-19', date: '2026-02-10', risk: 25, level: 'Low' },
    { id: 4, disease: 'Diabetes', date: '2026-02-08', risk: 40, level: 'Medium' },
    { id: 5, disease: 'Heart Disease', date: '2026-02-05', risk: 60, level: 'Medium' },
    { id: 6, disease: 'Cancer', date: '2026-02-03', risk: 45, level: 'Medium' },
  ];

  // Filter Logic
  const filterPredictionsByTime = (preds: Prediction[], filter: string) => {
    if (filter === 'all') return preds;
    
    const now = new Date();
    return preds.filter((p) => {
      const pDate = new Date(p.date);
      const diffTime = Math.abs(now.getTime() - pDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (filter === 'week') return diffDays <= 7;
      if (filter === 'month') return diffDays <= 30;
      if (filter === 'year') return diffDays <= 365;
      
      return true;
    });
  };

  const filteredPredictions = filterPredictionsByTime(predictions, timeFilter);

  // Export Full History Logic
  const exportPredictionsToPDF = () => {
    if (filteredPredictions.length === 0) {
      alert("No predictions found for the selected time period. Cannot export an empty report.");
      return;
    }

    const doc = new jsPDF();
    
    const filterNames: Record<string, string> = {
      all: 'All Time',
      week: 'Last Week',
      month: 'Last Month',
      year: 'Last Year'
    };
    const currentFilterName = filterNames[timeFilter] || 'All Time';

    doc.setFontSize(18);
    doc.text('Prediction History Report', 14, 22);

    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Selected Filter: ${currentFilterName}`, 14, 30);
    doc.text(`Export Date: ${new Date().toLocaleDateString()}`, 14, 36);

    const tableColumns = ["Date", "Disease Type", "Risk Score (%)", "Risk Level"];
    const tableRows = filteredPredictions.map(pred => [
      new Date(pred.date).toLocaleDateString(),
      pred.disease,
      `${pred.risk}%`,
      pred.level
    ]);

    autoTable(doc, {
      startY: 45,
      head: [tableColumns],
      body: tableRows,
      theme: 'striped',
      headStyles: { fillColor: [37, 99, 235] }, 
      styles: { fontSize: 10, cellPadding: 3 },
    });

    doc.save(`Prediction_History_${currentFilterName.replace(/\s+/g, '_')}.pdf`);
  };

  // --- NEW: Generate Single Report PDF ---
  const handleSingleReport = (prediction: Prediction, action: 'download' | 'open') => {
    const doc = new jsPDF();

    // Report Header
    doc.setFontSize(20);
    doc.setTextColor(37, 99, 235); // Blue color
    doc.text('Individual Prediction Report', 14, 22);

    // Metadata
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated Date: ${new Date().toLocaleDateString()}`, 14, 32);
    
    // Line separator
    doc.setDrawColor(200);
    doc.line(14, 38, 196, 38);

    // Section Title
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text('Assessment Details', 14, 48);

    // Generate Table for Single Prediction Data
    autoTable(doc, {
      startY: 55,
      head: [['Metric', 'Result']],
      body: [
        ['Disease Type', prediction.disease],
        ['Date Analysed', new Date(prediction.date).toLocaleDateString()],
        ['Risk Score', `${prediction.risk}%`],
        ['Risk Level', prediction.level],
      ],
      theme: 'grid',
      headStyles: { fillColor: [243, 244, 246], textColor: [0, 0, 0] },
      alternateRowStyles: { fillColor: [255, 255, 255] },
      styles: { fontSize: 11, cellPadding: 6 },
    });

    // Add Disclaimers at the bottom
    const finalY = (doc as any).lastAutoTable.finalY || 100;
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Disclaimer:', 14, finalY + 15);
    doc.text('This prediction is based on the data provided during the assessment.', 14, finalY + 22);
    doc.text('It is highly recommended to share this report with your healthcare provider for clinical evaluation.', 14, finalY + 28);

    const fileName = `${prediction.disease.replace(/\s+/g, '_')}_Report_${prediction.date}.pdf`;

    if (action === 'download') {
      doc.save(fileName);
    } else if (action === 'open') {
      // Create a blob URL and open it in a new tab
      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, '_blank');
    }
  };

  // Modal Handlers
  const handleViewDetails = (prediction: Prediction) => {
    setSelectedPrediction(prediction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPrediction(null);
  };

  // Chart Data
  const trendData = [
    { month: 'Aug', diabetes: 30, heart: 50, covid: 20, cancer: 40 },
    { month: 'Sep', diabetes: 32, heart: 52, covid: 18, cancer: 42 },
    { month: 'Oct', diabetes: 35, heart: 55, covid: 22, cancer: 43 },
    { month: 'Nov', diabetes: 38, heart: 58, covid: 25, cancer: 44 },
    { month: 'Dec', diabetes: 35, heart: 55, covid: 20, cancer: 45 },
    { month: 'Jan', diabetes: 37, heart: 57, covid: 23, cancer: 46 },
    { month: 'Feb', diabetes: 35, heart: 55, covid: 25, cancer: 45 },
  ];

  const distributionData = [
    { name: 'Diabetes', value: 4, color: '#a855f7' },
    { name: 'Heart Disease', value: 3, color: '#ef4444' },
    { name: 'COVID-19', value: 2, color: '#3b82f6' },
    { name: 'Cancer', value: 3, color: '#f97316' },
  ];

  const riskLevelData = [
    { level: 'Low', count: 5 },
    { level: 'Medium', count: 6 },
    { level: 'High', count: 1 },
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High':
        return 'bg-red-100 text-red-700';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'Low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl mb-4">Results & Analytics</h1>
          <p className="text-xl text-blue-100">
            Comprehensive analysis of your prediction history
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {/* ... (Existing stats code remains exactly the same) ... */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="text-sm text-gray-600 mb-1">Total Predictions</div>
            <div className="text-3xl text-gray-900 mb-2">12</div>
            <div className="text-xs text-green-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>+20% this month</span>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="text-sm text-gray-600 mb-1">Average Risk</div>
            <div className="text-3xl text-gray-900 mb-2">42%</div>
            <div className="text-xs text-yellow-600">Medium Range</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="text-sm text-gray-600 mb-1">Most Tested</div>
            <div className="text-3xl text-gray-900 mb-2">4</div>
            <div className="text-xs text-gray-600">Diabetes Tests</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="text-sm text-gray-600 mb-1">Last Test</div>
            <div className="text-3xl text-gray-900 mb-2">2h</div>
            <div className="text-xs text-gray-600">ago</div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Trend Line Chart */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-xl mb-6 text-gray-900">Risk Score Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="diabetes" stroke="#a855f7" strokeWidth={2} />
                <Line type="monotone" dataKey="heart" stroke="#ef4444" strokeWidth={2} />
                <Line type="monotone" dataKey="covid" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="cancer" stroke="#f97316" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Disease Distribution Pie Chart */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-xl mb-6 text-gray-900">Prediction Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Level Distribution */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 mb-12">
          <h3 className="text-xl mb-6 text-gray-900">Risk Level Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={riskLevelData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="level" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Prediction History Table */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl text-gray-900">Prediction History</h3>
            <div className="flex items-center space-x-3">
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="year">Last Year</option>
              </select>
              <button 
                onClick={exportPredictionsToPDF}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export History</span>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">Disease Type</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">Risk Score</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">Risk Level</th>
                  <th className="px-6 py-3 text-left text-xs text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPredictions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      No records found for the selected time filter.
                    </td>
                  </tr>
                ) : (
                  filteredPredictions.map((prediction) => (
                    <tr key={prediction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          {new Date(prediction.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{prediction.disease}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2 mr-2" style={{ width: '100px' }}>
                            <div
                              className={`h-2 rounded-full ${
                                prediction.risk > 70
                                  ? 'bg-red-600'
                                  : prediction.risk > 40
                                  ? 'bg-yellow-500'
                                  : 'bg-green-600'
                              }`}
                              style={{ width: `${prediction.risk}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-900">{prediction.risk}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 rounded-full ${getRiskColor(prediction.level)}`}>
                          {prediction.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button 
                          onClick={() => handleViewDetails(prediction)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Insights */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
            <h4 className="text-lg mb-2 text-gray-900">Positive Trend</h4>
            <p className="text-sm text-gray-600">
              Your overall risk scores have decreased by 12% over the last 3 months. Keep up the healthy lifestyle!
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
            <h4 className="text-lg mb-2 text-gray-900">Recommendation</h4>
            <p className="text-sm text-gray-600">
              Consider regular monitoring of heart disease risk factors. Schedule a checkup with your healthcare provider.
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
            <h4 className="text-lg mb-2 text-gray-900">Next Steps</h4>
            <p className="text-sm text-gray-600">
              Continue monitoring your health parameters and maintain consistency with preventive measures.
            </p>
          </div>
        </div>
      </div>

      {/* View Details Modal */}
      {isModalOpen && selectedPrediction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-xl shadow-2xl max-w-[500px] w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900">Prediction Details</h3>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Disease Type</p>
                  <p className="font-medium text-gray-900 text-lg">{selectedPrediction.disease}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Date Analysed</p>
                  <p className="font-medium text-gray-900 text-lg">{new Date(selectedPrediction.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Risk Score</p>
                  <p className="font-medium text-gray-900 text-lg">{selectedPrediction.risk}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Risk Level</p>
                  <span className={`px-3 py-1 inline-flex text-sm leading-5 rounded-full ${getRiskColor(selectedPrediction.level)}`}>
                    {selectedPrediction.level}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h4 className="text-sm font-semibold text-blue-900 mb-1">System Note</h4>
                <p className="text-sm text-blue-800">
                  This prediction is based on the data provided during the assessment. 
                  It is recommended to share this report with your healthcare provider for a thorough medical evaluation.
                </p>
              </div>
            </div>

            {/* Modal Footer with New Buttons */}
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-3">
              <button 
                onClick={closeModal}
                className="px-5 py-2 w-full sm:w-auto bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium order-3 sm:order-1"
              >
                Close
              </button>
              
              <div className="flex w-full sm:w-auto gap-3 order-1 sm:order-2">
                <button 
                  onClick={() => handleSingleReport(selectedPrediction, 'open')}
                  className="flex-1 sm:flex-none px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center space-x-2 font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Report</span>
                </button>
                <button 
                  onClick={() => handleSingleReport(selectedPrediction, 'download')}
                  className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 font-medium shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}