import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import QuestionnairePage from "./Page";
// import SubmissionPage from "./components/SubmissionPage";

function App() {
  return (
    <div className="!min-h-screen !bg-gray-100">
      <Routes>
        {/* Route for the questionnaire page */}
        <Route path="/questionnaire-page" element={<QuestionnairePage />} />

        {/* Route for the submission page (if you add it later) */}
        {/* <Route path="/submission-page" element={<SubmissionPage />} /> */}

        {/* Redirect to questionnaire page if no match */}
        <Route
          path="*"
          element={<Navigate to="/questionnaire-page" replace />}
        />
      </Routes>
    </div>
  );
}

export default App;
