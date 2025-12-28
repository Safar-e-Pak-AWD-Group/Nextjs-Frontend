"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import "./Nav.css";

import img1 from "../../assets/images/dashboard.jpg"; // ✅ ensure this path exists

function Nav() {
  const pathname = usePathname();
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const check = () =>
      typeof window !== "undefined" && !!localStorage.getItem("token");
    setIsLoggedIn(check());

    const onStorage = () => setIsLoggedIn(check());
    if (typeof window !== "undefined") {
      window.addEventListener("storage", onStorage);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("storage", onStorage);
      }
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    router.push("/login");
  };

  const handledash = () => {
    if (isLoggedIn) {
      router.push("/dash");
    }
  };

  return (
    <nav className="navbar">
      {/* ✅ Logo */}
      <Link href="/home" className="logo">
        <span className="logo-text">Safar-e-Pak</span>
      </Link>

      {/* ✅ Navigation Links */}
      <div className="nav-links">
        <ul>
          <li>
            <Link href="/home" className={pathname === "/home" ? "active" : ""}>Home</Link>
          </li>
          <li>
            <Link href="/services" className={pathname === "/services" ? "active" : ""}>Services</Link>
          </li>
          <li>
            <Link href="/destination" className={pathname === "/destination" ? "active" : ""}>Destinations</Link>
          </li>
          <li>
            <Link href="/gallery" className={pathname === "/gallery" ? "active" : ""}>Gallery</Link>
          </li>
          <li>
            <Link href="/weather" className={pathname === "/weather" ? "active" : ""}>Weather</Link>
          </li>
          <li>
            <Link href="/about" className={pathname === "/about" ? "active" : ""}>About</Link>
          </li>
          <li>
            <Link href="/contact" className={pathname === "/contact" ? "active" : ""}>Contact Us</Link>
          </li>
        </ul>
      </div>

      {/* ✅ Right Side Buttons */}
      {isLoggedIn ? (
        <>
          <div className="nav-buttons">
            <Link href="/booknow" className="book-now-btn">Book Now</Link>
          </div>

          <img
            src={img1}
            alt="Dashboard"
            title="Your Account"
            className="dashboard-icon"
            onClick={handledash}
          />

          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <Link href="/login" className="login-btn">Login</Link>
      )}
    </nav>
  );
}

export default Nav;
