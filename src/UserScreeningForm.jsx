import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import { useAuth } from "./AuthContext";
import QuestionnairePage from "./BiodataForm";

const UserScreeningForm = () => {
  const [screenings, setScreenings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setError("User not authenticated");
      logout();
      navigate("/user/login");
      setLoading(false);
      return;
    }

    const fetchUserForm = async () => {
      try {
        setLoading(true);
        const response = await API.get("/dashboard/form/student");
        console.log(response.data)
        setScreenings(response.data);
        setError("");
      } catch (error) {
        console.error("Error fetching screenings:", error);
        if (error.response?.status === 401) {
          logout();
          navigate("/user/login");
        } else {
          setError(
            error.response?.data?.message ||
              "Failed to load screenings. Please try again."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserForm();
  }, [isAuthenticated, user, navigate, logout]);

  const handleRetry = () => {
    window.location.reload();
  };

  // const filteredScreenings = screenings.filter(
  //   (student) =>
  //     student.surname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     student.otherNames?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     student.matricNo?.toLowerCase().includes(searchQuery.toLowerCase())
  // );

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
        ) : screenings === null ? (
          <QuestionnairePage />
        ) : (
          <>
            <table className="!w-full !text-left !border-collapse min-w-[1000px]">
              <thead>
                <tr className="!bg-green-600 !text-white">
                  <th className="!p-4 !rounded-tl-2xl">Surname</th>
                  <th className="!p-4">Other Names</th>
                  <th className="!p-4">Age</th>
                  <th className="!p-4">Date of Birth</th>
                  <th className="!p-4">Sex</th>
                  <th className="!p-4">Nationality</th>
                  <th className="!p-4">State</th>
                  <th className="!p-4">Marital Status</th>
                  <th className="!p-4">Faculty</th>
                  <th className="!p-4">Matric Number</th>
                  <th className="!p-4">JAMB Reg No</th>
                  <th className="!p-4">Department</th>
                  <th className="!p-4">Phone Number</th>
                  <th className="!p-4">Religion</th>
                  <th className="!p-4">Next of Kin Name</th>
                  <th className="!p-4">Relationship</th>
                  <th className="!p-4">Next of Kin Address</th>
                  <th className="!p-7 !rounded-tr-2xl">View Details</th>
                </tr>
              </thead>
              <tbody>
                {/* {screenings.map((student) => ( */}
                <tr
                  key={screenings._id}
                  className="hover:!bg-green-50 !transition-all even:!bg-gray-50"
                >
                  <td className="!p-4 !font-medium">{screenings.surname}</td>
                  <td className="!p-4">{screenings.otherNames}</td>
                  <td className="!p-4">{screenings.age}</td>
                  <td className="!p-4">{screenings.dob}</td>
                  <td className="!p-4">{screenings.sex}</td>
                  <td className="!p-4">{screenings.nationality}</td>
                  <td className="!p-4">{screenings.state}</td>
                  <td className="!p-4">{screenings.maritalStatus}</td>
                  <td className="!p-4">{screenings.faculty}</td>
                  <td className="!p-4">{screenings.matricNo}</td>
                  <td className="!p-4">{screenings.jambRegNo}</td>
                  <td className="!p-4">{screenings.department}</td>
                  <td className="!p-4">{screenings.telNo}</td>
                  <td className="!p-4">{screenings.religion}</td>
                  <td className="!p-4">{screenings.nextOfKinName}</td>
                  <td className="!p-4">{screenings.relationship}</td>
                  <td className="!p-4">{screenings.nextOfKinAddress}</td>
                  <td className="!flex !flex-col !items-center !gap-2">
                    <Link to={`/dashboard/student-form/${screenings._id}`}>
                      <button className="!w-32 !bg-gray-300 !mt-12 !text-center !font-semibold !rounded-md !cursor-pointer !p-2 hover:!bg-gray-400">
                        See More
                      </button>
                    </Link>
                  </td>
                </tr>
                {/* ))} */}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default UserScreeningForm;
