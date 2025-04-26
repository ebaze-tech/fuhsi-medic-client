import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import QuestionnairePage from "./BiodataForm";
import SubmissionPage from "./Submission";
import CompletedPage from "./CompletedDownload";
import UserDashboard from "./UserDashboard";
import UserLogin from "./UserLogin";
import AdminLogin from "./AdminLogin"
// import SubmissionPage from "./components/SubmissionPage";

function App() {
  return (
    <div className="!min-h-screen !bg-gray-100">
      <Routes>
        <Route path="/questionnaire-page" element={<QuestionnairePage />} />

        <Route path="/completed-page" element={<CompletedPage />} />
        <Route path="/dashboard/user" element={<UserDashboard />} />
        <Route
          path="/download-page" element={<SubmissionPage />} />
        <Route
          path="*"
          element={<Navigate to="/questionnaire-page" replace />}
        />
        <Route
          path="/user/login"
          element={<UserLogin />}
        />
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />
      </Routes>
    </div>
  );
}

export default App;
