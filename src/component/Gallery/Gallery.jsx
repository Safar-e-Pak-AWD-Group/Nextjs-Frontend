import React from "react";
import "./Gallery.css";

// First gallery images
import img1 from "../../assets/images/luca-bravo-O453M2Liufs-unsplash.jpg";
import img2 from "../../assets/images/fadhil-abhimantra-Jdhacfg3iW4-unsplash.jpg";
import img3 from "../../assets/images/marc-zimmer-yktwU2t1qHA-unsplash.jpg";
import img4 from "../../assets/images/pakistani-truck-7238773_1280.jpg";
import img5 from "../../assets/images/camels-7012512_1280.jpg";
import img6 from "../../assets/images/mountain-5000813_1280.jpg";

// Second gallery images
import g1 from "../../assets/images/1.jpg";
import g2 from "../../assets/images/2.jpg";
import g3 from "../../assets/images/3.jpg";
import g4 from "../../assets/images/4.jpg";
import g5 from "../../assets/images/5.jpg";
import g6 from "../../assets/images/6.jpg";
import g7 from "../../assets/images/7.jpg";
import g8 from "../../assets/images/8.jpg";
import g9 from "../../assets/images/9.jpg";

// Background image for gallery section
import galleryBackground from "../../assets/images/gallery-back.jpg";

function Gallery() {
  // Labels for first and second gallery
  const firstLabels = ["HUNZA VALLEY", "SKARDU", "SWAT VALLEY", "GILGIT", "MURREE", "NARAN"];
  const secondLabels = [
    "Hunza Valley",
    "Skardu",
    "Nathiya-Gali",
    "Chitral",
    "Kalash Valley",
    "Malam Jabba",
    "Shigar Valley",
    "Rama Meadows",
    "Attabad Lake",
  ];

  return (
    <div className="gallery-wrapper">
      {/* ✅ Explore Our Gallery Section */}
      <section
        className="gallery-section explore"
        style={{ backgroundImage: `url(${galleryBackground})` }}
      >
        <div className="heading">
          <h2>Explore Our Gallery</h2>
        </div>

        <div className="container1">
          {[g1, g2, g3, g4, g5, g6, g7, g8, g9].map((src, index) => (
            <div className="image-box" key={index}>
              <img src={src} alt={secondLabels[index]} />
              <div className="overlay-text">{secondLabels[index]}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Discover Your Stay Section */}
      <section className="gallery-section discover">
        <div className="heading">
          <h2>Discover your new favorite stay</h2>
          <p>Browse through our stunning gallery to find inspiration for your next adventure!</p>
        </div>

        <div className="image-row">
          {[img1, img2, img3, img4, img5, img6].map((src, index) => (
            <div className="image-box" key={index}>
              <a href="/nextpage">
                <img src={src} alt={firstLabels[index]} className="image-hover" />
                <div className="overlay">
                  <span className="text">{firstLabels[index]}</span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Gallery;
