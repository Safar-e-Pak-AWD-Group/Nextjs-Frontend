"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Gallery.module.css";

export default function GalleryPage() {
  const firstImages = [
    "/images/luca-bravo-O453M2Liufs-unsplash.jpg",
    "/images/fadhil-abhimantra-Jdhacfg3iW4-unsplash.jpg",
    "/images/marc-zimmer-yktwU2t1qHA-unsplash.jpg",
    "/images/pakistani-truck-7238773_1280.jpg",
    "/images/camels-7012512_1280.jpg",
    "/images/mountain-5000813_1280.jpg",
  ];

  const firstLabels = [
    "HUNZA VALLEY",
    "SKARDU",
    "SWAT VALLEY",
    "GILGIT",
    "MURREE",
    "NARAN",
  ];

  const secondImages = [
    "/images/1.jpg",
    "/images/2.jpg",
    "/images/3.jpg",
    "/images/4.jpg",
    "/images/5.jpg",
    "/images/6.jpg",
    "/images/7.jpg",
    "/images/8.jpg",
    "/images/9.jpg",
  ];

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
    <div className={styles.galleryWrapper}>
      {/* Explore Section */}
      <section
        className={`${styles.gallerySection} ${styles.explore}`}
        style={{ backgroundImage: "url(/images/gallery-back.jpg)" }}
      >
        <div className={styles.heading}>
          <h2>Explore Our Gallery</h2>
        </div>

        <div className={styles.container1}>
          {secondImages.map((src, i) => (
            <div className={styles.imageBox} key={i}>
              <Image src={src} alt={secondLabels[i]} width={400} height={300} />
              <div className={styles.overlayText}>{secondLabels[i]}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Discover Section */}
      <section className={`${styles.gallerySection} ${styles.discover}`}>
        <div className={styles.heading}>
          <h2>Discover your new favorite stay</h2>
          <p>
            Browse through our stunning gallery to find inspiration for your next
            adventure!
          </p>
        </div>

        <div className={styles.imageRow}>
          {firstImages.map((src, i) => (
            <div className={styles.imageBox} key={i}>
              <Link href="/nextpage">
                <div className={styles.imageWrapper}>
                  <Image src={src} alt={firstLabels[i]} fill className={styles.imageHover} />
                  <div className={styles.overlay}>
                    <span className={styles.text}>{firstLabels[i]}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
