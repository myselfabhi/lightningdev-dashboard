import React, { useState } from "react";
import "./ConfigureProxy.css";
import { proxyListCreateResidential } from "../services/apiService";

const ConfigureProxy: React.FC = () => {
  const [tab, setTab] = useState<"auth" | "whitelist">("auth");
  const [username, setUsername] = useState<string>("atjdxdeqzgdrlry100714-zone-resi");
  const [password, setPassword] = useState<string>("uepsjpxejl");
  const [type, setType] = useState<"rotating" | "sticky">("sticky");
  const [sessionTime, setSessionTime] = useState<number>(60);
  const [country, setCountry] = useState<string>("Worldwide Mix");
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [whitelistIp, setWhitelistIp] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUpdateSettings = async () => {
    setIsLoading(true);
    try {
      const response = await proxyListCreateResidential(
        username,
        password,
        type,
        type === "sticky" ? sessionTime : undefined,
        country !== "Worldwide Mix" ? country : undefined,
        state,
        city
      );
      alert("Settings updated successfully!");
      console.log("Response:", response);
    } catch (error) {
      alert("Failed to update proxy settings.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateAPI = () => {
    alert("API generated successfully!");
  };

  const handleAddIp = () => {
    alert(`Whitelist IP ${whitelistIp} added successfully!`);
    setWhitelistIp("");
  };

  return (
    <div className="configure-proxy">
      <div className="header d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4>Configure Proxy</h4>
          <p>Configure your proxy type, and whitelist IP</p>
        </div>
        <div className="checkbox-group">
          <label className="form-check-label">
            <input
              type="radio"
              name="proxyType"
              value="rotating"
              checked={type === "rotating"}
              onChange={() => setType("rotating")}
              className="form-check-input"
            />
            Rotating
          </label>
          <label className="form-check-label ms-3">
            <input
              type="radio"
              name="proxyType"
              value="sticky"
              checked={type === "sticky"}
              onChange={() => setType("sticky")}
              className="form-check-input"
            />
            Sticky
          </label>
        </div>
      </div>

      {/* Tab Switch */}
      <div className="tab-container d-flex">
        <button
          className={`tab ${tab === "auth" ? "active" : ""}`}
          onClick={() => setTab("auth")}
        >
          User Auth & Pass
        </button>
        <button
          className={`tab ${tab === "whitelist" ? "active" : ""}`}
          onClick={() => setTab("whitelist")}
        >
          Whitelist IP
        </button>
      </div>

      {/* User Auth & Pass Tab */}
      {tab === "auth" && (
        <div className="auth-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              readOnly
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="text"
              value={password}
              readOnly
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Session Time (for Sticky Proxies)</label>
            <input
              type="number"
              value={sessionTime}
              min={1}
              max={120}
              disabled={type !== "sticky"}
              onChange={(e) => setSessionTime(Number(e.target.value))}
              className="form-control"
            />
          </div>
          <div className="row">
            <div className="col">
              <label>Country</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="form-control"
              >
                <option>Worldwide Mix</option>
                <option>United States</option>
                <option>Germany</option>
              </select>
            </div>
            <div className="col">
              <label>State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="col">
              <label>City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="form-control"
              />
            </div>
          </div>

          {/* Buttons at Bottom */}
          <div className="d-flex justify-content-between align-items-center mt-4">
            <button
              className="btn btn-primary"
              onClick={handleGenerateAPI}
              disabled={isLoading}
            >
              API Generator &gt;
            </button>
            <button
              className="btn btn-primary"
              onClick={handleUpdateSettings}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Settings &gt;"}
            </button>
          </div>
        </div>
      )}

      {/* Whitelist IP Tab */}
      {tab === "whitelist" && (
        <div className="whitelist-form">
          <div className="form-group">
            <label>Whitelist IP</label>
            <input
              type="text"
              value={whitelistIp}
              onChange={(e) => setWhitelistIp(e.target.value)}
              placeholder="Enter IP address here"
              className="form-control"
            />
            <button
              className="btn btn-primary full-width mt-2"
              onClick={handleAddIp}
            >
              Add &gt;
            </button>
          </div>
          <div className="form-group">
            <label>Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="form-control"
            >
              <option>Worldwide Mix</option>
            </select>
          </div>
          <button
            className="btn btn-primary full-width mt-3"
            onClick={handleUpdateSettings}
            disabled={isLoading}
          >
            Update Settings &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default ConfigureProxy;
