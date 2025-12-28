"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import "./BookNow1.css";

const BookNow = () => {
  const searchParams = useSearchParams();
  const tourName = searchParams.get("tourName"); // URL ?tourName=Hunza Valley

  const [tripType, setTripType] = useState("predefined");
  const [destination, setDestination] = useState("");
  const [popularTrip, setPopularTrip] = useState("");
  const [transport, setTransport] = useState("road");
  const [hotel, setHotel] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedAttractions, setSelectedAttractions] = useState([]);
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState("");

  // 🌦 WEATHER STATES
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);

  // ✈️ FLIGHT STATES
  const [flights, setFlights] = useState([]);
  const [flightLoading, setFlightLoading] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);

  // 🏷 Packages & Trips
  const packages = {
    "Hunza Valley": { price: 55000, plan: ["Altit Fort", "Attabad Lake", "Karimabad"], hotel: "Hunza Serena Inn", transport: "By Air" },
    Skardu: { price: 65000, plan: ["Shangrila Lake", "Cold Desert", "Upper Kachura"], hotel: "Shangrila Resort", transport: "By Air" },
    Murree: { price: 25000, plan: ["Mall Road", "Patriata", "Kashmir Point"], hotel: "Hotel One Murree", transport: "By Road" },
    "Nathiya Gali": { price: 30000, plan: ["Ayubia", "Pipeline Track", "Green Spot"], hotel: "Nathia Heights", transport: "By Road" },
    "Lake View Park, Islamabad": { price: 20000, plan: ["Lake View Park", "Pir Sohawa", "Daman-e-Koh"], hotel: "Islamabad Serena", transport: "By Road" },
    "Attabad Lake": { price: 40000, plan: ["Attabad Lake", "Passu Cones", "Hussaini Bridge"], hotel: "Lake View Resort", transport: "By Road" },
    "Karakoram Highway": { price: 70000, plan: ["Besham", "Chilas", "Khunjerab Pass"], hotel: "Various Stop Inns", transport: "By Road" },
  };

  const multiTrips = {
    "Murree to Swat": { price: 45000, plan: ["Murree", "Malam Jabba", "Swat Museum"] },
    "Naran Kaghan to Ayubia": { price: 50000, plan: ["Saif-ul-Malook", "Kaghan Valley", "Ayubia National Park"] },
    "Lahore to Hunza": { price: 80000, plan: ["Lahore", "Fairy Meadows", "Hunza Valley"] },
    "Islamabad to Skardu": { price: 75000, plan: ["Islamabad", "Deosai Plains", "Skardu"] },
    "Karachi to Quetta": { price: 60000, plan: ["Karachi", "Hingol", "Quetta"] },
  };

  const hotelOptions = {
    budget: { name: "Budget Inn", price: 5000 },
    standard: { name: "Standard Hotel", price: 10000 },
    luxury: { name: "Luxury Resort", price: 20000 },
  };

  const transportPrices = { road: 5000, air: 15000 };

  const cityAttractions = {
    Murree: ["Mall Road", "Patriata", "Kashmir Point", "Ayubia National Park"],
    Swat: ["Malam Jabba", "Fizagat Park", "Kalam Valley", "Swat Museum"],
    Hunza: ["Attabad Lake", "Baltit Fort", "Eagle’s Nest", "Hoper Glacier"],
    Skardu: ["Shangrila Resort", "Upper Kachura Lake", "Deosai Plains", "Satpara Lake"],
    Naran: ["Saif-ul-Malook", "Lulusar Lake", "Babusar Top", "Ansoo Lake"],
    Lahore: ["Badshahi Mosque", "Shalimar Gardens", "Minar-e-Pakistan", "Food Street"],
    Karachi: ["Clifton Beach", "Mazar-e-Quaid", "Do Darya", "Mohatta Palace"],
    Quetta: ["Hanna Lake", "Hazarganji Park", "Quaid Residency", "Ziarat"],
    Islamabad: ["Faisal Mosque", "Lok Virsa", "Lake View Park", "Daman-e-Koh"],
  };

  // ✈️ Flight fetching
  const fetchFlights = (from, to) => {
    setFlightLoading(true);
    setTimeout(() => {
      setFlights([
        { id: 1, airline: "PIA", from, to, time: "08:30 AM", price: 18000 },
        { id: 2, airline: "AirBlue", from, to, time: "01:45 PM", price: 21000 },
        { id: 3, airline: "Serene Air", from, to, time: "06:00 PM", price: 19500 },
      ]);
      setFlightLoading(false);
    }, 1200);
  };

  // 🌦 Weather fetching
  const WEATHER_API_KEY = "7b3bccf8b0e54d9590195436250312";
  const fetchWeather = async (city) => {
    if (!city) return;
    setWeatherLoading(true);
    try {
      const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${city}&days=1&aqi=no&alerts=no`);
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      console.error(err);
    } finally {
      setWeatherLoading(false);
    }
  };

  // ✅ Pre-select tour from URL
  useEffect(() => {
    if (tourName && packages[tourName]) {
      setTripType("predefined");
      setDestination(tourName);
      setPrice(packages[tourName].price);
    }
  }, [tourName]);

  // ✅ Flight effect
  useEffect(() => {
    if (transport === "air" && selectedCity) {
      fetchFlights("Islamabad", selectedCity);
    }
  }, [transport, selectedCity]);

  const handleAttractionChange = (place) => {
    if (selectedAttractions.includes(place)) {
      setSelectedAttractions(selectedAttractions.filter((item) => item !== place));
    } else {
      setSelectedAttractions([...selectedAttractions, place]);
    }
  };

  const calculatePrice = () => {
    if (tripType !== "custom") return;
    let total = 0;
    total += transportPrices[transport] || 0;
    total += hotelOptions[hotel]?.price || 0;
    total += selectedAttractions.length * 2000;
    setPrice(total);

    if (selectedCity) fetchWeather(selectedCity);
  };

  const handleBooking = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) { setMessage("⚠️ Please login before booking!"); return; }

      const bookingData = {
        userId: user.id || user._id,
        tripType,
        destination: destination || popularTrip || selectedCity || "Custom Trip",
        transport,
        hotel: tripType === "custom" ? hotelOptions[hotel]?.name || "N/A" : packages[destination]?.hotel || "N/A",
        attractions: tripType === "custom" ? selectedAttractions : tripType === "predefined" ? packages[destination]?.plan : multiTrips[popularTrip]?.plan,
        price,
        status: "pending",
        date: new Date(),
        flight: transport === "air" && selectedFlight ? selectedFlight : null,
      };

      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();
      if (response.ok) setMessage("✅ Booking successful!");
      else setMessage("❌ Booking failed: " + (result.message || "Unknown error"));
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Server error. Please try again later.");
    }
  };

  return (
    <div className="booknow-wrapper">
      <div className="booknow-container">
        <h2>Book Your Trip</h2>
        <p>Plan your dream trip with Safar-e-Pak!</p>

        {/* Booking type toggle */}
        <div className="toggle-type">
          <button className={tripType === "predefined" ? "active" : ""} onClick={() => { setTripType("predefined"); setPrice(0); setPopularTrip(""); setSelectedCity(""); setSelectedAttractions([]); }}>Popular Routes</button>
          <button className={tripType === "popular" ? "active" : ""} onClick={() => { setTripType("popular"); setPrice(0); setDestination(""); setSelectedCity(""); setSelectedAttractions([]); }}>Popular Trips</button>
          <button className={tripType === "custom" ? "active" : ""} onClick={() => { setTripType("custom"); setDestination(""); setPopularTrip(""); setSelectedCity(""); setSelectedAttractions([]); setPrice(0); }}>Custom Plan</button>
        </div>

        {/* Sections */}
        {tripType === "predefined" && (
          <div className="predefined-section">
            <label>Select Destination:</label>
            <select value={destination} onChange={(e) => { setDestination(e.target.value); setPrice(packages[e.target.value]?.price || 0); }}>
              <option value="">-- Choose Destination --</option>
              {Object.keys(packages).map(place => <option key={place} value={place}>{place}</option>)}
            </select>
            {destination && (
              <div className="package-details">
                <h3>{destination}</h3>
                <p><strong>Itinerary:</strong> {packages[destination].plan.join(", ")}</p>
                <p><strong>Hotel:</strong> {packages[destination].hotel}</p>
                <p><strong>Transport:</strong> {packages[destination].transport}</p>
                <p className="price">Price: Rs {packages[destination].price}</p>
              </div>
            )}
          </div>
        )}

        {tripType === "popular" && (
          <div className="popular-section">
            <label>Select Trip:</label>
            <select value={popularTrip} onChange={(e) => { setPopularTrip(e.target.value); setPrice(multiTrips[e.target.value]?.price || 0); }}>
              <option value="">-- Choose Trip --</option>
              {Object.keys(multiTrips).map(trip => <option key={trip} value={trip}>{trip}</option>)}
            </select>
            {popularTrip && (
              <div className="package-details">
                <h3>{popularTrip}</h3>
                <p><strong>Itinerary:</strong> {multiTrips[popularTrip].plan.join(", ")}</p>
                <p className="price">Price: Rs {multiTrips[popularTrip].price}</p>
              </div>
            )}
          </div>
        )}

        {tripType === "custom" && (
          <div className="custom-section">
            <label>Choose Transport:</label>
            <select value={transport} onChange={(e) => setTransport(e.target.value)}>
              <option value="road">By Road</option>
              <option value="air">By Air</option>
            </select>

            <label>Choose Hotel:</label>
            <select value={hotel} onChange={(e) => setHotel(e.target.value)}>
              <option value="">-- Select Hotel --</option>
              {Object.entries(hotelOptions).map(([key, opt]) => <option key={key} value={key}>{opt.name} (Rs {opt.price})</option>)}
            </select>

            <label>Select City:</label>
            <select value={selectedCity} onChange={(e) => { setSelectedCity(e.target.value); setSelectedAttractions([]); }}>
              <option value="">-- Choose City --</option>
              {Object.keys(cityAttractions).map(city => <option key={city} value={city}>{city}</option>)}
            </select>

            {selectedCity && (
              <div className="attractions">
                <p><strong>Attractions in {selectedCity}:</strong></p>
                <div className="attractions-grid">
                  {cityAttractions[selectedCity].map(place => (
                    <label key={place} className="checkbox-item">
                      <input type="checkbox" checked={selectedAttractions.includes(place)} onChange={() => handleAttractionChange(place)} />
                      {place}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {transport === "air" && (
              <div className="flight-section">
                <h3>Available Flights</h3>
                {flightLoading && <p>Searching flights...</p>}
                {flights.map(f => (
                  <div key={f.id} className={`flight-card ${selectedFlight?.id === f.id ? "selected" : ""}`} onClick={() => setSelectedFlight(f)}>
                    <p><b>Airline:</b> {f.airline}</p>
                    <p><b>From:</b> {f.from} → {f.to}</p>
                    <p><b>Departure:</b> {f.time}</p>
                    <p><b>Price:</b> Rs {f.price}</p>
                  </div>
                ))}
              </div>
            )}

            {weatherLoading && <p>Loading weather...</p>}
            {weather && (
              <div className="weather-box">
                <h4>Weather in {weather.location.name}</h4>
                <img src={weather.current.condition.icon} alt="weather" />
                <p>{weather.current.condition.text}</p>
                <p>🌡 {weather.current.temp_c}°C</p>
                <p>🌧 Rain Chance: {weather.forecast.forecastday[0].day.daily_chance_of_rain}%</p>
              </div>
            )}

            <button type="button" className="calculate" onClick={calculatePrice}>Calculate Price</button>
            {price > 0 && <p className="price">Estimated Price: Rs {price}</p>}
          </div>
        )}

        <button className="btn-book" onClick={handleBooking}>Confirm Booking</button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default BookNow;
