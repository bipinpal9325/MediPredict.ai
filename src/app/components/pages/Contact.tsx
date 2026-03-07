import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  // State management for form submission lifecycle
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear any previous errors when the user starts typing again
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // Pulling keys securely from your Vite .env file
      const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Debugging check: If these are undefined, the .env file isn't loaded properly
      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        throw new Error('EmailJS environment variables are missing. Check your .env file.');
      }

      // The object keys here must match the variables inside your EmailJS template
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'palthor10@gmail.com',
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      // On Success
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Hide success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
      
    } catch (err: any) {
      // Logs the exact error reason from EmailJS (or our missing .env error)
      console.error('EmailJS Error:', err.text || err.message || err);
      setError('Failed to send the message. Please try again later or contact us directly via email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'support@medipredict.ai',
      link: 'mailto:palthor10@gmail.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+91 9325764260',
      link: 'tel:+919325764260',
    },
  ];

  const departments = [
    { name: 'General Inquiry', value: 'general' },
    { name: 'Technical Support', value: 'support' },
    { name: 'Research Collaboration', value: 'research' },
    { name: 'Institution Inquiry', value: 'institution' },
    { name: 'Media & Press', value: 'media' },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl mb-4">Get in Touch</h1>
          <p className="text-xl text-blue-100">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
              <h2 className="text-2xl mb-6 text-gray-900">Send us a Message</h2>
              
              {/* Success Message */}
              {submitted && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-green-700">Thank you! Your message has been sent successfully.</span>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <span className="text-red-700">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow"
                      placeholder="Enter your full name"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow"
                      placeholder="Enter your E-mail Address"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow bg-white"
                    disabled={isSubmitting}
                  >
                    <option value="" disabled>Select a subject</option>
                    {departments.map((dept) => (
                      <option key={dept.value} value={dept.value}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none outline-none transition-shadow"
                    placeholder="Tell us how we can help you..."
                    disabled={isSubmitting}
                  ></textarea>
                </div>
                
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-6 py-4 rounded-lg text-white transition-all shadow-lg flex items-center justify-center space-x-2
                    ${isSubmitting 
                      ? 'bg-blue-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 hover:shadow-xl'
                    }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info & Response Time Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h3 className="text-xl mb-6 text-gray-900">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    className="flex items-start space-x-4 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-100 hover:shadow-md transition-shadow"
                  >
                    <div className="bg-blue-600 text-white rounded-lg p-3">
                      <info.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-600 mb-1">{info.title}</h4>
                      <p className="text-gray-900">{info.content}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
              <h3 className="text-xl mb-3 text-gray-900">Response Time</h3>
              <p className="text-gray-700 mb-4">
                We typically respond to all inquiries within 24-48 hours during business days.
              </p>
              <div className="bg-white rounded-lg p-4 border border-purple-100">
                <p className="text-sm text-gray-700">
                  <strong>Priority Support:</strong> Premium members receive priority response within 4-8 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}