import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ConfigureProxy.css";

const ConfigureProxy: React.FC = () => {
  const [tab, setTab] = useState<"auth" | "whitelist">("auth");
  const [countries, setCountries] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [form, setForm] = useState({
    username: "",
    password: "",
    country: "",
    state: "",
    city: "",
  });

  const fetchProxyOptions = async () => {
    try {
      const response = await axios.get("/api/proxy-list");
      setCountries(response.data.countries || []);
      setStates(response.data.states || []);
      setCities(response.data.cities || []);
    } catch (error) {
      console.error("Error fetching proxy options:", error);
    }
  };

  const updateSettings = async () => {
    try {
      const response = await axios.post("/api/create-proxy", form);
      if (response.data.success) {
        alert("Proxy settings updated successfully!");
      } else {
        alert("Failed to update proxy settings.");
      }
    } catch (error) {
      console.error("Error updating proxy settings:", error);
    }
  };

  useEffect(() => {
    fetchProxyOptions();
  }, []);

  return (
    <div className="configure-proxy">
      <h5>Configure Proxy</h5>
      <div className="tab-controls">
        <button
          className={`tab-button ${tab === "auth" ? "active" : ""}`}
          onClick={() => setTab("auth")}
        >
          User Auth & Pass
        </button>
        <button
          className={`tab-button ${tab === "whitelist" ? "active" : ""}`}
          onClick={() => setTab("whitelist")}
        >
          Whitelist IP
        </button>
      </div>

      {tab === "auth" && (
        <div className="auth-form">
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <select
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
          >
            <option value="">Select Country</option>
            {countries.map((country, idx) => (
              <option key={idx} value={country}>
                {country}
              </option>
            ))}
          </select>
          <select
            value={form.state}
            onChange={(e) => setForm({ ...form, state: e.target.value })}
          >
            <option value="">Select State</option>
            {states.map((state, idx) => (
              <option key={idx} value={state}>
                {state}
              </option>
            ))}
          </select>
          <select
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          >
            <option value="">Select City</option>
            {cities.map((city, idx) => (
              <option key={idx} value={city}>
                {city}
              </option>
            ))}
          </select>
          <button className="btn btn-primary" onClick={updateSettings}>
            Update Settings
          </button>
        </div>
      )}

      {tab === "whitelist" && (
        <div className="whitelist-form">
          <p>Whitelist IP functionality coming soon...</p>
        </div>
      )}
    </div>
  );
};

export default ConfigureProxy;
