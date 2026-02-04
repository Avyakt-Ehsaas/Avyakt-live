import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import FeedbackModal from '../../components/ui/Modal/FeedbackModal'
import API from "../../utils/api";

const Feedback = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const [open, setOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [sessionData, setSessionData] = useState(null);

  const FEEDBACK_PENDING_KEY = 'meeting_feedback_pending';

  useEffect(() => {
    // Read session data from localStorage if no sessionId in URL
    if (!sessionId) {
      try {
        const pendingData = localStorage.getItem(FEEDBACK_PENDING_KEY);
        if (pendingData) {
          const data = JSON.parse(pendingData);
          setSessionData(data);
        }
      } catch (e) {
        console.error('Error reading pending feedback data:', e);
      }
    }
  }, [sessionId]);

  const handleClose = () => {
    setOpen(false);
    // Clear the pending feedback data
    localStorage.removeItem(FEEDBACK_PENDING_KEY);
    navigate('/dashboard');
  };

  const handleSubmit = async (payload) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Use sessionId from URL params, or from sessionData from localStorage
      const effectiveSessionId = sessionId || sessionData?.sessionId;
      
      // Add sessionId to payload if available
      const feedbackData = effectiveSessionId 
        ? { ...payload, sessionId: effectiveSessionId }
        : payload;

      console.log('Sending to API:', feedbackData); // Debug log

      const response = await API.post('/feedback', feedbackData);
      console.log('API Response:', response.data); // Debug log

      // Save to local storage as fallback
      localStorage.setItem("last_session_feedback", JSON.stringify(response.data.data));
      
      toast.success("Thank you for your feedback! Your attendance has been marked.");
      handleClose();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      const errorMessage = error.response?.data?.message || 'Failed to submit feedback. Please try again.';
      toast.error(errorMessage);
      setError(errorMessage);
      return;
    } finally {
      setIsSubmitting(false);
    }
  };

  // If no session data and no sessionId, show a message
  if (!sessionId && !sessionData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-6 max-w-md">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Session Found</h3>
          <p className="text-sm text-gray-500 mb-4">
            No session data found for feedback. Please join a session first.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <FeedbackModal
      isOpen={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      error={error}
    />
  );
};

export default Feedback;
