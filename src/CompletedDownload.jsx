import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const CompletedPage = () => {
    const navigate = useNavigate();
    const [showCheckmark, setShowCheckmark] = useState(false);

    useEffect(() => {
        // Small delay for animation effect
        setTimeout(() => {
            setShowCheckmark(true);
        }, 500);
    }, []);

    const handleGoHome = () => {
        navigate("/"); // or wherever you want to go
    };

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

                <button
                    onClick={handleGoHome}
                    className="!bg-green-500 !text-white !px-6 !py-3 !rounded-full !hover:bg-green-600 transition-all"
                >
                    Go Back Home
                </button>
            </div>
        </div>
    );
};

export default CompletedPage;
