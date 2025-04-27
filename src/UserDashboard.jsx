import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiHome, FiUser, FiSettings, FiLogOut, FiBell, FiMessageSquare, FiCalendar, FiPieChart } from "react-icons/fi";
import { useAuth } from "./AuthContext";

const UserDashboard = () => {
    const [activeTab, setActiveTab] = useState("home");
    const [notifications, setNotifications] = useState(3);
    const [sidebarOpen, setSideBarOpen] = useState(false)
    const navigate = useNavigate();
    const { logout } = useAuth()

    const handleLogout = () => {
        logout()
        navigate("/user/login");
    };

    const renderContent = () => {
        switch (activeTab) {
            case "home":
                return (
                    <div className="!p-8">
                        <h2 className="!text-3xl !font-bold !mb-6 !text-gray-800">Dashboard Overview</h2>
                        <div className="!grid !grid-cols-1 md:!grid-cols-3 !gap-6 !mb-8">
                            {[
                                { title: "Monthly Revenue", value: "$4,250", trend: "+12%", color: "green" },
                                { title: "Active Projects", value: "7", trend: "2 new this week", color: "blue" },
                                { title: "Tasks Completed", value: "24/36", trend: "66% completion", color: "yellow" },
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
                                    { text: 'Project "Redesign" updated', time: "2 hours ago" },
                                    { text: "New message from client", time: "5 hours ago" },
                                    { text: 'Task "Homepage UI" completed', time: "Yesterday" },
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
                            <p className="!text-gray-600">Profile information and settings form</p>
                        </div>
                    </div>
                );
            case "messages":
                return <div className="!p-8 !text-gray-700">Messages Content</div>;
            case "analytics":
                return <div className="!p-8 !text-gray-700">Analytics Content</div>;
            case "calendar":
                return <div className="!p-8 !text-gray-700">Calendar Content</div>;
            default:
                return <div className="!p-8 !text-gray-700">Welcome to your dashboard!</div>;
        }
    };

    return (
        <div className="!flex !h-screen !bg-gray-100">
            {/* Sidebar */}
            <aside className="!hidden md:!flex !flex-col !w-64 !bg-white !shadow-lg">
                <div className="!p-6 !border-b">
                    <h1 className="!text-2xl !font-bold !text-blue-700">User Dashboard</h1>
                </div>
                <nav className="!flex-1 !p-4 !space-y-4">
                    {[
                        { tab: "home", icon: FiHome, label: "Home" },
                        { tab: "profile", icon: FiUser, label: "Profile" },
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
                            <div className="md:!hidden">
                                <button onClick={() => setSideBarOpen(true)} className="!p-2 !rounded-md hover:!bg-gray-100">
                                    <svg className="!w-6 !h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>

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
                            <div className="!flex !items-center">
                                <div className="!w-8 !h-8 !rounded-full !bg-blue-500 !flex !items-center !justify-center !text-white !font-bold">
                                    U
                                </div>
                                <span className="!ml-2 !font-medium !hidden md:!inline !text-gray-700">User</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Mobile Sidebar */}
                {sidebarOpen && (
                    <div className="!fixed !inset-0 !z-50 !flex">
                        <div className="!relative !w-64 !bg-white !shadow-lg !flex !flex-col !p-6">
                            <button onClick={() => setSideBarOpen(false)} className="!absolute !top-4 !right-4 !text-gray-600 hover:!text-gray-900">
                                ✕
                            </button>
                            <h1 className="!text-2xl !font-bold !text-blue-700 !mb-6">User Dashboard</h1>
                            <nav className="!space-y-4">
                                {[
                                    { tab: "home", icon: FiHome, label: "Home" },
                                    { tab: "profile", icon: FiUser, label: "Profile" },
                                    { tab: "messages", icon: FiMessageSquare, label: "Messages" },
                                    { tab: "analytics", icon: FiPieChart, label: "Analytics" },
                                    { tab: "calendar", icon: FiCalendar, label: "Calendar" },
                                ].map(({ tab, icon: Icon, label }) => (
                                    <button
                                        key={tab}
                                        onClick={() => {
                                            setActiveTab(tab);
                                            setSideBarOpen(false);
                                        }}
                                        className={`!flex !items-center !w-full !p-3 !rounded-lg ${activeTab === tab ? "!bg-blue-100 !text-blue-600" : "hover:!bg-gray-100 !text-gray-700"
                                            } !transition-all`}
                                    >
                                        <Icon className="!mr-3" />
                                        {label}
                                    </button>
                                ))}
                            </nav>
                            <div className="!mt-auto">
                                <button
                                    onClick={handleLogout}
                                    className="!flex !items-center !w-full !p-3 !rounded-lg hover:!bg-red-100 !text-red-600 !font-semibold"
                                >
                                    <FiLogOut className="!mr-3" />
                                    Logout
                                </button>
                            </div>
                        </div>

                        {/* Overlay */}
                        <div
                            className="!flex-1 !bg-black !bg-opacity-40"
                            onClick={() => setSideBarOpen(false)}
                        />
                    </div>
                )}


                {/* Dashboard Content */}
                <main className="!flex-1 !overflow-y-auto !p-6">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default UserDashboard;
