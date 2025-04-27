import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import { FaExclamationCircle, FaSpinner, FaUser } from "react-icons/fa";
import { FiUser, FiMail } from "react-icons/fi";
import Logo from "/fuhsi_logo.png";
import BgImage from "/fushi.webp";
const AdminLogin = () => {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard/admin");
    }
  }, [isAuthenticated, navigate]);

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    if (name === "email") {
      if (!value) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        newErrors.email =
          "Please enter a valid email address (e.g., user@example.com)";
      } else {
        delete newErrors.email;
      }
    }

    if (name === "password") {
      if (!value) {
        newErrors.password = "Password is required";
      } else if (value.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      } else {
        delete newErrors.password;
      }
    }

    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    validateField(name, value);
  };

  const handleFocus = (field) => {
    setIsFocused({ ...isFocused, [field]: true });
  };

  const handleBlur = (field) => {
    setIsFocused({ ...isFocused, [field]: false });
    validateField(field, field === "email" ? email : password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateField("email", email);
    validateField("password", password);

    if (Object.keys(errors).length > 0 || !email || !password) return;

    setLoading(true);
    setErrors({});

    try {
      const { data } = await API.post("/auth/admin/login", { password, email });
      login(data.token, data.user);
      navigate("/dashboard/admin");
    } catch (error) {
      setErrors({
        form:
          error.response?.data?.message || "Login failed. Please try again.",
      });
    } finally {
      setLoading(false);
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
            <h1 className="!text-2xl !font-bold !text-white">Admin Portal</h1>
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
              {/* password Field */}

              {/* UTME Number Field */}
              <div>
                <label className="!block !text-sm !font-medium !text-gray-700 !mb-1">
                  Email
                </label>
                <div className="!relative">
                  <div
                    className={`!absolute !inset-y-0 !left-0 !pl-3 !flex !items-center !pointer-events-none ${
                      isFocused.email ? "!text-blue-600" : "!text-gray-400"
                    }`}
                  >
                    <FiMail size={18} />
                  </div>
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    onFocus={() => handleFocus("email")}
                    onBlur={() => handleBlur("email")}
                    placeholder="Input your email."
                    className={`!w-full !pl-10 !pr-4 !py-3 !border ${
                      errors.email ? "!border-red-500" : "!border-gray-300"
                    } !rounded-lg !focus:outline-none !focus:ring-2 ${
                      errors.email
                        ? "!focus:ring-red-500"
                        : "!focus:ring-blue-500"
                    } !focus:border-transparent !lowercase !transition`}
                  />
                </div>
                {errors.email && (
                  <p className="!mt-1 !text-sm !text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="!block !text-sm !font-medium !text-gray-700 !mb-1">
                  Password
                </label>
                <div className="!relative">
                  <div
                    className={`!absolute !inset-y-0 !left-0 !pl-3 !flex !items-center !pointer-events-none ${
                      isFocused.password ? "!text-blue-600" : "!text-gray-400"
                    }`}
                  >
                    <FiUser size={18} />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    onFocus={() => handleFocus("password")}
                    onBlur={() => handleBlur("password")}
                    placeholder="Enter your password"
                    className={`!w-full !pl-10 !pr-4 !py-3 !border ${
                      errors.password ? "!border-red-500" : "!border-gray-300"
                    } !rounded-lg !focus:outline-none !focus:ring-2 ${
                      errors.password
                        ? "!focus:ring-red-500"
                        : "!focus:ring-blue-500"
                    } !focus:border-transparent !transition`}
                  />
                </div>
                {errors.password && (
                  <p className="!mt-1 !text-sm !text-red-600">
                    {errors.password}
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

export default AdminLogin;
