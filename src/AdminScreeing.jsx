import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import { useAuth } from "./AuthContext";

const AdminScreenings = () => {
  const [screenings, setScreenings] = useState([]);
  const [filteredScreenings, setFilteredScreenings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  // const { formId } = useParams()

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setError("User not authenticated");
      logout();
      navigate("/admin/login");
      setLoading(false);
      return;
    }
    console.log(isAuthenticated);

    const fetchScreenings = async () => {
      try {
        setLoading(true);
        const response = await API.get("/dashboard/all-forms");
        setScreenings(response.data);
        setFilteredScreenings(response.data); // Initialize filtered data
        setError("");
      } catch (error) {
        console.error("Error fetching screenings:", error);
        if (error.response?.status === 401) {
          logout();
          navigate("/admin/login");
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
    fetchScreenings();
  }, [isAuthenticated, user, navigate, logout]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = screenings.filter(
      (student) =>
        student.surname.toLowerCase().includes(query) ||
        student.otherNames.toLowerCase().includes(query) ||
        student.matricNo.toLowerCase().includes(query) ||
        student.jambRegNo.toLowerCase().includes(query) ||
        student.faculty.toLowerCase().includes(query) ||
        student.department.toLowerCase().includes(query) ||
        student.state.toLowerCase().includes(query)
    );
    setFilteredScreenings(filtered);
  };

  return (
    <div className="!min-h-screen !bg-gray-100 !p-4 sm:!p-8">
      <div className="!mb-6">
        <h1 className="!text-2xl sm:!text-3xl !font-bold !text-gray-800">
          Student Medical Screenings
        </h1>
        <p className="!text-gray-600 !mt-2">
          Manage all student health screening submissions
        </p>
        <Link
          to="/dashboard/admin"
          className="!inline-block !mt-4 !text-blue-600 hover:!underline !text-sm"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Search Input */}
      <div className="!mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by name, matric no, jamb no, faculty or department..."
          className="!w-full !p-3 !border !border-gray-300 !rounded-lg !shadow-sm focus:!outline-none focus:!ring-2 focus:!ring-green-400"
        />
      </div>

      <div className="!bg-white !p-4 sm:!p-6 !rounded-2xl !shadow-md !overflow-x-auto">
        {loading ? (
          <p className="!text-center !text-gray-600">Loading screenings...</p>
        ) : error ? (
          <div className="!flex !flex-col !items-center !justify-center !space-y-4 !mt-8">
            <p className="!text-red-500 !text-center">{error}</p>
            <button className="!px-6 !py-2 !bg-blue-600 !text-white !rounded-lg hover:!bg-blue-700 !transition-all">
              Retry
            </button>
          </div>
        ) : filteredScreenings.length === 0 ? (
          <p className="!text-center !text-gray-600">No screenings found.</p>
        ) : (
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
              {filteredScreenings.map((student) => (
                <tr
                  key={student._id}
                  className="hover:!bg-green-50 !transition-all even:!bg-gray-50"
                >
                  <td className="!p-4 !font-medium">{student.surname}</td>
                  <td className="!p-4">{student.otherNames}</td>
                  <td className="!p-4">{student.age}</td>
                  <td className="!p-4">{student.dob}</td>
                  <td className="!p-4">{student.sex}</td>
                  <td className="!p-4">{student.nationality}</td>
                  <td className="!p-4">{student.state}</td>
                  <td className="!p-4">{student.maritalStatus}</td>
                  <td className="!p-4">{student.faculty}</td>
                  <td className="!p-4">{student.matricNo}</td>
                  <td className="!p-4">{student.jambRegNo}</td>
                  <td className="!p-4">{student.department}</td>
                  <td className="!p-4">{student.telNo}</td>
                  <td className="!p-4">{student.religion}</td>
                  <td className="!p-4">{student.nextOfKinName}</td>
                  <td className="!p-4">{student.relationship}</td>
                  <td className="!p-4">{student.nextOfKinAddress}</td>
                  <td className="!flex !flex-col !items-center !gap-2">
                    <Link to={`/questionnaire-page/update/${student._id}`}>
                      <button className="!w-32 !bg-gray-300 !text-center !font-semibold !rounded-md !cursor-pointer !mt-12 !p-2 hover:!bg-gray-400">
                        Update Form
                      </button>
                    </Link>
                    <Link to={`/dashboard/${student._id}`}>
                      <button className="!w-32 !bg-gray-300 !text-center !font-semibold !rounded-md !cursor-pointer !mt-4 !p-2 hover:!bg-gray-400">
                        See More
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminScreenings;
