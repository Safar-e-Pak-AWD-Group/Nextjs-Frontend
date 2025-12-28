"use client"; // Client-side component for interactivity

import React from "react";
import Link from "next/link";
import "./Des.css";

// 🔹 Destinations data
const destinations = [
  {
    name: "HUNZA VALLEY",
    img: "/images/luca-bravo-O453M2Liufs-unsplash.jpg",
    desc: "Gilgit-Baltistan ka taaj, Hunza Valley ek pur-sukoon aur khubsurat wadi hai jahan barf se dhaki chotiyan, sabz jheelain aur purani qiley har manzar ko aik kahani bana dete hain",
  },
  {
    name: "SKARDU",
    img: "/images/1.jpg",
    desc: "Skardu ek jadoo bhari sar-zameen hai jahan ke shafaf jheel, unchi pahariyan aur Baltit tahzeeb har musafir ka dil jeet leti hai",
  },
  {
    name: "MURREE",
    img: "/images/13.jpg",
    desc: "Murree, barf se dhaka hill station, jahan ke pine trees aur thandi hawaen shehr ki rooh ko sukoon deti hain",
  },
  {
    name: "MALAM_JABBA",
    img: "/images/3.jpg",
    desc: "Malam Jabba aik manzar-nama hai barf aur adventure ka, jahan skiing aur chairlifts har lamha yaadgar banate hain",
  },
  {
    name: "ISLAMABAD",
    img: "/images/8.jpg",
    desc: "Islamabad, Pakistan ka dil, safai, tahzeeb aur fitrat ka aik haseen milaap hai jahan har kone mein khubsurti basi hai",
  },
  {
    name: "NATHIYA-GALI",
    img: "/images/7.jpg",
    desc: "Nathiya Gali ki barasti baarish, sabz wadiyan aur khushgawar mausam use ek dreamy manzar mein tabdeel kar dete hain",
  },
  {
    name: "PESHAWAR",
    img: "/images/19.jpg",
    desc: "Peshawar, ek tareekhi sheher jahan ke qadeem bazar, chapli kabab aur mehmaan-nawazi har dil ko choo jati hai",
  },
  {
    name: "KASHMIR",
    img: "/images/18.jpg",
    desc: "Kashmir, jise zameen ka jannat kaha jata hai, apni jheelon, baghon aur pur-sukoon manzar se dil jeet leta hai",
  },
];

const Destinations = () => {
  return (
    <section className="destinations">
      <div className="heading">
        <h2 style={{ textAlign: "center", marginTop: "10px" }}>
          <b>Destinations</b>
        </h2>

        <div className="image-row">
          {destinations.map((dest, index) => (
            <div className="class-image" key={index}>
              <Link href="/nextpage">
                <img src={dest.img} alt={dest.name} className="image-hover" />
                <h4 className="low">{dest.name}</h4>
                <div className="overlay">
                  <p style={{ color: "white", padding: "40px" }}>{dest.desc}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;
