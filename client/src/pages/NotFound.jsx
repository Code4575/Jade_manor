import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100  p-4">
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-4">
        Sorry, we couldn't find the page you were looking for.
      </p>
      <Link
        to="/"
        className="bg-cyan-600 p-2 mt-6 text-white rounded-md capitalize hover:bg-cyan-700 duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
