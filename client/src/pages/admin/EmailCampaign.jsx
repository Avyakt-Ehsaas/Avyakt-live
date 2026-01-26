import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSend, FiMail, FiUsers, FiFileText, FiCheckCircle, FiAlertCircle, FiUpload, FiX, FiPlus, FiTrash2, FiEdit3, FiEye, FiCopy } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';
import API from '../../utils/api';
import { motion, AnimatePresence } from 'framer-motion';

const EmailCampaign = () => {
    const { user: currentUser } = useAuth();
    const navigate = useNavigate();

    // Authorization check
    useEffect(() => {
        if (currentUser && currentUser.role !== 'admin') {
            toast.error('You are not authorized to access this page');
            navigate('/');
        }
    }, [currentUser, navigate]);

    // Form states
    const [emails, setEmails] = useState('');
    const [subject, setSubject] = useState('');
    const [htmlContent, setHtmlContent] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [sendResults, setSendResults] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [userPreview, setUserPreview] = useState([]);

    // Email templates
    const [templates, setTemplates] = useState([
        {
            id: 1,
            name: 'Welcome Email',
            subject: 'Welcome to Avyakt Ehsaas',
            content: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 28px;">Avyakt Ehsaas</h1>
                        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Welcome to our Community</p>
                    </div>
                    <div style="background: #f9f9f9; padding: 30px; border-radius: 10px; margin-top: 20px;">
                        <h2 style="color: #333; margin-top: 0;">Welcome {{name}}!</h2>
                        <p style="color: #666; font-size: 16px; line-height: 1.5;">
                            Thank you for joining Avyakt Ehsaas. We're excited to have you on this conscious journey with us.
                        </p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="{{loginUrl}}" style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; display: inline-block;">
                                Get Started
                            </a>
                        </div>
                    </div>
                </div>
            `
        },
        {
            id: 2,
            name: 'Meeting Reminder',
            subject: 'Reminder: Upcoming Meditation Session',
            content: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 30px; border-radius: 10px; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 28px;">Session Reminder</h1>
                        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Don't miss your meditation</p>
                    </div>
                    <div style="background: #f9f9f9; padding: 30px; border-radius: 10px; margin-top: 20px;">
                        <h2 style="color: #333; margin-top: 0;">Hi {{name}},</h2>
                        <p style="color: #666; font-size: 16px; line-height: 1.5;">
                            This is a friendly reminder about your upcoming meditation session scheduled for:
                        </p>
                        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f093fb;">
                            <p style="margin: 0; color: #333;"><strong>Date:</strong> {{date}}</p>
                            <p style="margin: 10px 0 0 0; color: #333;"><strong>Time:</strong> {{time}}</p>
                        </div>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="{{meetingUrl}}" style="background: #f093fb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; display: inline-block;">
                                Join Session
                            </a>
                        </div>
                    </div>
                </div>
            `
        },
        {
            id: 3,
            name: 'Newsletter',
            subject: 'Avyakt Ehsaas Monthly Newsletter',
            content: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); padding: 30px; border-radius: 10px; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 28px;">Monthly Newsletter</h1>
                        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Your journey continues</p>
                    </div>
                    <div style="background: #f9f9f9; padding: 30px; border-radius: 10px; margin-top: 20px;">
                        <h2 style="color: #333; margin-top: 0;">Hello {{name}},</h2>
                        <p style="color: #666; font-size: 16px; line-height: 1.5;">
                            Here's what's new at Avyakt Ehsaas this month...
                        </p>
                        <div style="margin: 30px 0;">
                            <h3 style="color: #333;">Featured Content</h3>
                            <p style="color: #666;">Discover new meditation techniques and insights from our community.</p>
                        </div>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="{{appUrl}}" style="background: #fa709a; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; display: inline-block;">
                                Explore More
                            </a>
                        </div>
                    </div>
                </div>
            `
        }
    ]);

    const handleSendEmail = async () => {
        if (!emails.trim() || !subject.trim() || !htmlContent.trim()) {
            toast.error('Please fill in all fields');
            return;
        }

        // Parse emails
        const emailArray = emails.split(',').map(email => email.trim()).filter(email => email);
        
        if (emailArray.length === 0) {
            toast.error('Please provide at least one valid email address');
            return;
        }

        setIsSending(true);
        try {
            const response = await API.post('/email/send', {
                emails: emailArray,
                subject,
                htmlContent
            });

            if (response.data.success) {
                setSendResults(response.data.report);
                toast.success(`Email campaign sent successfully! ${response.data.report.totalEmails} emails processed.`);
            } else {
                toast.error('Some emails failed to send. Please check the results.');
                setSendResults(response.data.report);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send emails');
        } finally {
            setIsSending(false);
        }
    };

    const loadTemplate = (template) => {
        setSubject(template.subject);
        setHtmlContent(template.content);
        toast.success(`Template "${template.name}" loaded`);
    };

    const clearForm = () => {
        setEmails('');
        setSubject('');
        setHtmlContent('');
        setSendResults(null);
        setUserPreview([]);
    };

    // Fetch user data for preview
    const fetchUserPreview = async () => {
        const emailArray = emails.split(',').map(email => email.trim()).filter(email => email);
        
        if (emailArray.length === 0) {
            setUserPreview([]);
            return;
        }

        try {
            // For now, we'll show a simple preview since we don't have an endpoint to fetch user data
            // In production, you might want to add an endpoint to fetch user names by emails
            const previewData = emailArray.map(email => ({
                email,
                name: email.split('@')[0] || 'User', // Fallback to email prefix
                found: false // We don't know if they exist in DB without an API call
            }));
            setUserPreview(previewData);
        } catch (error) {
            console.error('Error fetching user preview:', error);
        }
    };

    // Update user preview when emails change
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchUserPreview();
        }, 500); // Debounce for 500ms

        return () => clearTimeout(timer);
    }, [emails]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-purple-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Email Campaign</h1>
                            <p className="text-gray-600 text-sm sm:text-base">Send beautiful emails to your community</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                            <button
                                onClick={() => setShowPreview(!showPreview)}
                                className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm sm:text-base"
                            >
                                <FiEye className="text-base sm:text-lg" />
                                {showPreview ? 'Hide' : 'Show'} Preview
                            </button>
                            <button
                                onClick={clearForm}
                                className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm sm:text-base"
                            >
                                <FiTrash2 className="text-base sm:text-lg" />
                                Clear
                            </button>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2 space-y-6"
                    >
                        {/* Email Recipients */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <FiUsers className="text-emerald-600 text-xl" />
                                <h2 className="text-xl font-semibold text-gray-800">Recipients</h2>
                            </div>
                            <textarea
                                value={emails}
                                onChange={(e) => setEmails(e.target.value)}
                                placeholder="Enter email addresses separated by commas (e.g., user1@example.com, user2@example.com)"
                                className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                            />
                            <div className="mt-2 text-sm text-gray-500">
                                {emails.split(',').filter(e => e.trim()).length} email(s) detected
                            </div>
                        </div>

                        {/* User Preview */}
                        {userPreview.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <FiCheckCircle className="text-blue-600 text-xl" />
                                    <h2 className="text-xl font-semibold text-gray-800">Personalization Preview</h2>
                                </div>
                                <div className="text-sm text-gray-600 mb-3">
                                    These users will receive personalized emails with their names:
                                </div>
                                <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-lg">
                                    {userPreview.map((user, index) => (
                                        <div key={index} className="flex items-center justify-between px-3 py-2 border-b border-gray-100 last:border-b-0">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-800">{user.name}</div>
                                                    <div className="text-xs text-gray-500">{user.email}</div>
                                                </div>
                                            </div>
                                            <div className="text-xs text-gray-400">
                                                {user.found ? '✓ Found' : '? Will be fetched'}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-3 text-xs text-gray-500 bg-blue-50 p-2 rounded">
                                    💡 Names will be automatically fetched from the database when sending. The preview shows estimated names.
                                </div>
                            </div>
                        )}

                        {/* Subject */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <FiFileText className="text-pink-500 text-xl" />
                                <h2 className="text-xl font-semibold text-gray-800">Subject</h2>
                            </div>
                            <input
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Enter email subject"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                            />
                        </div>

                        {/* Email Content */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <FiEdit3 className="text-purple-500 text-xl" />
                                    <h2 className="text-xl font-semibold text-gray-800">Email Content</h2>
                                </div>
                                <div className="text-sm text-gray-500">
                                    HTML Format
                                </div>
                            </div>
                            <textarea
                                value={htmlContent}
                                onChange={(e) => setHtmlContent(e.target.value)}
                                placeholder="Enter your HTML email content here..."
                                className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none font-mono text-sm"
                            />
                        </div>

                        {/* Send Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleSendEmail}
                            disabled={isSending}
                            className="w-full py-4 bg-gradient-to-r from-pink-400 to-blue-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                            {isSending ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    Sending Campaign...
                                </>
                            ) : (
                                <>
                                    <FiSend />
                                    Send Email Campaign
                                </>
                            )}
                        </motion.button>
                    </motion.div>

                    {/* Sidebar */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        {/* Templates */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <FiMail className="text-purple-500 text-xl" />
                                <h2 className="text-xl font-semibold text-gray-800">Templates</h2>
                            </div>
                            <div className="space-y-3">
                                {templates.map((template) => (
                                    <motion.button
                                        key={template.id}
                                        whileHover={{ scale: 1.02 }}
                                        onClick={() => loadTemplate(template)}
                                        className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition"
                                    >
                                        <div className="font-medium text-gray-800">{template.name}</div>
                                        <div className="text-sm text-gray-500 truncate">{template.subject}</div>
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Results */}
                        {sendResults && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-2xl shadow-lg p-6"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <FiCheckCircle className="text-green-600 text-xl" />
                                    <h2 className="text-xl font-semibold text-gray-800">Campaign Results</h2>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Total Emails:</span>
                                        <span className="font-semibold">{sendResults.totalEmails}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Successful:</span>
                                        <span className="font-semibold text-green-600">{sendResults.successBatches * 50}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Failed:</span>
                                        <span className="font-semibold text-red-600">{sendResults.failedBatches * 50}</span>
                                    </div>
                                    {sendResults.errors.length > 0 && (
                                        <div className="mt-4 p-3 bg-red-50 rounded-lg">
                                            <div className="text-sm font-medium text-red-800 mb-2">Errors:</div>
                                            {sendResults.errors.map((error, index) => (
                                                <div key={index} className="text-xs text-red-600">
                                                    Batch {error.batchIndex}: {error.error.message || 'Unknown error'}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* Tips */}
                        <div className="bg-gradient-to-br from-emerald-100 to-pink-100 rounded-2xl p-6">
                            <h3 className="font-semibold text-gray-800 mb-3">💡 Pro Tips</h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li>• Use <code className="bg-white px-1 rounded">{'{{name}}'}</code> for dynamic name personalization</li>
                                <li>• Test your email with a small group first</li>
                                <li>• Keep subject lines under 50 characters</li>
                                <li>• Include a clear call-to-action</li>
                                <li>• Mobile-friendly design increases engagement</li>
                                <li>• Names are automatically fetched from user database</li>
                            </ul>
                        </div>
                    </motion.div>
                </div>

                {/* Preview Modal */}
                <AnimatePresence>
                    {showPreview && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                            onClick={() => setShowPreview(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.9 }}
                                className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex items-center justify-between p-6 border-b">
                                    <h3 className="text-xl font-semibold text-gray-800">Email Preview</h3>
                                    <button
                                        onClick={() => setShowPreview(false)}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                                    >
                                        <FiX className="text-xl" />
                                    </button>
                                </div>
                                <div className="p-6 overflow-auto max-h-[calc(90vh-100px)]">
                                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                                        <iframe
                                            srcDoc={htmlContent || '<p>No content to preview</p>'}
                                            className="w-full h-96"
                                            title="Email Preview"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default EmailCampaign;
