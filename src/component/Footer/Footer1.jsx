"use client";

import React from "react";
import Link from "next/link"; // ✅ Next.js Link
import "./Footer.css";

function Footer1() {
  return (
    <footer className="footer" style={{ width: "1800px", marginTop: "0px" }}>
      <div className="footer-top">
        <div className="footer-section">
          <h2>Popular Routes</h2>
          <p><Link href="/booknow">Hunza Valley</Link></p>
          <p><Link href="/booknow">Karakoram Highway</Link></p>
          <p><Link href="/booknow">Nathiya Gali</Link></p>
          <p><Link href="/booknow">Lake View Park, Islamabad</Link></p>
          <p><Link href="/booknow">Attabad Lake</Link></p>
        </div>

        <div className="footer-section">
          <h2>Popular Trips</h2>
          <p><Link href="/booknow">Murree to Swat</Link></p>
          <p><Link href="/booknow">Naran Kaghan to Ayubia</Link></p>
          <p><Link href="/booknow">Lahore to Hunza</Link></p>
          <p><Link href="/booknow">Islamabad to Skardu</Link></p>
          <p><Link href="/booknow">Karachi to Quetta</Link></p>
        </div>

        <div className="footer-section">
          <h2>Payment Methods</h2>
          <div className="payment-logos">
            <img src="../../assets/images/easy.png" alt="Easypaisa" />
            <img src="/images/jazz.png" alt="JazzCash" />
          </div>
        </div>
      </div>

      <hr style={{ borderBottom: "1px solid #334155", borderTop: "none" }} />

      <div className="footer-content">
        <div className="footer-section">
          <h2>Customer Care</h2>
          <p>
            <i className="fa-solid fa-phone"></i>&nbsp;&nbsp; Phone: 0321-1234567
          </p>
          <p>
            <i className="fa-solid fa-envelope"></i>&nbsp;&nbsp; Email:{" "}
            <a href="mailto:info@ghoomfir.com">info@ghoomfir.com</a>
          </p>
          <p>
            <i className="fa-solid fa-location-dot"></i>&nbsp;&nbsp; Address: Lahore, Pakistan
          </p>
        </div>

        <div className="footer-section">
          <h2>Follow Us</h2>
          <p>
            <img src="/images/instagram.png" alt="Instagram" className="social-icon" />
            <a href="https://instagram.com" target="_blank">Instagram</a>
          </p>
          <p>
            <img src="/images/facebook.png" alt="Facebook" className="social-icon" />
            <a href="https://facebook.com" target="_blank">Facebook</a>
          </p>
          <p>
            <img src="/images/twitter.png" alt="Twitter" className="social-icon" />
            <a href="https://twitter.com" target="_blank">Twitter</a>
          </p>
          <p>
            <img src="/images/linkedlin.png" alt="Linkedlin" className="social-icon" />
            <a href="https://linkedlin.com" target="_blank">YouTube</a>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Safar-e-Pak by GhoomFir. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer1;
