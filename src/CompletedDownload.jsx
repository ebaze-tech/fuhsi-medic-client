import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { useAuth } from "./AuthContext";


const CompletedPage = () => {
    const navigate = useNavigate();
    const [showCheckmark, setShowCheckmark] = useState(false);
    const { formId } = useParams()
    const [hasFormId, setHasFormId] = useState(false);
    // const { user, token } = useAuth()

    useEffect(() => {
        if (formId) {
            setHasFormId(true);
        } else {
            setHasFormId(false);
        }
    }, [formId]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowCheckmark(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const handleGoHome = () => {
        const token = localStorage.getItem("token")
        const user = JSON.parse(localStorage.getItem("user"))

        if (!token || !user) {
            navigate("/")
            return
        }

        const isAdmin = user.email.endsWith("@admin.test") || user.email === "admin@admin.test"
        navigate(isAdmin ? "/dashboard/admin" : "/dashboard/user");
    };
    const handleGoBack = () => {
        navigate(-2)
    }

    return (
        <div className="!min-h-screen !flex !items-center !justify-center !bg-green-50">
            <div className="!bg-white !p-8 !rounded-lg !shadow-lg !flex !flex-col !items-center !space-y-6">

                {/* Animated Circle and Checkmark */}
                <div className="!relative !w-24 !h-24">
                    <div className="!absolute !inset-0 !rounded-full !bg-green-100 !animate-ping"></div>
                    <div className="!w-full !h-full !rounded-full !bg-green-500 !flex !items-center !justify-center !text-white !text-4xl">
                        {showCheckmark && "✓"}
                    </div>
                </div>

                <h2 className="!text-3xl !font-bold !text-green-600 text-center">
                    Download Completed!
                </h2>
                <p className="!text-gray-600 text-center">
                    Your PDF has been downloaded successfully.
                </p>

                {hasFormId ? (
                    <button
                        onClick={handleGoBack}
                        className="!bg-green-500 !text-white !px-6 !py-3 !rounded-full !hover:bg-green-600 !transition-all !cursor-pointer"
                    >
                        Go Back
                    </button>
                ) : (
                    <button
                        onClick={handleGoHome}
                        className="!bg-green-500 !text-white !px-6 !py-3 !rounded-full !hover:bg-green-600 transition-all"
                    >
                        Go Back Home
                    </button>
                )}

            </div>
        </div>
    );
};

export default CompletedPage;
