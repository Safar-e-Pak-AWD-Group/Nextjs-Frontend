"use client";

import React from "react";
import Link from "next/link";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">

      {/* About Section */}
      <section className="about-content">
        <h2>About Us</h2>
        <p>
          Safar e Pak is a passionate travel company based in Pakistan, helping
          travelers explore the country’s breathtaking destinations with
          comfort, safety, and style. Since 2024, we’ve been offering guided
          tours, family trips, and adventure packages across Pakistan — from
          the mountains of Hunza to the beaches of Gwadar.
        </p>
        <p>
          Our mission goes beyond organizing tours — we aim to create unforgettable
          travel experiences. Each journey is carefully designed to help you not only
          see the destination but also feel its story, culture, and people.
        </p>
        <p>
          Through Safar e Pak, we bring travelers closer to the true spirit of
          Pakistan — from the snowy peaks of the north to the serene deserts of
          Sindh. Every location has its own charm, and we make sure you experience
          it with comfort and authenticity.
        </p>
        <p>
          We strongly believe in sustainable tourism. That means we support local
          communities, promote eco-friendly practices, and ensure that our presence
          benefits the areas we visit.
        </p>
        <p>
          Today, Safar e Pak stands among Pakistan’s leading travel services,
          known for its reliability, personalized packages, and transparent pricing.
          Our team is dedicated to making every trip memorable, stress-free, and
          full of discovery.
        </p>
      </section>

      {/* Highlights Section */}
      <section className="highlights">
        <div className="highlight-card">
          <h3>Personalized Tours</h3>
          <p>
            Each journey is designed according to your preferences — whether
            you love adventure, culture, or relaxation.
          </p>
        </div>
        <div className="highlight-card">
          <h3>Experienced Guides</h3>
          <p>
            Our local guides ensure that you enjoy authentic experiences safely
            and comfortably.
          </p>
        </div>
        <div className="highlight-card">
          <h3>Safe & Affordable</h3>
          <p>
            We believe in transparent pricing, reliable transport, and trusted
            accommodations.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-vision">
        <div className="mission">
          <h3>Our Mission</h3>
          <p>
            To promote sustainable tourism in Pakistan while empowering local
            communities and creating unforgettable memories for our travelers.
          </p>
        </div>
        <div className="vision">
          <h3>Our Vision</h3>
          <p>
            To make Safar e Pak the first choice for anyone looking to explore
            Pakistan — safely, affordably, and beautifully.
          </p>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta">
        <h2>Ready for Your Next Journey?</h2>
        <p>Book your next adventure with Safar e Pak today!</p>
        <Link href="/booknow">
          <button className="cta-button">Book Now</button>
        </Link>
      </section>

    </div>
  );
};

export default About;
