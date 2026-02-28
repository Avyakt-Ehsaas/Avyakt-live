import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState , useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./hooks/useAuth";
//loader
import Loader from "./components/ui/Loader";

//auth 
import Login from "./components/auth/Login";
import Register from "./components/auth/RegisterForm";

//user
import Dashboard from "./pages/user/Dashboard";
import Profile from "./pages/user/Profile";
import JoinMeeting from "./pages/user/JoinMeeting";
import Attendance from "./pages/user/Attendance";
import TreeGrowth from "./pages/user/TreeGrowth";
import Achievements from "./pages/user/Achievements";
import Settings from "./pages/user/Settings";
import EmotionAnalytics from "./pages/user/EmotionAnalytics";
import UserLayout from "./components/layout/UserLayout";


import Feedback from "./pages/user/Feedback";


//admin
import AdminDashboard from "./pages/AdminDashboard";
import AllUsers from "./pages/admin/AllUsers";
import CreateMeeting from "./pages/admin/CreateMeeting";
import AttendanceReports from "./pages/admin/AttendanceReports";
import EngagementControl from "./pages/admin/EngagementControl";
import Analytics from "./pages/admin/Analytics";
import SystemSettings from "./pages/admin/SystemSettings";
import SecurityLogs from "./pages/admin/SecurityLogs";
import AdminLayout from "./components/layout/AdminLayout";
import AttendanceList from "./pages/admin/AttendanceList";
import UserProfile from "./pages/admin/UserProfile";
import SurveyLayout from "./pages/admin/Surveys/SurveyLayout";
import EmailCampaign from "./pages/admin/EmailCampaign";


//public
import LandingPage from "./pages/LandingPage/LandingPage";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs/AboutUs";
import Programs from "./pages/Programs";
import Research from "./pages/Research";
import TextLoader from "./components/ui/TextLoader";
import MeditationVideos from "./pages/user/MeditationVideos";
import TermsAndConditions from "./components/TermsAndConditions";
import PrivacyPolicy from "./components/PrivacyPolicy";
import SubscriptionPlanDetail from "./components/SubscriptionPlanDetail";
import CreateSurvey from "./pages/admin/Surveys/CreateSurvey";
import ActiveSurveys from "./pages/Surveys/ActiveSurveys";
import PreviewSurvey from "./pages/Surveys/PreviewSurvey";
import ThankYouPage from "./pages/Surveys/ThankYouPage";
import SurveyResponses from "./pages/admin/Surveys/SurveyResponses_backup";
import SubscriptionPricing from "./components/SubscriptionPricing";
import VideoPageLayout from "./pages/admin/Videos/VideoPageLayout";
import PlayVideo from "./pages/VideoPlay/PlayVideo";
import SpritualGenAi from "./pages/Spritual/SpritualGenAi";
import Room from "./pages/user/Room";
import SessionsAndRoom from "./pages/user/SessionsAndRoom";




