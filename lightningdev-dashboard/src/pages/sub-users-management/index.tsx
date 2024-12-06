import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import {
  createUserResidential,
  addGigabytes,
  removeGigabytes,
  createProxyResidential,
} from "../../services/apiService";
import "./SubUsersManagement.css";

const SubUsersManagement: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"Create" | "Delete" | "Manage" | null>(null);
  const [customerName, setCustomerName] = useState<string>(""); // Customer Name
  const [proxyUsername, setProxyUsername] = useState<string>(""); // Proxy Username
  const [proxyPassword, setProxyPassword] = useState<string>(""); // Proxy Password
  const [loading, setLoading] = useState<boolean>(false); // Loading State
  const [message, setMessage] = useState<string | null>(null); // Display Message

  const [usernames, setUsernames] = useState<string[]>([]); // List of Usernames
  const [selectedUsername, setSelectedUsername] = useState<string>(""); // Selected Username for Manage Tab

  const [gbToAdd, setGbToAdd] = useState<number>(0); // GB to Add
  const [gbToRemove, setGbToRemove] = useState<number>(0); // GB to Remove

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
      console.log("Create User Response:", response);

      setUsernames((prev) => [...prev, proxyUsername]); // Add username to the list
      setMessage(`User created successfully: ${proxyUsername}`);
      setCustomerName("");
      setProxyUsername("");
      setProxyPassword("");
    } catch (error) {
      console.error("Error creating user:", error);
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
    if (!selectedUsername || gbToAdd <= 0) {
      setMessage("Please select a username and provide a valid GB value to add.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const flow = 1;
      const duration = 3;

      const response = await addGigabytes(selectedUsername, flow, duration);
      console.log("Add Gigabytes Response:", response);

      setMessage(`Successfully added ${gbToAdd} GB to ${selectedUsername}`);
    } catch (error: any) {
      console.error("Error in Add Gigabytes:", error);
      setMessage(`Failed to add gigabytes: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle Remove Gigabytes
  const handleRemoveGigabytes = async () => {
    if (!selectedUsername || gbToRemove <= 0) {
      setMessage("Please select a username and provide a valid GB value to remove.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const duration = 3;

      const response = await removeGigabytes(selectedUsername, gbToRemove, duration);
      console.log("Remove Gigabytes Response:", response);

      setMessage(`Successfully removed ${gbToRemove} GB from ${selectedUsername}`);
    } catch (error: any) {
      console.error("Error in Remove Gigabytes:", error);
      setMessage(`Failed to remove gigabytes: ${error.response?.data?.error || error.message}`);
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
              <label>Customer Name</label>
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
              <label>Select Username</label>
              <select
                className="form-control mb-3"
                value={selectedUsername}
                onChange={(e) => setSelectedUsername(e.target.value)}
              >
                <option value="">Select a user</option>
                {usernames.map((username) => (
                  <option key={username} value={username}>
                    {username}
                  </option>
                ))}
              </select>
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
