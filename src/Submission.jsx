import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api";

const SubmissionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData;

  const [submissionStatus, setSubmissionStatus] = useState("pending");
  const [isLoading, setIsLoading] = useState(false);
  const [countDown, setCountDown] = useState(3);
  const [statusText, setStatusText] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!formData) {
      alert("No form data received.");
      navigate("/questionnaire-page");
      return;
    }

    const interval = setInterval(() => {
      setCountDown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setStatusText("Download started...");
          handleDownload(formData);
          return 0;
        } else {
          setStatusText(`Starting download in ${prev - 1}...`);
          return prev - 1;
        }
      });
    }, 1000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [formData]);

  const handleDownload = async (data) => {
    setIsLoading(true);
    try {
      const response = await API.post("/questionnaire/generate", data, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "questionnaire.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();

      setSubmissionStatus("completed");
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
        <h2 className="!text-2xl !font-semibold !text-center mb-6">
          {statusText || "Preparing download..."}
        </h2>

        {/* Progress Bar */}
        {submissionStatus === "pending" && (
          <div className="!w-full !bg-gray-200 !rounded-full !h-4 !mb-4 overflow-hidden">
            <div
              className="!bg-green-500 !h-full transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        {submissionStatus === "pending" ? (
          <div className="!text-center !text-gray-700 !mt-4 !p-4">
            {isLoading && <p>We are processing your details...</p>}
            <p>Please wait a moment.</p>
          </div>
        ) : (
          <div className="!text-center !text-gray-700 !mt-4">
            <p>Your details have been successfully submitted!</p>
            <div className="!mt-4">
              <button
                className="!bg-green-500 !text-white !px-4 !py-2 !rounded !mr-4"
                onClick={() => handleDownload(formData)}
              >
                Download PDF Again
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
