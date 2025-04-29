import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import { FaExclamationCircle, FaSpinner, FaUser } from "react-icons/fa";
import { FiUser, FiHash } from "react-icons/fi";
import Logo from "/fuhsi_logo.png";
import BgImage from "/fushi.webp";

const UserLogin = () => {
  const { login, isAuthenticated } = useAuth();
  const [utmeNo, setUtmeNo] = useState("");
  const [surname, setSurname] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState({
    utmeNo: false,
    surname: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard/user");
    }
  }, [isAuthenticated, navigate]);

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    if (name === "utmeNo") {
      if (!value) {
        newErrors.utmeNo = "UTME Number is required";
      } else if (!/^\d{8}[A-Z]{2}$/.test(value)) {
        newErrors.utmeNo =
          "Format: 12 digits + 2 uppercase letters (e.g., 12345678AB)";
      } else {
        delete newErrors.utmeNo;
      }
    }

    if (name === "surname") {
      if (!value) newErrors.surname = "Surname is required";
      else if (value.length < 2)
        newErrors.surname = "Surname must be at least 2 characters";
      else delete newErrors.surname;
    }
    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "utmeNo") setUtmeNo(value);
    if (name === "surname") setSurname(value);
    validateField(name, value);
  };

  const handleFocus = (field) => {
    setIsFocused({ ...isFocused, [field]: true });
  };

  const handleBlur = (field) => {
    setIsFocused({ ...isFocused, [field]: false });
    validateField(field, field === "utmeNo" ? utmeNo : surname);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateField("utmeNo", utmeNo);
    validateField("surname", surname);

    const currentErrors = {};
    if (!utmeNo) currentErrors.utmeNo = "UTME Number is required";
    if (!surname) currentErrors.surname = "Surname is required";

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await API.post("/auth/user/login", {
        surname,
        utmeNo,
      });
      console.log("API data:", response); // Debug
      const responseData = response.data?.data || response.data;

      if (!responseData?.token || !responseData?.user) {
        throw new Error("Invalid response from server");
      }
      login(responseData.token, responseData.user);
      console.log("handleSubmit: Login successful, navigating to dashboard");
      setTimeout(() => navigate("/dashboard/user", { replace: true }), 0);
    } catch (error) {
      console.error("handleSubmit: Login error:", error);
      setErrors({
        form:
          error.response?.data?.message || "Login failed. Please try again.",
      });
    } finally {
      setLoading(false);
      console.log("handleSubmit: Loading state reset");
    }
  };

  return (
    <div
      className="!min-h-screen !flex !flex-col !items-center !justify-center !p-4 !relative !bg-cover !bg-center !bg-no-repeat"
      style={{ backgroundImage: `url(${BgImage})` }}
    >
      <div className="!absolute !inset-0 !bg-gradient-to-b !from-black/70 !to-black/50" />

      <main className="!relative !w-full !max-w-md !z-10">
        <div className="!bg-white !rounded-xl !shadow-2xl !overflow-hidden">
          {/* Header */}
          <div className="!bg-green-700 !p-6 !text-center">
            <div className="!flex !justify-center !mb-4">
              <img
                src={Logo}
                alt="University Logo"
                className="!w-full !h-12 !object-contain !bg-white !p-2 !rounded-md !shadow-md"
              />
            </div>
            <h1 className="!text-2xl !font-bold !text-white">Student Portal</h1>
            <p className="!text-green-100 !mt-1 !text-sm">
              Federal University of Health Sciences, Ila Orangun
            </p>
          </div>

          {/* Form Container */}
          <div className="!p-6 !sm:p-8">
            {errors.form && (
              <div className="!flex !items-start !gap-3 !bg-red-50 !text-red-700 !p-4 !rounded-lg !text-sm !mb-6 !border !border-red-100">
                <FaExclamationCircle className="!mt-0.5 !flex-shrink-0" />
                <span>{errors.form}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="!space-y-5">
              {/* UTME Number Field */}
              <div>
                <label className="!block !text-sm !font-medium !text-gray-700 !mb-1">
                  UTME Number
                </label>
                <div className="!relative">
                  <div
                    className={`!absolute !inset-y-0 !left-0 !pl-3 !flex !items-center !pointer-events-none ${
                      isFocused.utmeNo ? "!text-blue-600" : "!text-gray-400"
                    }`}
                  >
                    <FiHash size={18} />
                  </div>
                  <input
                    type="text"
                    name="utmeNo"
                    value={utmeNo}
                    onChange={handleChange}
                    onFocus={() => handleFocus("utmeNo")}
                    onBlur={() => handleBlur("utmeNo")}
                    placeholder="Enter your UTME Number as password"
                    className={`!w-full !pl-10 !pr-4 !py-3 !border ${
                      errors.utmeNo ? "!border-red-500" : "!border-gray-300"
                    } !rounded-lg !focus:outline-none !focus:ring-2 ${
                      errors.utmeNo
                        ? "!focus:ring-red-500"
                        : "!focus:ring-blue-500"
                    } !focus:border-transparent !transition`}
                  />
                </div>
                {errors.utmeNo && (
                  <p className="!mt-1 !text-sm !text-red-600">
                    {errors.utmeNo}
                  </p>
                )}
              </div>

              {/* Surname Field */}
              <div>
                <label className="!block !text-sm !font-medium !text-gray-700 !mb-1">
                  Surname
                </label>
                <div className="!relative">
                  <div
                    className={`!absolute !inset-y-0 !left-0 !pl-3 !flex !items-center !pointer-events-none ${
                      isFocused.surname ? "!text-blue-600" : "!text-gray-400"
                    }`}
                  >
                    <FiUser size={18} />
                  </div>
                  <input
                    type="text"
                    name="surname"
                    value={surname}
                    onChange={handleChange}
                    onFocus={() => handleFocus("surname")}
                    onBlur={() => handleBlur("surname")}
                    placeholder="Enter your surname in capital letters"
                    className={`!w-full !pl-10 !pr-4 !py-3 !border ${
                      errors.surname ? "!border-red-500" : "!border-gray-300"
                    } !rounded-lg !focus:outline-none !focus:ring-2 ${
                      errors.surname
                        ? "!focus:ring-red-500"
                        : "!focus:ring-blue-500"
                    } !focus:border-transparent !transition`}
                  />
                </div>
                {errors.surname && (
                  <p className="!mt-1 !text-sm !text-red-600">
                    {errors.surname}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="!w-full !bg-green-700 !hover:!bg-green-800 !text-white !font-medium !py-3 !px-4 !rounded-lg !transition-all !duration-200 !disabled:!opacity-70 !flex !justify-center !items-center !gap-2 !shadow-md !hover:!shadow-lg"
              >
                {loading ? (
                  <>
                    <FaSpinner className="!animate-spin" />
                    <span>Logging in...</span>
                  </>
                ) : (
                  <>
                    <FaUser className="!mr-1" />
                    <span>Login to Portal</span>
                  </>
                )}
              </button>
            </form>

            <div className="!mt-6 !text-center">
              <a
                href="mailto:helpdesk@fuhsi.edu.ng"
                className="!text-sm !text-blue-700 !font-medium !hover:!text-blue-800 !hover:!underline !transition"
              >
                Need help? Contact Support
              </a>
            </div>
          </div>
        </div>
      </main>

      <footer className="!mt-8 !text-white !text-sm !text-center !z-10 !px-4">
        &copy; {new Date().getFullYear()} Federal University of Health Sciences,
        Ila Orangun. All rights reserved.
      </footer>
    </div>
  );
};

export default UserLogin;
