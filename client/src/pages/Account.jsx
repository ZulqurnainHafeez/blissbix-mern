import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Account.css";

function Account() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    // User is not logged in
    if (!token) {
      navigate("/login");
      return;
    }

    const getUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Save latest user information
        setUser(response.data.user);

        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );
      } catch (error) {
        console.error("Account error:", error);

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setError(
          "Your session has expired. Please login again."
        );

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [navigate]);

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    navigate("/login");
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="account-page">
        <div className="account-container">
          <div className="account-header">
            <span>BLISSBIX COSMETICS</span>

            <h1>My Account</h1>

            <p>
              Loading your account...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <div className="account-page">
        <div className="account-container">
          <div className="account-header">
            <span>BLISSBIX COSMETICS</span>

            <h1>My Account</h1>

            <p className="account-error">
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // ACCOUNT PAGE
  // =====================================================

  return (
    <div className="account-page">
      <div className="account-container">

        {/* HEADER */}

        <div className="account-header">
          <span>BLISSBIX COSMETICS</span>

          <h1>
            My Account
          </h1>

          <p>
            Manage your Blissbix account.
          </p>
        </div>


        {/* USER INFORMATION */}

        {user && (
          <div className="account-info">

            <div className="account-row">
              <span>
                Full Name
              </span>

              <strong>
                {user.name || "Not provided"}
              </strong>
            </div>


            <div className="account-row">
              <span>
                Email Address
              </span>

              <strong>
                {user.email}
              </strong>
            </div>


            <div className="account-row">
              <span>
                Phone
              </span>

              <strong>
                {user.phone || "Not provided"}
              </strong>
            </div>


            <div className="account-row">
              <span>
                Address
              </span>

              <strong>
                {user.address || "Not provided"}
              </strong>
            </div>


            <div className="account-row">
              <span>
                Account Role
              </span>

              <strong>
                {user.role || "Customer"}
              </strong>
            </div>

          </div>
        )}


        {/* ACCOUNT ACTIONS */}

        <div className="account-actions">

          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  );
}

export default Account;