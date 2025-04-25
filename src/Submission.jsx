import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // React Router for navigation
import API from "../api";

const SubmissionPage = () => {
  const [submissionStatus, setSubmissionStatus] = useState("pending");
  const [isLoading, setIsLoading] = useState(false);
  const [countDown, setCountDown] = useState(3)
  const [statusText, setStatusText] = useState("")
  const location = useLocation()
  const formData = location.state?.formData
  const navigate = useNavigate();

  // Simulate a submission process (e.g., API call to generate the PDF)
  useEffect(() => {
    if (!formData) {
      alert("No form data received.")
      setSubmissionStatus("pending")
      return
    }

    setStatusText(`Starting download in ${countDown}`)

    const interval = setInterval(() => {
      setCountDown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setStatusText("Download started...");
          handleDownload(formData);
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval)
  }, [formData]);
  
  const handleDownload = async (formData) => {
    setIsLoading(true);
    try {
      const response = await API.post("/questionnaire/generate", formData, {
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

  return (
    <div className="!min-h-screen !flex !items-center !justify-center !bg-gray-100">
      <div className="!bg-white !p-6 !rounded-lg !shadow-lg !w-[400px]">
        <h2 className="!text-2xl !font-semibold !text-center">
          {statusText}
        </h2>
        {submissionStatus === "pending" ? (
          <div className="!text-center !text-gray-700 !mt-4 !p-4 !text-center">
            {isLoading && <p>We are processing your details...</p>}
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
