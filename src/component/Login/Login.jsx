"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  sanitizeInput,
  validateEmail,
  validatePassword,
} from "@/utils/validation";

import "./Login.css";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    const userToken = localStorage.getItem("token");
    const adminToken = localStorage.getItem("adminToken");

    if (userToken) {
      router.replace("/home");
    } else if (adminToken) {
      router.replace("/adminpanel");
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const cleanValue = sanitizeInput(value);

    setFormData({ ...formData, [name]: cleanValue });

    let newErrors = { ...errors };
    if (name === "email") newErrors.email = validateEmail(cleanValue);
    if (name === "password") newErrors.password = validatePassword(cleanValue);
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      setMessage("Please fix the errors before continuing.");
      return;
    }

    try {
      const isAdmin = formData.email === "hhlgroup@gmail.com";
      const url = isAdmin
        ? "http://localhost:5000/api/admin/login"
        : "http://localhost:5000/api/users/login";

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        if (isAdmin) {
          localStorage.setItem("adminToken", data.token);
          alert("Admin login successful!");
          router.replace("/adminpanel");
        } else {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          alert("Login successful!");
          router.replace("/home");
        }
      } else {
        setMessage(data.message || "Invalid email or password!");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setMessage("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Welcome Back 👋</h2>
        <p className="login-subtitle">Login to continue your journey</p>

        {message && <p className="login-message">{message}</p>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "invalid" : "valid"}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "invalid" : "valid"}
              required
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don’t have an account?{" "}
            <Link href="/signup" className="signup-link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}