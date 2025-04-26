import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import { useAuth } from "./AuthContext";

const AdminScreenings = () => {
    const [screenings, setScreenings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate()

    const { user, isAuthenticated, logout } = useAuth()

    useEffect(() => {
        console.log(user)
        console.log(isAuthenticated)
        if (!isAuthenticated) {
            setError("User not authenticated")
            setLoading(false)
            return
        };

        const fetchScreenings = async () => {
            try {
                setLoading(true)
                const response = await API.get("/admin-dashboard/all-forms")
                console.log("Form Responses", response.data);
                setScreenings(response.data);
                setError("")
            } catch (error) {
                console.error("Error fetching screenings:", error);
                if (error.response?.status === 401) {
                    // Token expired or invalid
                    logout();
                    navigate('/login');
                } else {
                    setError(error.response?.data?.message || "Failed to load screenings. Please try again.");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchScreenings()
    }, [isAuthenticated, user, navigate, logout])

    if (!isAuthenticated || !user) {
        // Show loading while redirect happens
        return <div className="!min-h-screen !bg-gray-100 !p-4 sm:!p-8">Loading...</div>;
    }

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

            <div className="!bg-white !p-4 sm:!p-6 !rounded-2xl !shadow-md !overflow-x-auto">
                {loading ? (
                    <p className="!text-center !text-gray-600">Loading screenings...</p>
                ) : error ? (
                    <div className="!flex !flex-col !items-center !justify-center !space-y-4 !mt-8">
                        <p className="!text-red-500 !text-center">{error}</p>
                        <button
                            // onClick={}
                            className="!px-6 !py-2 !bg-blue-600 !text-white !rounded-lg hover:!bg-blue-700 !transition-all"
                        >
                            Retry
                        </button>
                    </div>
                ) : screenings.length === 0 ? (
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
                            {screenings.map((student) => (
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
                                    <button className="!p-4 !w-32 !bg-gray-300 !mt-4 !text-center !font-semibold !rounded-md !cursor-pointer !flex !flex-col !items-center !justify-center !gap-2">
                                        <Link to={`/dashboard/${student._id}`}>
                                            Update Form
                                        </Link></button>
                                    <button className="!p-4 !w-32 !bg-gray-300 !mt-4 !text-center !font-semibold !rounded-md !cursor-pointer">
                                        <Link to={`/dashboard/${student._id}`}>
                                            See More
                                        </Link></button>
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