import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-8">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-gray-600 mt-2">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
