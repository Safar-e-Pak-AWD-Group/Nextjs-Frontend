"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  sanitizeInput,
  validateFullName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../../utils/sanitize";
import "./Signup.css";

function Signup() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  // Handle input change with sanitization
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: sanitizeInput(value),
    });
  };

  // Handle submit with validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const nameError = validateFullName(formData.fullName);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmError = validateConfirmPassword(
      formData.password,
      formData.confirmPassword
    );

    if (nameError || emailError || passwordError || confirmError) {
      setError(nameError || emailError || passwordError || confirmError);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || "Registration successful!");
        router.push("/login");
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1 className="brand">Safar-e-Pak</h1>
        <h2>Create Your Account</h2>
        <p className="subtitle">Join us and start your next journey today.</p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>

        <p className="login-link">
          Already have an account?{" "}
          <Link href="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
