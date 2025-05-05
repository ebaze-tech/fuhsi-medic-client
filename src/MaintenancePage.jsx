import React from "react";
import { useNavigate } from "react-router-dom";

const MaintenancePage = () => {
  const navigate = useNavigate();

  const handleRefresh = () => {
    navigate(0); // Reloads the current page
  };

  return (
    <div className="!min-h-screen !flex !flex-col !items-center !justify-center !bg-gray-100 !p-4 !text-center">
      <div className="!max-w-md !mx-auto !bg-white !p-8 !rounded-lg !shadow-lg">
        {/* Maintenance Icon */}
        <div className="!mx-auto !flex !items-center !justify-center !h-24 !w-24 !rounded-full !bg-yellow-100 !mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="!h-12 !w-12 !text-yellow-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="!text-3xl !font-bold !text-gray-800 !mb-4">
          Site Under Maintenance
        </h1>

        {/* Description */}
        <p className="!text-gray-600 !mb-6">
          We're currently working on improving the school's website. Please check back
          later. We apologize for any inconvenience.
        </p>

        {/* Progress Bar (optional) */}
        <div className="!w-full !bg-gray-200 !rounded-full !h-2.5 !mb-6">
          <div
            className="!bg-yellow-500 !h-2.5 !rounded-full !animate-pulse"
            style={{ width: "70%" }}
          ></div>
        </div>

        {/* Contact Info */}
        <div className="!text-sm !text-gray-500 !mb-6">
          <p>Need immediate assistance?</p>
          <p className="!font-medium !text-yellow-600">
            Contact: helpdesk@fuhsi.edu.ng
          </p>
        </div>

        {/* Refresh Button */}
{/*         <button
          onClick={handleRefresh}
          className="!px-6 !py-2 !bg-yellow-500 !text-white !font-medium !rounded-lg hover:!bg-yellow-600 !transition-colors"
        >
          Try Again
        </button> */}
      </div>
    </div>
  );
};

export default MaintenancePage;
