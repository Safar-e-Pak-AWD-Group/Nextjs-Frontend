import React from "react";
import "./Des.css";

const Destinations = () => {
  return (
    <section className="destinations">
      <div className="heading">
        <h2 style={{textAlign: "center", marginTop: "10px"}}><b>Destinations</b></h2>

        <div className="image-row">
          <div className="class-image">
            <a href="nextpage">
              <img
                src="./images/luca-bravo-O453M2Liufs-unsplash.jpg"
                alt="Hunza Valley"
                className="image-hover"
              />
              <h4 className="low">HUNZA VALLEY</h4>
              <div className="overlay" >
                <p style={{ color: "white" , padding:"40px"}}>
                  Gilgit-Baltistan ka taaj, Hunza Valley ek pur-sukoon aur
                  khubsurat wadi hai jahan barf se dhaki chotiyan, sabz jheelain
                  aur purani qiley har manzar ko aik kahani bana dete hain
                </p>
              </div>
            </a>
          </div>

          <div className="class-image">
            <a href="nextpage">
              <img src="./images/1.jpg" alt="Skardu" className="image-hover" />
              <h4 className="low">SKARDU</h4>
              <div className="overlay">
                <p style={{ color: "white" }}>
                  Skardu ek jadoo bhari sar-zameen hai jahan ke shafaf jheel,
                  unchi pahariyan aur Baltit tahzeeb har musafir ka dil jeet
                  leti hai
                </p>
              </div>
            </a>
          </div>

          <div className="class-image">
            <a href="nextpage">
              <img src="./images/13.jpg" alt="Murree" className="image-hover" />
              <h4 className="low">MURREE</h4>
              <div className="overlay">
                <p style={{ color: "white" }}>
                  Murree, barf se dhaka hill station, jahan ke pine trees aur
                  thandi hawaen shehr ki rooh ko sukoon deti hain
                </p>
              </div>
            </a>
          </div>

          <div className="class-image">
            <a href="nextpage">
              <img src="./images/3.jpg" alt="Malam Jabba" className="image-hover" />
              <h4 className="low">MALAM_JABBA</h4>
              <div className="overlay">
                <p style={{ color: "white" }}>
                  Malam Jabba aik manzar-nama hai barf aur adventure ka, jahan
                  skiing aur chairlifts har lamha yaadgar banate hain
                </p>
              </div>
            </a>
          </div>

          <div className="class-image">
            <a href="nextpage">
              <img
                src="./images/8.jpg"
                alt="Islamabad"
                className="image-hover"
              />
              <h4 className="low">ISLAMABAD</h4>
              <div className="overlay">
                <p style={{ color: "white" }}>
                  Islamabad, Pakistan ka dil, safai, tahzeeb aur fitrat ka aik
                  haseen milaap hai jahan har kone mein khubsurti basi hai
                </p>
              </div>
            </a>
          </div>

          <div className="class-image">
            <a href="nextpage">
              <img
                src="./images/7.jpg"
                alt="Nathiya Gali"
                className="image-hover"
              />
              <h4 className="low">Nathiya-Gali</h4>
              <div className="overlay">
                <p style={{ color: "white" }}>
                  Nathiya Gali ki barasti baarish, sabz wadiyan aur khushgawar
                  mausam use ek dreamy manzar mein tabdeel kar dete hain
                </p>
              </div>
            </a>
          </div>

          <div className="class-image">
            <a href="nextpage">
              <img
                src="./images/19.jpg"
                alt="Peshawar"
                className="image-hover"
              />
              <h4 className="low">PESHAWAR</h4>
              <div className="overlay">
                <p style={{ color: "white" }}>
                  Peshawar, ek tareekhi sheher jahan ke qadeem bazar, chapli
                  kabab aur mehmaan-nawazi har dil ko choo jati hai
                </p>
              </div>
            </a>
          </div>

          <div className="class-image">
            <a href="nextpage">
              <img
                src="./images/18.jpg"
                alt="Kashmir"
                className="image-hover"
              />
              <h4 className="low">KASHMIR</h4>
              <div className="overlay">
                <p style={{ color: "white" }}>
                  Kashmir, jise zameen ka jannat kaha jata hai, apni jheelon,
                  baghon aur pur-sukoon manzar se dil jeet leta hai
                </p>
              </div>
            </a>
          </div>

           <div className="class-image">
            <a href="nextpage">
              <img
                src="./images/18.jpg"
                alt="Kashmir"
                className="image-hover"
              />
              <h4 className="low">KASHMIR</h4>
              <div className="overlay">
                <p style={{ color: "white" }}>
                  Kashmir, jise zameen ka jannat kaha jata hai, apni jheelon,
                  baghon aur pur-sukoon manzar se dil jeet leta hai
                </p>
              </div>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Destinations;
