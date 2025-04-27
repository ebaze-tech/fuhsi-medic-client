import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import QuestionnairePage from "./BiodataForm";
import SubmissionPage from "./Submission";
import CompletedPage from "./CompletedDownload";
import UserDashboard from "./UserDashboard";
import UserLogin from "./UserLogin";
import AdminLogin from "./AdminLogin"
import AdminDashboard from "./AdminDashboard";
import AdminScreenings from "./AdminScreeing";
import AdminViewForm from "./AdminViewForm";
import UpdateQuestionnairePage from "./AdminEditForm";
import NotFoundPage from "./NotFound";
import StudentScreenings from "./StudentScreening";
// import SubmissionPage from "./components/SubmissionPage";

function App() {
  return (
    <AuthProvider>
      <div className="!min-h-screen !bg-gray-100">
        <Routes>
          <Route path="/questionnaire-page" element={<QuestionnairePage />} />
          <Route path="/questionnaire-page/update/:formId" element={<UpdateQuestionnairePage />} />

          <Route path="/completed-page" element={<CompletedPage />} />
          <Route path="/completed-page/:formId" element={<CompletedPage />} />
          <Route path="/dashboard/user/:formId" element={<UserDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route
            path="/download-page" element={<SubmissionPage />} />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
          <Route
            path="/user/login"
            element={<UserLogin />}
          />
          <Route
            path="/"
            element={<UserLogin />}
          />
          <Route
            path="/admin/login"
            element={<AdminLogin />}
          />
          <Route path="/admin/screenings" element={<AdminScreenings />} />
          {/* <Route path="/student/screenings" element={<StudentScreenings />} /> */}
          <Route path="/dashboard/form/student/:formId" element={<StudentScreenings />} />
          <Route path={'/dashboard/:formId'} element={<AdminViewForm />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;


