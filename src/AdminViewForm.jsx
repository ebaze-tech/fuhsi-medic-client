import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import API from "../api";
import { useAuth } from "./AuthContext";

const AdminViewForm = () => {
    const [screening, setScreening] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate()

    const { user, isAuthenticated, logout } = useAuth()
    const { formId } = useParams()

    useEffect(() => {
        if (!isAuthenticated) {
            setError("User not authenticated")
            setLoading(false)
            return
        };

        const fetchScreenings = async () => {
            try {
                setLoading(true)
                const response = await API.get(`/admin-dashboard/form/${formId}`)
                console.log("Form Responses", response.data);
                setScreening(response.data);
                setError("")
            } catch (error) {
                console.error("Error fetching screenings:", error);
                if (error.response?.status === 401) {
                    // Token expired or invalid
                    logout();
                    navigate('/user/login');
                } else {
                    setError(error.response?.data?.message || "Failed to load screenings. Please try again.");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchScreenings()
    }, [isAuthenticated, formId, navigate, logout])

    if (!isAuthenticated || !user) {
        // Show loading while redirect happens
        return <div className="!min-h-screen !bg-gray-100 !p-4 sm:!p-8">Loading...</div>;
    }

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
                    to="/admin/screenings"
                    className="!inline-block !mt-4 !text-blue-600 hover:!underline !text-sm"
                >
                    ← Back to Student Medical Screening List
                </Link>
            </div>

            <div className="!bg-white !p-4 sm:!p-6 !rounded-2xl !shadow-md !overflow-x-auto">
                {loading ? (
                    <p className="!text-center !text-gray-600">Loading screening details...</p>
                ) : error ? (
                    <div className="!flex !flex-col !items-center !justify-center !space-y-4 !mt-8">
                        <p className="!text-red-500 !text-center">{error}</p>
                        <button
                            // onClick={handleRetry}
                            className="!px-6 !py-2 !bg-blue-600 !text-white !rounded-lg hover:!bg-blue-700 !transition-all"
                        >
                            Retry
                        </button>
                    </div>
                ) : !screening ? (
                    <p className="!text-center !text-gray-600">No screening found.</p>
                ) : (
                    <table className="!w-full !text-left !border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="!bg-green-600 !text-white">
                                <th className="!p-4 !rounded-tl-2xl">Field</th>
                                <th className="!p-4 !rounded-tr-2xl">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries({
                                'Surname': screening.surname,
                                'Other Names': screening.otherNames,
                                'Age': screening.age,
                                'Date of Birth': screening.dob,
                                'Sex': screening.sex,
                                'Nationality': screening.nationality,
                                'State': screening.state,
                                'Marital Status': screening.maritalStatus,
                                'Faculty': screening.faculty,
                                'Matric Number': screening.matricNo,
                                'JAMB Reg No': screening.jambRegNo,
                                'Department': screening.department,
                                'Phone Number': screening.telNo,
                                'Religion': screening.religion,
                                'Next of Kin Name': screening.nextOfKinName,
                                'Relationship': screening.relationship,
                                'Next of Kin Address': screening.nextOfKinAddress
                            }).map(([field, value]) => (
                                <tr key={field} className="hover:!bg-green-50 !transition-all even:!bg-gray-50">
                                    <td className="!p-4 !font-medium !border !border-gray-200">{field}</td>
                                    <td className="!p-4 !border !border-gray-200">{value || 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AdminViewForm;
