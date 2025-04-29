import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import API from "../api";
import { useAuth } from "./AuthContext";

const StudentViewForm = () => {
  const [screening, setScreening] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState("pending");
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const { user, isAuthenticated, logout } = useAuth();
  const { formId } = useParams();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setError("User not authenticated");
      logout();
      navigate("/user/login");
      setLoading(false);
      return;
    }

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    const fetchScreening = async () => {
      try {
        setLoading(true);
        const response = await API.get(`/dashboard/form/student/${formId}`);
        console.log("Form Response", response.data);
        setScreening(response.data);
        setError("");
      } catch (error) {
        console.error("Error fetching screening:", error);
        if (error.response?.status === 401) {
          logout();
          navigate("/user/login");
        } else {
          setError(
            error.response?.data?.message ||
              "Failed to load screening. Please try again."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchScreening();

    return () => {
      clearInterval(progressInterval);
    };
  }, [isAuthenticated, formId, navigate, logout]);

  const handleDownloadPdf = async () => {
    setPdfLoading(true);
    try {
      setPdfLoading(true);
      setPdfError("");

      const response = await API.get(`/questionnaire/${formId}/download`, {
        responseType: "blob",
      });

      console.log(response.data);

      const blob = new Blob([response.data]);

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${formId}-questionnaire-response.pdf`);
      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);

      setSubmissionStatus("completed");
      navigate(`/completed-page/${formId}`);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      setPdfError(
        error.response?.data?.message ||
          "Error generating PDF. Please try again"
      );
    } finally {
      setPdfLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate(-2);
  };


  return (
    <div className="!min-h-screen !bg-gray-100 !p-4 sm:!p-8">
      <div className="!mb-6">
        <h1 className="!text-2xl sm:!text-3xl !font-bold !text-gray-800">
          Student Medical Screening Details
        </h1>
        <p className="!text-gray-600 !mt-2">
          Viewing health screening submission
        </p>
        <Link
          to="/user/screenings"
          className="!inline-block !mt-4 !text-blue-600 hover:!underline !text-sm"
        >
          ← Back to Student Medical Screening List
        </Link>
      </div>

      <div className="!bg-white !p-4 sm:!p-6 !rounded-2xl !shadow-md !overflow-x-auto">
        {loading ? (
          <p className="!text-center !text-gray-600">
            Loading screening details...
          </p>
        ) : error ? (
          <div className="!flex !flex-col !items-center !justify-center !space-y-4 !mt-8">
            <p className="!text-red-500 !text-center">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="!px-6 !py-2 !bg-blue-600 !text-white !rounded-lg hover:!bg-blue-700 !transition-all"
            >
              Retry
            </button>
          </div>
        ) : !screening ? (
          <p className="!text-center !text-gray-600">No screening found.</p>
        ) : (
          <>
            <table className="!w-full !text-left !border-collapse min-w-[1000px] !mb-6">
              <thead>
                <tr className="!bg-green-600 !text-white">
                  <th className="!p-4 !rounded-tl-2xl">Field</th>
                  <th className="!p-4 !rounded-tr-2xl">Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries({
                  Surname: screening.surname,
                  "Other Names": screening.otherNames,
                  Age: screening.age,
                  "Date of Birth": screening.dob,
                  Sex: screening.sex,
                  Nationality: screening.nationality,
                  State: screening.state,
                  "Marital Status": screening.maritalStatus,
                  Faculty: screening.faculty,
                  "Matric Number": screening.matricNo,
                  "JAMB Reg No": screening.jambRegNo,
                  Department: screening.department,
                  "Phone Number": screening.telNo,
                  Religion: screening.religion,
                  "Next of Kin Name": screening.nextOfKinName,
                  Relationship: screening.relationship,
                  "Next of Kin Address": screening.nextOfKinAddress,
                }).map(([field, value]) => (
                  <tr
                    key={field}
                    className="hover:!bg-green-50 !transition-all even:!bg-gray-50"
                  >
                    <td className="!p-4 !font-medium !border !border-gray-200">
                      {field}
                    </td>
                    <td className="!p-4 !border !border-gray-200">
                      {value || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Progress Bar */}
            {submissionStatus === "pending" && (
              <div className="!w-full !bg-gray-200 !rounded-full !h-4 !mb-4">
                <div
                  className="!bg-green-500 !h-4 !rounded-full transition-all duration-300 ease-in-out"
                  style={{ width: `${progress}%` }}
                ></div>
                {progress < 100 && (
                  <p className="!text-center !text-sm !mt-1">
                    Loading, please wait... {progress}%
                  </p>
                )}
              </div>
            )}

            <div className="!flex !justify-between !mt-6 !gap-4">
              <button
                onClick={handleGoBack}
                className="!px-6 !py-2 !bg-gray-500 !hover:!bg-gray-600 !text-white !font-medium !rounded-lg !transition-all !w-full"
              >
                Back to Dashboard
              </button>
              <button
                onClick={handleDownloadPdf}
                disabled={pdfLoading || loading}
                className="!px-6 !py-2 !bg-green-600 !hover:!bg-green-700 !text-white !font-medium !rounded-lg !transition-all !duration-200 !disabled:!opacity-70 !flex !items-center !gap-2 !w-full"
              >
                {pdfLoading ? (
                  <>
                    <svg
                      className="!animate-spin !h-5 !w-5 !text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="!opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="!opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <svg
                      className="!w-5 !h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Download PDF
                  </>
                )}
              </button>
            </div>
            {pdfError && (
              <p className="!text-red-500 !mt-2 !text-center !text-sm">
                {pdfError}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StudentViewForm;
