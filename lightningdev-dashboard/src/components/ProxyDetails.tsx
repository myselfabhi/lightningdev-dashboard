import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./ProxyDetails.css";

const ProxyDetails: React.FC = () => {
  const [sessionTime, setSessionTime] = useState<number>(1); // Default session time in minutes
  const [stickyCount, setStickyCount] = useState<number>(10); // Default sticky proxy count
  const [isSuperSticky, setIsSuperSticky] = useState<boolean>(false); // Super sticky toggle
  const [proxies, setProxies] = useState<string[]>([]); // Generated proxies

  const generateProxies = () => {
    const baseProxy = "resi-www.lightningproxies.net:9999";
    const username = "atjxdeqzgdlry100714-zone-resi";
    const password = "uepsjpxeji";

    const generatedProxies = Array.from({ length: stickyCount }, (_, idx) => {
      const sessionID = Math.random().toString(36).substr(2, 8); // Generate random session ID
      return `${baseProxy}:${username}-sessTime-${sessionTime}-session-${sessionID}:${password}`;
    });

    setProxies(generatedProxies);
  };

  const handleSuperStickyToggle = () => {
    setIsSuperSticky((prev) => !prev);
    toast(isSuperSticky ? "Sticky mode deactivated" : "Sticky mode activated");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(proxies.join("\n"));
    toast.success("Proxies copied to clipboard!");
  };

  const downloadAsText = () => {
    const blob = new Blob([proxies.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "proxies.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="proxy-details">
      <Toaster position="top-right" />

      <h5>Proxy</h5>
      <div className="proxy-config">
        {/* Host and Port */}
        <div className="config-row">
          <label>Host</label>
          <input
            type="text"
            value="resi-www.lightningproxies.net"
            readOnly
            className="read-only-input"
          />
        </div>
        <div className="config-row">
          <label>Port (HTTP & SOCKS5)</label>
          <input
            type="text"
            value="9999"
            readOnly
            className="read-only-input"
          />
        </div>

        {/* Rotating Proxy */}
        <div className="config-row">
          <label>Rotating Proxy</label>
          <input
            type="text"
            value="resi-www.lightningproxies.net:9999:atjxdeqzgdlry100714-zone-resi:uepsjpxeji"
            readOnly
            className="read-only-input"
          />
        </div>

        {/* Sticky Sessions */}
        <div className="sticky-session-box">
          <div className="d-flex justify-content-between align-items-center">
            <label className="sticky-session-heading">
              Sticky Sessions (Session time: {sessionTime} min)
            </label>
            <div className="toggle-wrapper">
              <label className="toggle-label me-2">Activate Super Sticky</label>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={isSuperSticky}
                  onChange={handleSuperStickyToggle}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <input
            type="range"
            min={1}
            max={30}
            value={sessionTime}
            onChange={(e) => setSessionTime(Number(e.target.value))}
            className="session-slider"
          />
        </div>

        {/* Proxy Format Settings */}
        <div className="proxy-format-settings">
          <div className="d-flex justify-content-between align-items-center">
            <label className="proxy-format-heading">Proxy Format Settings:</label>
            <input
              type="number"
              value={stickyCount}
              onChange={(e) => setStickyCount(Number(e.target.value))}
              min={1}
              max={1000}
              className="sticky-count-input"
            />
          </div>
        </div>
      </div>

      {/* Proxy Output Section */}
      <div className="proxy-output">
        <textarea
          rows={10}
          value={proxies.join("\n")}
          readOnly
          placeholder="Generated proxies will appear here"
        />
        <div className="proxy-actions">
          <button className="btn btn-primary" onClick={generateProxies}>
            Generate Proxies
          </button>
          <button className="btn btn-outline-primary" onClick={copyToClipboard}>
            Copy Proxies
          </button>
          <button className="btn btn-outline-secondary" onClick={downloadAsText}>
            Save as .txt
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProxyDetails;
