import React, { useState } from "react";
import Layout from "../../components/Layout/Layout"; // Adjust the path if needed
import {
  createUserResidential,
  addGigabytes,
  removeGigabytes,
  createProxyResidential
} from "../../services/apiService"; // Import API service
import "./SubUsersManagement.css";

const SubUsersManagement: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"Create" | "Delete" | "Manage" | null>(null);
  const [customerName, setCustomerName] = useState<string>("");
  const [proxyUsername, setProxyUsername] = useState<string>("");
  const [proxyPassword, setProxyPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const [gbToAdd, setGbToAdd] = useState<number>(0);  // State to store GB to add
  const [gbToRemove, setGbToRemove] = useState<number>(0); // State to store GB to remove

  const plans = [
    { id: "plan1", name: "Trial-Residential-Plan 0.15 GB - 674cb0b5f674e52455084591" },
    { id: "plan2", name: "Premium-Residential-Plan 1 GB - 8723409f674e52455083445" },
  ];

  // Handle Create User
  const handleCreateUser = async () => {
    if (!proxyUsername || !proxyPassword || !customerName) {
      setMessage("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const email = `${proxyUsername}@lightningproxies.net`;
      const response = await createUserResidential(proxyUsername, email, proxyPassword);
      setMessage(`User created successfully: ${response.message || response.status}`);
      setCustomerName(""); // Reset fields
      setProxyUsername("");
      setProxyPassword("");
    } catch (error) {
      setMessage("Failed to create user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Create Proxy User
  const handleCreateProxyUser = async () => {
    if (!proxyUsername || !proxyPassword) {
      setMessage("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await createProxyResidential(proxyUsername, proxyPassword, "US", "California", "Los Angeles");
      setMessage(`Proxy user created successfully: ${response.message || response.status}`);
    } catch (error) {
      setMessage("Failed to create proxy user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Add Gigabytes
  const handleAddGigabytes = async () => {
    if (!proxyUsername || gbToAdd <= 0) {
      setMessage("Please provide a valid username and GB to add.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const duration = 30; // Example: adding for 30 days (you can adjust as needed)
      const response = await addGigabytes(proxyUsername, gbToAdd, duration);
      setMessage(`Successfully added ${gbToAdd} GB: ${response.message || response.status}`);
    } catch (error) {
      setMessage("Failed to add gigabytes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Remove Gigabytes
  const handleRemoveGigabytes = async () => {
    if (!proxyUsername || gbToRemove <= 0) {
      setMessage("Please provide a valid username and GB to remove.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const duration = 30; // Example: removing for 30 days (adjust as needed)
      const response = await removeGigabytes(proxyUsername, gbToRemove, duration);
      setMessage(`Successfully removed ${gbToRemove} GB: ${response.message || response.status}`);
    } catch (error) {
      setMessage("Failed to remove gigabytes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Render Content for Tabs
  const renderContent = () => {
    if (!selectedPlan) {
      return <p>Please select a plan to proceed.</p>;
    }

    switch (activeTab) {
      case "Create":
        return (
          <div className="create-user">
            <h5>Create User</h5>
            {message && <p className={`message ${loading ? "loading" : ""}`}>{message}</p>}
            <div>
              <label>Customer - Name</label>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter customer name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              <label>Proxy Username</label>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter proxy username"
                value={proxyUsername}
                onChange={(e) => setProxyUsername(e.target.value)}
              />
              <label>Proxy Password</label>
              <input
                type="password"
                className="form-control mb-3"
                placeholder="Enter proxy password"
                value={proxyPassword}
                onChange={(e) => setProxyPassword(e.target.value)}
              />
              <button className="btn btn-primary mt-2" onClick={handleCreateUser} disabled={loading}>
                {loading ? "Creating..." : "Generate User"}
              </button>
            </div>
          </div>
        );
      case "Delete":
        return (
          <div className="delete-user">
            <h5>Delete User</h5>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Bandwidth</th>
                  <th>Bandwidth Left</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>674f44e094c12e1048c1ea46</td>
                  <td>John Doe</td>
                  <td>0</td>
                  <td>0 GB</td>
                  <td>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case "Manage":
        return (
          <div className="manage-user">
            <h5>Manage User</h5>
            {message && <p className={`message ${loading ? "loading" : ""}`}>{message}</p>}
            <div>
              <label>GB to Add</label>
              <input
                type="number"
                className="form-control mb-3"
                placeholder="Enter GB to add"
                value={gbToAdd}
                onChange={(e) => setGbToAdd(Number(e.target.value))}
              />
              <label>GB to Remove</label>
              <input
                type="number"
                className="form-control mb-3"
                placeholder="Enter GB to remove"
                value={gbToRemove}
                onChange={(e) => setGbToRemove(Number(e.target.value))}
              />
              <button className="btn btn-primary" onClick={handleAddGigabytes} disabled={loading}>
                {loading ? "Adding..." : "Add Gigabytes"}
              </button>
              <button className="btn btn-danger ml-3" onClick={handleRemoveGigabytes} disabled={loading}>
                {loading ? "Removing..." : "Remove Gigabytes"}
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="header">
          <h1>Manage Sub-Users</h1>
        </div>

        <div className="plans">
          <h5>Select Plan</h5>
          {plans.map((plan) => (
            <button
              key={plan.id}
              className={`btn ${selectedPlan === plan.id ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.name}
            </button>
          ))}
        </div>

        {selectedPlan && (
          <div className="tabs">
            <button onClick={() => setActiveTab("Create")}>Create User</button>
            <button onClick={() => setActiveTab("Delete")}>Delete User</button>
            <button onClick={() => setActiveTab("Manage")}>Manage User</button>
          </div>
        )}

        {renderContent()}
      </div>
    </Layout>
  );
};

export default SubUsersManagement;
