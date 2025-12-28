"use client";

import React, { useState, useEffect, useRef } from "react";
import TourMap from "../Map/TourMap";
import Image from "next/image";
import "./Home.css";

const slides = [
  "/images/aaron-burden-aRya3uMiNIA-unsplash.jpg",
  "/images/ales-krivec-N-aTikX-b00-unsplash.jpg",
  "/images/marc-zimmer-yktwU2t1qHA-unsplash.jpg",
  "/images/kalen-emsley-Bkci_8qcdvQ-unsplash.jpg",
  "/images/luca-bravo-O453M2Liufs-unsplash.jpg",
];

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);

  const tourLocations = [
    { name: "Hunza Valley", lat: 36.3167, lng: 74.65 },
    { name: "Skardu", lat: 35.2971, lng: 75.6333 },
    { name: "Murree", lat: 33.907, lng: 73.394 },
  ];

  // Automatic slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // 4 seconds per slide
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      alert(`Searching for: ${searchQuery}`);
    }
  };

  return (
    <div className="w-full">
      {/* HERO / SLIDER SECTION */}
      <section className="header" id="safar">
        <div
          ref={slideRef}
          className="slider"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((src, index) => (
            <div key={index} className="slide">
              <Image src={src} alt={`Slide ${index + 1}`} fill className="object-cover" />
            </div>
          ))}
          <div className="slider-overlay"></div>
        </div>

        {/* Text Overlay */}
        <div className="text-box">
          <h1 className="typing">
            Safar-e-Pak by <span>GhoomFir</span>
          </h1>
          <p>
            Discover the breathtaking landscapes and rich cultural heritage of Pakistan.
          </p>
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              className="search-box"
              placeholder="Search destinations, trips..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
      </section>

      {/* MAP SECTION */}
      <section style={{ padding: "40px", background: "#f5f5f5" }}>
        <TourMap locations={tourLocations} />
      </section>
    </div>
  );
}

export default Home;
