import React, { useState } from "react";
import "./ProxyDetails.css";

const ProxyDetails: React.FC = () => {
  const [sessionTime, setSessionTime] = useState<number>(10); // Default session time in minutes
  const [stickyCount, setStickyCount] = useState<number>(10); // Default sticky proxy count
  const [proxies, setProxies] = useState<string[]>([]); // Generated proxies

  const generateProxies = () => {
    const baseProxy = "resi-eu.lightningproxies.net:9999"; // Example base proxy
    const username = "dnzkfhzjlkcobzp90166-zone-resi-region-de";
    const password = "lsusonhymn";

    const generatedProxies = Array.from({ length: stickyCount }, (_, idx) => {
      const sessionID = Math.random().toString(36).substr(2, 8); // Generate random session ID
      return `${baseProxy}:${username}-sessTime-${sessionTime}-session-${sessionID}:${password}`;
    });

    setProxies(generatedProxies);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(proxies.join("\n"));
    alert("Proxies copied to clipboard!");
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
      <h5>Proxy</h5>
      <div className="proxy-config">
        <div>
          <label>Host</label>
          <input type="text" value="resi-eu.lightningproxies.net" readOnly />
        </div>
        <div>
          <label>Port (HTTP & SOCKS5)</label>
          <input type="text" value="9999" readOnly />
        </div>
        <div>
          <label>Sticky Sessions (Session time: {sessionTime} min)</label>
          <input
            type="range"
            min={1}
            max={30}
            value={sessionTime}
            onChange={(e) => setSessionTime(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Sticky Count</label>
          <input
            type="number"
            value={stickyCount}
            onChange={(e) => setStickyCount(Number(e.target.value))}
            min={1}
            max={1000}
          />
        </div>
      </div>

      <div className="proxy-output">
        <textarea
          rows={5}
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
