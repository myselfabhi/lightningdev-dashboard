import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import {
  createUserResidential,
  addGigabytes,
  removeGigabytes
} from "../../services/apiService";
import "./SubUsersManagement.css";

const SubUsersManagement: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"Create" | "Delete" | "Manage" | null>(null);
  const [customerName, setCustomerName] = useState<string>(""); 
  const [proxyUsername, setProxyUsername] = useState<string>(""); 
  const [proxyPassword, setProxyPassword] = useState<string>(""); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [message, setMessage] = useState<string | null>(null); 

  const [usernames, setUsernames] = useState<string[]>([]); 
  const [selectedUsername, setSelectedUsername] = useState<string>(""); 

  const [gbToAdd, setGbToAdd] = useState<number>(0); 
  const [gbToRemove, setGbToRemove] = useState<number>(0); 

  const plans = [
    { id: "plan1", name: "Trial-Residential-Plan 0.15 GB - 674cb0b5f674e52455084591" },
    { id: "plan2", name: "Premium-Residential-Plan 1 GB - 8723409f674e52455083445" },
  ];

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

      setUsernames((prev) => [...prev, proxyUsername]);
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

  const renderContent = () => {
    if (!selectedPlan) {
      return (
        <div className="card p-4 shadow-sm">
          <p>Please select a plan to proceed.</p>
        </div>
      );
    }
    switch (activeTab) {
      case "Create":
        return (
          <div className="card p-4 shadow-sm">
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
          <div className="card p-4 shadow-sm">
            <h5>Delete User</h5>
            <table className="table table-striped">
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
          <div className="card p-4 shadow-sm">
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
        <div className="header mb-4">
          <h5>Sub-users management</h5>
          <p>Empower your team's efficiency with seamless sub-user management.</p>
        </div>

        <div className="card p-4 shadow-sm">
          <div className="mb-3">
            <select
              className="form-select"
              onChange={(e) => setSelectedPlan(e.target.value)}
            >
              <option value="">Select a plan</option>
              {plans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))}
            </select>
          </div>
          <div className="accordion-container">
  <div className="tabs">
    <button
      className={`btn ${activeTab === "Create" ? "active" : ""}`}
      onClick={() => setActiveTab("Create")}
    >
      Create User
    </button>
    <button
      className={`btn ${activeTab === "Delete" ? "active" : ""}`}
      onClick={() => setActiveTab("Delete")}
    >
      Delete User
    </button>
    <button
      className={`btn ${activeTab === "Manage" ? "active" : ""}`}
      onClick={() => setActiveTab("Manage")}
    >
      Manage User
    </button>
  </div>
</div>

        </div>

        <div className="mt-4">{renderContent()}</div>
      </div>
    </Layout>
  );
};

export default SubUsersManagement;
