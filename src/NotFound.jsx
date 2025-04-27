import { useNavigate } from 'react-router-dom';
import { FiHome, FiArrowLeft } from 'react-icons/fi';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="!min-h-screen !flex !items-center !justify-center !bg-white !p-6">
      <div className="!max-w-2xl !w-full !flex !flex-col md:!flex-row !items-center !gap-8">
        <div className="!text-8xl !font-bold !text-blue-600">404</div>
        <div className="!border-l-2 !border-gray-200 !h-24 md:!block !hidden"></div>
        <div>
          <h1 className="!text-3xl !font-bold !text-gray-900 !mb-2">Page not found</h1>
          <p className="!text-gray-600 !mb-6">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <div className="!flex !flex-col sm:!flex-row !gap-3">
            <button
              onClick={() => navigate(-1)}
              className="!flex !items-center !justify-center !px-4 !py-2 !bg-blue-600 !text-white !rounded-md hover:!bg-blue-700 !transition-colors"
            >
              <FiArrowLeft className="!mr-2" />
              Go back
            </button>
            <button
              onClick={() => navigate('/')}
              className="!flex !items-center !justify-center !px-4 !py-2 !border !border-gray-300 !rounded-md hover:!bg-gray-50 !transition-colors"
            >
              <FiHome className="!mr-2" />
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
