import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiHome, FiUser, FiSettings, FiLogOut, FiBell, FiMessageSquare, FiCalendar, FiPieChart } from "react-icons/fi";
import { useAuth } from "./AuthContext";
import API from "../api";
import { FaFileMedical } from "react-icons/fa";
// sdfcvghb
const UserDashboard = () => {
    const [activeTab, setActiveTab] = useState("home");
    const [notifications, setNotifications] = useState(3);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const { user, isAuthenticated, logout } = useAuth();
    const { formId } = useParams()

    const handleLogout = () => {
        logout();
        if (logout) {
            navigate("/user/login");
        }
    };

    useEffect(() => {
        if (!isAuthenticated || !user) {
            navigate("/user/login");
            return;
        }
        const verifyToken = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                handleLogout()
                return;
            }

            try {
                const response = await API.get("/auth/verify/user");
                console.log(response.data);
            } catch (error) {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    handleLogout();
                } else {
                    console.error("Unexpected error:", error.message);
                }
            }
        };
        verifyToken();
    }, []);

    const renderContent = () => {
        switch (activeTab) {
            case "home":
                return (
                    <div className="!p-8">
                        <h2 className="!text-3xl !font-bold !mb-6 !text-gray-800">Dashboard Overview</h2>
                        <div className="!grid !grid-cols-1 md:!grid-cols-3 !gap-6 !mb-8">
                            {[
                                { title: "Total Screenings", value: "10", trend: "+2 this week", color: "blue" },
                                { title: "Appointments Scheduled", value: "5", trend: "+1 this week", color: "green" },
                                { title: "Health Resources Accessed", value: "15", trend: "+5 this month", color: "yellow" },
                            ].map((item, index) => (
                                <div key={index} className="!bg-white !p-6 !rounded-2xl !shadow-md hover:!shadow-lg !transition-all">
                                    <h3 className="!font-semibold !text-gray-600">{item.title}</h3>
                                    <p className="!text-3xl !font-bold !mt-2">{item.value}</p>
                                    <p className={`!text-${item.color}-500 !text-sm !mt-2`}>{item.trend}</p>
                                </div>
                            ))}
                        </div>

                        <div className="!bg-white !p-6 !rounded-2xl !shadow-md hover:!shadow-lg !transition-all">
                            <h3 className="!text-lg !font-semibold !mb-4 !text-gray-800">Recent Activity</h3>
                            <div className="!space-y-4">
                                {[
                                    { text: 'Screening "Blood Test" updated', time: "2 hours ago" },
                                    { text: "Appointment scheduled with Dr. Smith", time: "5 hours ago" },
                                    { text: 'Health Resource "Nutrition Guide" accessed', time: "Yesterday" },
                                ].map((activity, idx) => (
                                    <div key={idx} className="!border-b !pb-3 last:!border-0">
                                        <p className="!font-medium !text-gray-700">{activity.text}</p>
                                        <p className="!text-sm !text-gray-500">{activity.time}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case "profile":
                return (
                    <div className="!p-8">
                        <h2 className="!text-3xl !font-bold !mb-6 !text-gray-800">Profile Settings</h2>
                        <div className="!bg-white !p-6 !rounded-2xl !shadow-md">
                            <p className="!text-gray-600">Update your personal and health profile here.</p>
                        </div>
                    </div>
                );
            case "health":
                return (
                    <div className="!p-8">
                        <h2 className="!text-2xl !font-bold !text-gray-800 !mb-6">Health & Screenings</h2>
                        <div className="!grid !grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3 !gap-6">
                            {[
                                { title: "My Screening Submissions", description: "View your past health screening submissions.", path: `/dashboard/form/${formId}` },
                                { title: "Book a Health Screening", description: "Schedule a new health screening appointment.", path: "/student/book-screening" },
                                { title: "Health Resources", description: "Access guides and information on maintaining good health.", path: "/student/health-resources" },
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => navigate(item.path)}
                                    className="!bg-white !p-6 !rounded-2xl !shadow hover:!shadow-lg hover:!bg-green-50 !cursor-pointer !transition-all"
                                >
                                    <h3 className="!text-lg !font-semibold !text-green-700">{item.title}</h3>
                                    <p className="!mt-2 !text-gray-600">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default:
                return <div className="!p-8 !text-gray-700">Welcome to your dashboard!</div>;
        }
    };

    return (
        <div className="!flex !h-screen !bg-gray-100">
            {/* Sidebar */}
            <aside className={`!w-64 !bg-white !shadow-lg ${sidebarOpen ? "block" : "hidden md:block"} md:!flex !flex-col`}>
                <div className="!p-6 !border-b">
                    <h1 className="!text-2xl !font-bold !text-blue-700">Student Dashboard</h1>
                </div>
                <nav className="!flex-1 !p-4 !space-y-4">
                    {[
                        { tab: "home", icon: FiHome, label: "Home" },
                        { tab: "profile", icon: FiUser, label: "Profile" },
                        { tab: "health", icon: FaFileMedical, label: "Medical Clearance" },
                        { tab: "messages", icon: FiMessageSquare, label: "Messages" },
                        { tab: "analytics", icon: FiPieChart, label: "Analytics" },
                        { tab: "calendar", icon: FiCalendar, label: "Calendar" },
                    ].map(({ tab, icon: Icon, label }) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`!flex !items-center !w-full !p-3 !rounded-lg ${activeTab === tab ? "!bg-blue-100 !text-blue-600" : "hover:!bg-gray-100 !text-gray-700"
                                } !transition-all`}
                        >
                            <Icon className="!mr-3" />
                            {label}
                        </button>
                    ))}
                </nav>
                <div className="!p-4 !border-t">
                    <button
                        onClick={handleLogout}
                        className="!flex !items-center !w-full !p-3 !rounded-lg hover:!bg-red-100 !text-red-600 !font-semibold"
                    >
                        <FiLogOut className="!mr-3" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="!flex-1 !flex !flex-col !overflow-hidden">
                {/* Topbar */}
                <header className="!bg-white !shadow-sm">
                    <div className="!flex !items-center !justify-between !p-4">
                        <div className="md:!hidden">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="!p-2 !rounded-md hover:!bg-gray-100"
                            >
                                <svg className="!w-6 !h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>

                        <div className="!flex !items-center !space-x-4">
                            <button className="!p-2 !relative !rounded-full hover:!bg-gray-100">
                                <FiBell className="!w-5 !h-5 !text-gray-600" />
                                {notifications > 0 && (
                                    <span className="!absolute !top-0 !right-0 !bg-red-500 !text-white !text-xs !rounded-full !w-5 !h-5 !flex !items-center !justify-center">
                                        {notifications}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="!flex-1 !overflow-y-auto">{renderContent()}</main>
            </div>
        </div>
    );
};

export default UserDashboard;
