import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import QuestionnairePage from "./BiodataForm";
import SubmissionPage from "./Submission";
import CompletedPage from "./CompletedDownload";
import UserDashboard from "./UserDashboard";
import UserLogin from "./UserLogin";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import AdminScreenings from "./AdminScreeing";
import AdminViewForm from "./AdminViewForm";
import UpdateQuestionnairePage from "./AdminEditForm";
import NotFoundPage from "./NotFound";
import StudentScreenings from "./StudentScreening";
import UserScreeningForm from "./UserScreeningForm";
import StudentViewForm from "./StudentViewForm";
import { Analytics } from "@vercel/analytics/react";
import MaintenancePage from "./MaintenancePage";

const MAINTENANCE_MODE = false;

function App() {
  return (
    <>
      {MAINTENANCE_MODE ? (
        <Routes>
          <Route path="*" element={<MaintenancePage />} />
        </Routes>
      ) : (
        <AuthProvider>
          {/* You can also add a simple wrapper div for layout if you like */}
          <div className="min-h-screen bg-gray-100">
            <Routes>
              {/* User Routes */}
              <Route path="/" element={<UserLogin />} />
              <Route path="/user/login" element={<UserLogin />} />
              <Route path="/dashboard/user" element={<UserDashboard />} />
              <Route path="/user/screenings" element={<UserScreeningForm />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/dashboard/admin" element={<AdminDashboard />} />
              <Route path="/admin/screenings" element={<AdminScreenings />} />

              {/* Forms and Submissions */}
              <Route
                path="/questionnaire-page"
                element={<QuestionnairePage />}
              />
              <Route
                path="/questionnaire-page/update/:formId"
                element={<UpdateQuestionnairePage />}
              />
              <Route
                path="/completed-page/:formId?"
                element={<CompletedPage />}
              />
              <Route path="/download-page" element={<SubmissionPage />} />

              {/* Admin and Student Form Viewing */}
              <Route path="/dashboard/:formId" element={<AdminViewForm />} />
              <Route
                path="/dashboard/form/student/:formId"
                element={<StudentScreenings />}
              />
              <Route
                path="/dashboard/student-form/:formId"
                element={<StudentViewForm />}
              />

              {/* Catch-All Route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>

            {/* Place Analytics component here outside Routes */}
            <Analytics />
          </div>
        </AuthProvider>
      )}
    </>
  );
}

export default App;
