import { useContext } from "react";
import { UserContext } from "../utils/UserContext";
import { Navigate } from "react-router-dom";
import { customFetch } from "../utils/customFetch";
import { toast } from "react-toastify";
import AccountNavbar from "../components/AccountNavbar";

const Account = () => {
  const { user, setUser, loading } = useContext(UserContext);

  // Handle logout with error handling
  const fetchLogout = async () => {
    try {
      await customFetch.post("/api/v1/auth/logout");
      setUser(null);  // Clear the user from context
      toast.info("Goodbye! Hope to see you again soon.");
    } catch (error) {
      toast.error("Error logging out. Please try again.");
    }
  };

  // Show loading spinner when loading is true
  if (loading) {
    return (
      <div className="mx-auto flex mt-24">
        <div className="w-24 h-24 border-4 border-slate-400 rounded-full border-t-cyan-600 animate-spin"></div>
      </div>
    );
  }

  // If no user is logged in, redirect to login page
  if (!loading && !user) {
    return <Navigate to={"/login"} />;
  }

  // Render account info when the user is logged in
  return (
    <section>
      <AccountNavbar />

      <div className="text-center">
        <p>
          Logged in as {user.name} 
        </p>
        <button onClick={fetchLogout} className="primary max-w-sm mt-2">
          Logout
        </button>
      </div>
    </section>
  );
};

export default Account;
