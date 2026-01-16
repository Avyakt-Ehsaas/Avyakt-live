import React from "react";
import { useEffect, useState } from "react";
import API from "../../utils/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ActiveSurveys = () => {
  const [activeSurveys, setActiveSurveys] = useState([]);
  const [loadingSurveys, setLoadingSurveys] = useState(false);
  const [hasFetchedSurveys, setHasFetchedSurveys] = useState(false);
    const navigate = useNavigate();
    
  const fetchActiveSurveys = async (req, res) => {
    try {
      setLoadingSurveys(true);
      const response = await API.get("/surveys/ActiveSurveys");
      setActiveSurveys(response.data.activeSurveys);
      setHasFetchedSurveys(true);
      console.log(response);
      toast.success("Surveys fetched successfully");
    } catch (error) {
      toast.error("Unable to fetch surveys");
    } finally {
      setLoadingSurveys(false);
    }
  };

  useEffect(() => {
    if (!hasFetchedSurveys) {
      fetchActiveSurveys();
    }
  }, [hasFetchedSurveys]);
  return (
    <>
      <div className="py-8 px-2  ">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <h1 className="text-5xl  text-center font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
          Active Surveys
        </h1>

        {loadingSurveys ? (
          <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-purple-200 rounded-full animate-pulse"></div>
              <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-purple-600 border-r-pink-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-ping"></div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col max-w-[80vw] mx-auto">
              {activeSurveys.map((survey, idx) => (
                <div
                  key={survey._id}
                  className="group relative bg-white/40 backdrop-blur-sm rounded-xl border border-white/30 p-6 hover:bg-orange-100 transition-all duration-300"
                >
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-xl text-orange-500 mb-1">
                        {survey.title}
                      </h3>
                      <h4 className="text-sm text-gray-600">
                      {survey.description.slice(0, 30)} {"..."}
                      </h4> 
                      <p className="text-sm text-gray-600">
                        Last updated:{" "}
                        {new Date(survey.updatedAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => navigate(`/surveys/preview/${survey._id}`)}
                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors hover:scale-[1.1 border border-orange-800]"
                      >
                        Join Survey
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ActiveSurveys;
