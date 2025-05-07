import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import { useAuth } from "./AuthContext";

const UserScreeningForm = () => {
  const [screening, setScreening] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setError("User not authenticated");
      logout();
      navigate("/user/login");
      return;
    }

    const fetchUserForm = async () => {
      try {
        setLoading(true);
        const response = await API.get("/dashboard/form/student");
        setScreening(response.data);
        setError("");
      } catch (err) {
        console.error("Error fetching screenings:", err);
        if (err.response?.status === 401) {
          logout();
          navigate("/user/login");
        } else {
          setError(
            err.response?.data?.message ||
              "Failed to load screenings. Please try again."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserForm();
  }, [isAuthenticated, user, navigate, logout]);

  const handleRetry = () => window.location.reload();

  const renderTableRow = (data) => (
    <tr
      key={data._id}
      className="!hover:!bg-green-50 !transition-all even:!bg-gray-50"
    >
      <td className="!p-4 !font-medium">{data.surname}</td>
      <td className="!p-4">{data.otherNames}</td>
      <td className="!p-4">{data.age}</td>
      <td className="!p-4">{data.dob}</td>
      <td className="!p-4">{data.sex}</td>
      <td className="!p-4">{data.nationality}</td>
      <td className="!p-4">{data.state}</td>
      <td className="!p-4">{data.maritalStatus}</td>
      <td className="!p-4">{data.faculty}</td>
      <td className="!p-4">{data.matricNo}</td>
      <td className="!p-4">{data.jambRegNo}</td>
      <td className="!p-4">{data.department}</td>
      <td className="!p-4">{data.telNo}</td>
      <td className="!p-4">{data.religion}</td>
      <td className="!p-4">{data.nextOfKinName}</td>
      <td className="!p-4">{data.relationship}</td>
      <td className="!p-4">{data.nextOfKinAddress}</td>
      <td className="!p-4">
        <Link to={`/dashboard/student-form/${data._id}`}>
          <button className="!w-32 !bg-green-200 !text-green-900 !cursor-pointer !font-semibold !rounded-lg !p-2 hover:!bg-green-300">
            View
          </button>
        </Link>
      </td>
    </tr>
  );

  return (
    <div className="!min-h-screen !bg-gray-100 !p-4 sm:!p-8">
      <div className="!mb-6">
        <h1 className="!text-2xl sm:!text-3xl !font-bold !text-gray-800">
          Student Medical Screening
        </h1>
        <Link
          to="/dashboard/user"
          className="!inline-block !mt-4 !text-blue-600 hover:!underline !text-sm"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <div className="!bg-white !p-4 sm:!p-6 !rounded-2xl !shadow-md !overflow-x-auto">
        {loading ? (
          <p className="!text-center !text-gray-600">Loading screenings...</p>
        ) : error ? (
          <div className="!flex !flex-col !items-center !justify-center !space-y-4 !mt-8">
            <p className="!text-red-500 !text-center">{error}</p>
            <button
              onClick={handleRetry}
              className="!px-6 !py-2 !bg-blue-600 !text-white !rounded-lg hover:!bg-blue-700 !transition-all"
            >
              Retry
            </button>
          </div>
        ) : screening === null ? (
          <span className="!text-lg !text-red-600 !font-extrabold !hover:!text-blue-800 !hover:!underline !transition !text-center !flex !flex-col !items-center !justify-center !w-full">
            There was an issue when you filled your form initially.
            <a
              href="mailto:helpdesk@fuhsi.edu.ng"
              className="!text-lg !text-red-600 !border-b-4 !font-extrabold !hover:!text-blue-800 !hover:!underline !transition"
            >
              Click here to contact the admin to have your form printed
            </a>
          </span>
        ) : (
          <div className="!overflow-x-auto">
            <table className="!w-full !text-left !border-collapse min-w-[1200px]">
              <thead>
                <tr className="!bg-green-600 !text-white">
                  <th className="!p-4 !rounded-tl-2xl">Surname</th>
                  <th className="!p-4">Other Names</th>
                  <th className="!p-4">Age</th>
                  <th className="!p-4">DOB</th>
                  <th className="!p-4">Sex</th>
                  <th className="!p-4">Nationality</th>
                  <th className="!p-4">State</th>
                  <th className="!p-4">Marital</th>
                  <th className="!p-4">Faculty</th>
                  <th className="!p-4">Matric No</th>
                  <th className="!p-4">JAMB No</th>
                  <th className="!p-4">Dept</th>
                  <th className="!p-4">Phone</th>
                  <th className="!p-4">Religion</th>
                  <th className="!p-4">Next Of Kin Name</th>
                  <th className="!p-4">Relation</th>
                  <th className="!p-4">Next Of Kin Address</th>
                  <th className="!p-4 !rounded-tr-2xl">Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(screening)
                  ? screening.map(renderTableRow)
                  : renderTableRow(screening)}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserScreeningForm;