function App() {
  const { user, loadingUser } = useAuth();
    // const [showSplash, setShowSplash] = useState(true);

  // ✅ Loader while checking auth
  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-teal-50">
        <Loader size={60} />
      </div>
    );
  }

  //  useEffect(() => {
  //   const timer = setTimeout(() => setShowSplash(false), 8500);
  //   return () => clearTimeout(timer);
  // }, []);

  // if (showSplash) {
  //   return <TextLoader />; // You can center it with full-screen styles
  // }
  
  return (
    <>
      <BrowserRouter>
        <div>
          <Routes>

            {/* ===========================================
               ✅ PUBLIC ROUTES
            ============================================ */}



            {/* Landing Page - Anyone can access */}
            <Route path="/" element={<LandingPage />} />
            
            <Route path="/dashboard" element={<UserLayout><Dashboard /></UserLayout>} />

              <Route path='/spiritual-edu/genai' element={<SpritualGenAi />} />
            <Route
              path="/auth/login"
              element={
                !user ? (
                  <Login />
                ) : (
                  <Navigate to="/dashboard" replace />
                )
              }
            />

            <Route
              path="/auth/register"
              element={
                !user ? (
                  <Register />
                ) : (
                  <Navigate to="/dashboard" replace />
                )
              }
            />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/research" element={<Research />} />

            <Route path="/meditation-videos" element={<MeditationVideos />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            
            <Route path="/surveys" element={<ActiveSurveys />} />
            <Route path="/surveys/preview/:id" element={<PreviewSurvey />} />
            <Route path="/surveys/thank-you" element={<ThankYouPage />} />

            <Route path="/meditation-video/play/:id" element={<PlayVideo />} />


            <Route
              path="/feedback"
              element={user ? <Feedback /> : <Navigate to="/auth/login" replace />}
            />
          
              <Route
              path="/plans" 
              element={<SubscriptionPricing />} 
              />
              <Route path="/plans/:planId" 
              element={<SubscriptionPlanDetail />} />

              <Route
              path="/admin/dashboard"
              element={<AdminLayout><AdminDashboard /></AdminLayout>}
               />


            {/* ===========================================
               ✅ PROTECTED DASHBOARD ROUTE
            ============================================ */}
           
            <Route
              path="/dashboard"
              element={
                user &&
                  user.role === "admin" ? (
                    <AdminLayout>
                      <AdminDashboard />
                    </AdminLayout>
                  ) :  (
                  <Navigate to="/auth/login" replace />
                )
              }
            />



            {/* ===========================================
               ✅ ADMIN ROUTES (Protected)
            ============================================ */}

            <Route
              path="/admin"
              element={
                user?.role === "admin" ? (
                  <AdminLayout>
                    <AdminDashboard />
                  </AdminLayout>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

          <Route
          path="/admin/surveys"
          element={
            user && user?.role === "admin" ? (
              <AdminLayout>
                <SurveyLayout />
              </AdminLayout>
            ) : (
              <Navigate to="/" replace/>
            )
          }
           />

        <Route
          path="/admin/surveys/create"
          element={
            user && user?.role === "admin" ? (
              <AdminLayout>
                <CreateSurvey />
              </AdminLayout>
            ) : (
              <Navigate to="/" replace/>
            )
          }
           />

        <Route
          path="/admin/email-campaign"
          element={
            user && user?.role === "admin" ? (
              <AdminLayout>
                <EmailCampaign />
              </AdminLayout>
            ) : (
              <Navigate to="/" replace/>
            )
          }
           />

            <Route
          path="/admin/surveys/:id"
          element={
            user && user?.role === "admin" ? (
              <AdminLayout>
            <SurveyResponses />
              </AdminLayout>
          ) : ( <Navigate to="/" replace />)       
          }
           />

           <Route 
           path="/admin/meditation-videos"
           element={
            user && user?.role === "admin" ? (
              <AdminLayout>
                <VideoPageLayout />
              </AdminLayout>
            ) : (
              <Navigate to="/" replace />
            )
           }
           />

            <Route
              path="/admin/users"
              element={
                user && user?.role === "admin" ? (
                  <AdminLayout>
                    <AllUsers />
                  </AdminLayout>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />


             <Route 
             path="/admin/users/:userId" 
             element={
              user?.role === "admin" ? (
                <AdminLayout>
                  <UserProfile />
                </AdminLayout>
              ) : (
                <Navigate to="/" replace />
              )
             } />


            <Route
              path="/admin/create-meeting"
              element={
                user?.role === "admin" ? (
                  <AdminLayout>
                    <CreateMeeting />
                  </AdminLayout>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            <Route
              path="/admin/attendance-reports"
              element={
                user?.role === "admin" ? (
                  <AdminLayout>
                    <AttendanceReports />
                  </AdminLayout>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            <Route
              path="/admin/engagement"
              element={
                user?.role === "admin" ? (
                  <AdminLayout>
                    <EngagementControl />
                  </AdminLayout>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            <Route
              path="/admin/attendence"
              element={
                user?.role === "admin" ? (
                  <AdminLayout>
                   <AttendanceList />
                  </AdminLayout>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            <Route
              path="/admin/settings"
              element={
                user?.role === "admin" ? (
                  <AdminLayout>
                    <SystemSettings />
                  </AdminLayout>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            <Route
              path="/admin/security-logs"
              element={
                user?.role === "admin" ? (
                  <AdminLayout>
                    <SecurityLogs />
                  </AdminLayout>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            {/* ===========================================
               ✅ USER ROUTES (Protected)
            ============================================ */}


            <Route
              path="/user/profile"
              element={
                  <UserLayout>
                    <Profile />
                  </UserLayout>
              }
            />

            <Route
              path="/join-meeting"
              element={
                user ? ( 
                   <UserLayout>
                  <SessionsAndRoom />
                  </UserLayout>) : (
                    <Navigate to="/auth/login" replace />
                  )
              }
            />

            <Route
              path="/attendance"
              element={
                user?.role === "user" ? (
                  <UserLayout>
                    <Attendance />
                  </UserLayout>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            <Route
              path="/user/tree-growth"
              element={
                user?.role === "user" ? (
                  <UserLayout>
                    <TreeGrowth />
                  </UserLayout>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            <Route
              path="/user/achievements"
              element={
                user?.role === "user" ? (
                  <UserLayout>
                    <Achievements />
                  </UserLayout>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            <Route
              path="/user/settings"
              element={
                user?.role === "user" ? (
                  <UserLayout>
                    <Settings />
                  </UserLayout>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            <Route
              path="/user/emotion-analytics"
              element={
               <UserLayout>
                    <EmotionAnalytics />
                  </UserLayout>
              }
            />

            {/* ===========================================
               ✅ FALLBACK
            ============================================ */}

            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </div>
      </BrowserRouter>

      <Toaster position="top-right" />
    </>
  );
}

export default App;
