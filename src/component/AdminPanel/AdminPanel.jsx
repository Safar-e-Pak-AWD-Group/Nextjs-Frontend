"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./AdminPanel.css";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [toast, setToast] = useState(null);
  const [bookings, setBookings] = useState([]);



  const router = useRouter();
  const token = typeof window !== "undefined" && localStorage.getItem("adminToken");

  // -----------------------------
  // LOGOUT FUNCTION
  // -----------------------------
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/login");
  };

  // -----------------------------
  // FETCH USERS
  // -----------------------------
  const fetchUsers = async () => {
    if (!token) {
      setError("Admin not logged in");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 403) throw new Error("Access denied. Invalid admin token.");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

const fetchBookings = async () => {
  try {
    const res = await fetch(
      "http://localhost:5000/api/bookings/bookings"
    );
    const data = await res.json();
    setBookings(data);
  } catch (err) {
    console.error(err);
  }
};



useEffect(() => {
  fetchUsers();
  fetchBookings();
}, []);

  // -----------------------------
  // DELETE USER
  // -----------------------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete user");
      setUsers(users.filter((u) => u._id !== id));
      setToast({ type: "success", message: "User deleted!" });
    } catch (err) {
      console.error(err);
      setToast({ type: "error", message: err.message });
    }
  };

  // -----------------------------
  // BULK DELETE
  // -----------------------------
  const handleBulkDelete = async () => {
    if (selectedUsers.length === 0) return alert("Select users to delete!");
    if (!window.confirm(`Delete ${selectedUsers.length} selected users?`)) return;

    try {
      await Promise.all(
        selectedUsers.map((id) =>
          fetch(`http://localhost:5000/api/admin/users/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );
      setUsers(users.filter((u) => !selectedUsers.includes(u._id)));
      setSelectedUsers([]);
      setToast({ type: "success", message: "Selected users deleted!" });
    } catch (err) {
      console.error(err);
      setToast({ type: "error", message: err.message });
    }
  };

  // -----------------------------
  // ENABLE EDIT MODE
  // -----------------------------
  const handleEdit = (user) => {
    setEditUser(user._id);
    setForm({ name: user.name, email: user.email });
  };

  // -----------------------------
  // UPDATE USER
  // -----------------------------
  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${editUser}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to update user");
      const updatedUsers = users.map((u) => (u._id === editUser ? { ...u, ...form } : u));
      setUsers(updatedUsers);
      setEditUser(null);
      setToast({ type: "success", message: "User updated!" });
    } catch (err) {
      console.error(err);
      setToast({ type: "error", message: err.message });
    }
  };

  // -----------------------------
  // SELECT USER FOR BULK
  // -----------------------------
  const toggleSelect = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter((u) => u !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  //confirm booking button function
const confirmBooking = async (id) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/bookings/bookings/${id}/confirm`,
      { method: "PUT" }
    );

    if (!res.ok) {
      throw new Error("Failed to confirm booking");
    }

    setToast({ type: "success", message: "Booking confirmed!" });
    fetchBookings(); // 🔁 refresh
  } catch (err) {
    console.error(err);
    setToast({ type: "error", message: err.message });
  }
};




  // -----------------------------
  // FILTERED USERS BY SEARCH
  // -----------------------------
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  // -----------------------------
  // RENDER
  // -----------------------------
  if (loading) return <p className="loading">Loading users...</p>;
  if (error)
    return (
      <div className="error-container">
        <p className="error">{error}</p>
        <button onClick={handleLogout} className="logout-btn">Go to Login</button>
      </div>
    );

  return (
    <div className="admin-container">
      <div className="admin-header-row">
        <h1 className="admin-header">SafarPak Admin Panel</h1>
      </div>

      {/* SEARCH & BULK DELETE */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="delete-btn" onClick={handleBulkDelete} style={{ marginLeft: "10px" }}>
          Delete Selected
        </button>
      </div>

      {/* STATS */}
      <div className="stats-row">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{users.length}</p>
        </div>
        <div className="stat-card">
          <h3>Selected Users</h3>
          <p>{selectedUsers.length}</p>
        </div>
      </div>

      {/* USER LIST */}
      {filteredUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="user-grid">
          {filteredUsers.map((user) => (
            <div key={user._id} className="user-card">
              {user.profileImage && <img src={user.profileImage} alt="profile" className="user-image" />}
              <p className="user-name">{user.name}</p>
              <p className="user-email">{user.email}</p>
              <div>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user._id)}
                  onChange={() => toggleSelect(user._id)}
                />
                <span> Select</span>
              </div>
              <div className="btn-row">
                <button className="edit-btn" onClick={() => handleEdit(user)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EDIT BOX */}
      {editUser && (
        <div className="edit-box">
          <h2>Edit User</h2>
          <input className="input-box" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" />
          <input className="input-box" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" />
          <div style={{ marginTop: "10px" }}>
            <button className="update-btn" onClick={handleUpdate}>Update</button>
            <button className="cancel-btn" onClick={() => setEditUser(null)} style={{ marginLeft: "10px" }}>Cancel</button>
          </div>
        </div>
      )}

<h2>Pending Bookings</h2>

{bookings.filter(b => b.status?.toLowerCase() === "pending").length === 0 && (
  <p>No pending bookings</p>
)}

{bookings
  .filter((b) => b.status?.toLowerCase() === "pending")
  .map((b) => (
    <div key={b._id} className="booking-card">
      <p>
        <b>User:</b>{" "}
        {typeof b.userId === "object"
          ? b.userId.email
          : b.userId}
      </p>
      <p><b>Trip:</b> {b.destination}</p>
      <p><b>Price:</b> Rs {b.price}</p>

      <button onClick={() => confirmBooking(b._id)}>
        Confirm ✅
      </button>
    </div>
))}





      <button className="logout-btn" onClick={handleLogout}>Logout</button>

      {/* TOAST */}
      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.message} <button onClick={() => setToast(null)}>X</button>
        </div>
      )}
    </div>
  );
}
