"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./Dashboard.css";
import img1 from "../../assets/images/dashboard.jpg";

function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [hoverWeather, setHoverWeather] = useState(null);
  const [hoverLoading, setHoverLoading] = useState(false);

  const WEATHER_KEY = "7b3bccf8b0e54d9590195436250312";

  const fetchHoverWeather = async (city) => {
    try {
      setHoverLoading(true);
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${WEATHER_KEY}&q=${city}`
      );
      const data = await res.json();
      setHoverWeather(data);
    } catch (err) {
      console.error(err);
    } finally {
      setHoverLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (!token || !savedUser) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(savedUser);
    setUser(parsedUser);

    if (parsedUser._id || parsedUser.id) {
      fetchBookings(parsedUser._id || parsedUser.id);
    }
  }, [router]);

  const fetchBookings = async (userId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/bookings?userId=${userId}`);
      const data = await res.json();

      if (res.ok) {
        setBookings(data);
        console.log("✅ Bookings fetched:", data);
      } else {
        console.error("❌ Failed to fetch bookings:", data.message);
      }
    } catch (error) {
      console.error("❌ Error fetching bookings:", error);
    }
  };

  const handleDelete = async (bookingId) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${bookingId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b._id !== bookingId));
        alert("Booking deleted successfully ✅");
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete booking. Try again!");
      }
    } catch (error) {
      console.error("❌ Error deleting booking:", error);
      alert("Network error. Try again!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setBookings([]);
    router.push("/login");
  };

  if (!user) {
    return (
      <div className="loading-screen">
        <h2>Loading your dashboard...</h2>
      </div>
    );
  }

  const totalBookings = bookings.length;
  const confirmedCount = bookings.filter((b) => b.status === "confirmed").length;
  const pendingCount = bookings.filter((b) => b.status === "pending").length;

  return (
    <div className="dashboard-container">
      {/* ===== Navbar ===== */}
      <nav className="dashboard-nav">
        <h2 className="logo">Safar-e-Pak Dashboard</h2>
        <div className="nav-right">
          <span className="user-chip">{user.fullName || user.name || "Traveler"}</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      {/* ===== Profile Section ===== */}
      <div className="profile-section">
        <img src={user.profileImage || img1} alt="Profile" className="profile-img" />
        <div className="profile-info">
          <h3>{user.fullName || user.name}</h3>
          <p>{user.email}</p>
          <div className="profile-meta">
            <span className="badge-soft">Member</span>
            <span className="badge-soft">Total Bookings: {totalBookings || 0}</span>
          </div>
        </div>
      </div>

      {/* ===== Summary Row ===== */}
      <div className="summary-row">
        <div className="summary-card">
          <span className="summary-title">Total Trips</span>
          <span className="summary-value">{totalBookings}</span>
        </div>
        <div className="summary-card">
          <span className="summary-title">Confirmed</span>
          <span className="summary-value">{confirmedCount}</span>
        </div>
        <div className="summary-card">
          <span className="summary-title">Pending</span>
          <span className="summary-value">{pendingCount}</span>
        </div>
      </div>

      {/* ===== Bookings Section ===== */}
      <div className="booking-section">
        <h2>Your Bookings</h2>
        <p className="subtitle">Track your upcoming and past journeys with Safar-e-Pak.</p>

        {bookings.length > 0 ? (
          <div className="booking-list">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="booking-card"
                onMouseEnter={() => fetchHoverWeather(booking.destination || booking.tripName)}
                onMouseLeave={() => setHoverWeather(null)}
              >
                <h3>{booking.tripName || booking.destination}</h3>

                <div className="booking-meta">
                  <span>
                    <strong>Date:</strong>{" "}
                    {booking.date ? new Date(booking.date).toLocaleDateString() : "N/A"}
                  </span>
                  <span>
                    <strong>Price:</strong> Rs {booking.price}
                  </span>
                </div>

                {/* ===== WEATHER HOVER UI ===== */}
                {hoverWeather &&
                  hoverWeather.location?.name?.toLowerCase() ===
                    (booking.destination || "").toLowerCase() && (
                    <div className="weather-hover">
                      {hoverLoading ? (
                        <p>Loading weather...</p>
                      ) : (
                        <>
                          <p>🌡 Temp: {hoverWeather.current.temp_c}°C</p>
                          <p>☁ {hoverWeather.current.condition.text}</p>
                          <img src={hoverWeather.current.condition.icon} alt="weather" />
                        </>
                      )}
                    </div>
                  )}

                <div className="booking-card-footer">
                  <span className={`status ${booking.status}`}>{booking.status}</span>

                  <button className="delete-btn" onClick={() => handleDelete(booking._id)}>
                    Delete Booking
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-bookings">You don&apos;t have any bookings yet.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
