import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import API from "../api";

const SubmissionPage = () => {
  const [submissionStatus, setSubmissionStatus] = useState("pending");
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Simulate a submission process (e.g., API call to generate the PDF)
  useEffect(() => {
    setTimeout(() => {
      setSubmissionStatus("success");
    }, 2000);
  }, []);

  const handleDownload = async ({ formData }) => {
    setIsLoading(true);
    try {
      const response = await API.post("/generate-pdf", formData, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "questionnaire.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
      navigate("/completed-page");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate("/questionnaire-page");
  };
  if (loading) {
    return <p>Loading. Please wait...</p>;
  }
  return (
    <div className="!min-h-screen !flex !items-center !justify-center !bg-gray-100">
      <div className="!bg-white !p-6 !rounded-lg !shadow-lg !w-[400px]">
        <h2 className="!text-2xl !font-semibold !text-center">
          Submission Successful
        </h2>
        {submissionStatus === "pending" ? (
          <div className="!text-center !text-gray-700 !mt-4">
            <p>We are processing your details...</p>
            <p>Please wait a moment.</p>
          </div>
        ) : (
          <div className="!text-center !text-gray-700 !mt-4">
            <p>Your details have been successfully submitted!</p>
            <div className="!mt-4">
              <button
                className="!bg-green-500 !text-white !px-4 !py-2 !rounded !mr-4"
                onClick={handleDownload}
              >
                Download PDF
              </button>
              <button
                className="!bg-gray-500 !text-white !px-4 !py-2 !rounded"
                onClick={handleGoBack}
              >
                Go Back to Questionnaire
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmissionPage;
