import React, { useState, useEffect } from "react";
import { FiHome, FiUsers, FiCalendar, FiClipboard, FiUserPlus, FiSettings, FiLogOut, FiBell, FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [notifications, setNotifications] = useState(5);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { logout } = useAuth()

/*
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${fileName}"`
        );
*/

  const handleLogout = () => {
    logout()
    if (logout) {
      navigate("/admin/login")
    }
  };

  useEffect(() => {
    setNotifications(5);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="!p-8">
            <h2 className="!text-3xl !font-bold !mb-6 !text-gray-800">Dashboard Overview</h2>
            <div className="!grid !grid-cols-1 md:!grid-cols-3 !gap-6 !mb-8">
              {[
                { title: "Appointments Today", value: 18, color: "green" },
                { title: "New Patients", value: 6, color: "blue" },
                { title: "Pending Records", value: 12, color: "yellow" },
              ].map((item, idx) => (
                <div key={idx} className="!bg-white !p-6 !rounded-2xl !shadow hover:!shadow-lg !transition">
                  <h3 className="!text-gray-600 !font-semibold">{item.title}</h3>
                  <p className="!text-4xl !font-bold !mt-2">{item.value}</p>
                  <p className={`!text-${item.color}-500 !text-sm !mt-1`}>Updated just now</p>
                </div>
              ))}
            </div>
          </div>
        );
      case "students":
        return (
          <div className="!grid !grid-cols-1 md:!grid-cols-3 !gap-6 !w-full !mt-8 !ml-4">
            {[
              { title: "Manage Student Screenings", value: "Click to view submissions", color: "green" },
              // { title: "New Patients", value: 6, color: "blue" },
              // { title: "Pending Records", value: 12, color: "yellow" },
            ].map((item, idx) => (
              <div key={idx} className="!bg-white !p-6 !rounded-2xl !shadow hover:!shadow-lg !transition" onClick={() => navigate('/admin/screenings')}>
                <h3 className="!font-bold">{item.title}</h3>
                <p className="!text-black !text-sm !cursor-pointer hover:!bg-gray-300 !w-48 !text-center !bg-gray-500 !p-2 !mt-4">{item.value}</p>
              </div>
            ))}
          </div>
        );
      case "records":
        return <div className="!p-8 !text-gray-700">Health Records Management</div>;
      case "appointments":
        return <div className="!p-8 !text-gray-700">Appointments Overview</div>;
      case "staff":
        return <div className="!p-8 !text-gray-700">Manage Medical Staff</div>;
      case "settings":
        return <div className="!p-8 !text-gray-700">System Settings</div>;
      case "student screening":
        return (
          <div className="!bg-white !p-6 !rounded-2xl !shadow-md hover:!shadow-lg hover:!bg-green-50 !cursor-pointer !transition-all">
            {/* Add content for "student screening" */}
          </div>
        );
      default:
        return <div className="!p-8 !text-gray-700">Welcome, Admin!</div>;
    }
  };

  return (
    <div className="!flex !min-h-screen !bg-gray-100">
      {/* Sidebar */}
      <aside className={`!bg-white !shadow-lg !flex !flex-col !fixed md:!relative !top-0 !h-full !transition-all !duration-300 z-50 ${menuOpen ? "!left-0" : "!-left-[16rem]"} md:!left-0 !w-64`}>
        <div className="!p-6 !border-b">
          <h1 className="!text-2xl !font-bold !text-green-600">FUHMS Admin</h1>
        </div>
        <nav className="!flex-1 !p-4 !space-y-4">
          {[
            { tab: "overview", icon: FiHome, label: "Dashboard" },
            { tab: "students", icon: FiUsers, label: "Students" },
            { tab: "records", icon: FiClipboard, label: "Records" },
            { tab: "appointments", icon: FiCalendar, label: "Appointments" },
            { tab: "staff", icon: FiUserPlus, label: "Medical Staff" },
            { tab: "settings", icon: FiSettings, label: "Settings" },
          ].map(({ tab, icon: Icon, label }) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setMenuOpen(false);
              }}
              className={`!flex !items-center !w-full !p-3 !rounded-lg ${activeTab === tab ? "!bg-green-100 !text-green-700" : "hover:!bg-gray-100 !text-gray-700"} !transition`}
            >
              <Icon className="!mr-3" />
              {label}
            </button>
          ))}
        </nav>
        <div className="!p-4 !border-t">
          <button
            onClick={handleLogout}
            className="!flex !items-center !w-full !p-3 !rounded-lg hover:!bg-red-100 !text-red-600"
          >
            <FiLogOut className="!mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="!flex-1 !flex !flex-col !overflow-hidden !ml-2 !mr-2">
        {/* Topbar */}
        <header className="!bg-white !shadow-sm">
          <div className="!flex !items-center !justify-between !p-4">
            <button onClick={() => setMenuOpen(!menuOpen)} className="!p-2 !rounded-md hover:!bg-gray-100 md:!hidden">
              <FiMenu className="!w-6 !h-6" />
            </button>
            <h2 className="!text-lg sm:!text-xl !font-bold !text-gray-700 text-center flex-1">Federal University of Health Management Sciences</h2>
            <div className="!flex !items-center !space-x-4">
              <button className="!relative !p-2 !rounded-full hover:!bg-gray-100">
                <FiBell className="!w-6 !h-6" />
                {notifications > 0 && (
                  <span className="!absolute !top-0 !right-0 !bg-red-500 !text-white !text-xs !rounded-full !w-5 !h-5 !flex !items-center !justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              <div className="!w-8 !h-8 !bg-green-600 !rounded-full !flex !items-center !justify-center !text-white !font-semibold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="!flex-1 !overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
