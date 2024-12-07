import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import {
  addGigabytes,
  createUserResidential,
  removeGigabytes,
} from "../../services/apiService";
import "./SubUsersManagement.css";
import toast from "react-hot-toast";

const SubUsersManagement: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"Create" | "Delete" | "Manage" | null>(null);
  const [customerName, setCustomerName] = useState<string>(""); 
  const [proxyUsername, setProxyUsername] = useState<string>(""); 
  const [proxyPassword, setProxyPassword] = useState<string>(""); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [message] = useState<string | null>(null); 

  const [usernames, setUsernames] = useState<
    { id: string; name: string; bandwidth: number; bandwidthLeft: string }[]
  >([]); // List of Usernames
  const [selectedUsername, setSelectedUsername] = useState<string>(""); 

  const [gbToAdd, setGbToAdd] = useState<number>(0); 
  const [gbToRemove, setGbToRemove] = useState<number>(0); 

  const plans = [
    { id: "plan1", name: "Trial-Residential-Plan 0.15 GB - 674cb0b5f674e52455084591" },
    { id: "plan2", name: "Premium-Residential-Plan 1 GB - 8723409f674e52455083445" },
  ];

  const handleCreateUser = async () => {
    if (!proxyUsername || !proxyPassword || !customerName) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const email = `${proxyUsername}@lightningproxies.net`;
      const response = await createUserResidential(proxyUsername, email, proxyPassword);
      console.log("Create User Response:", response);

      setUsernames((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          name: proxyUsername,
          bandwidth: 0,
          bandwidthLeft: "0 GB",
        },
      ]);

      toast.error(`User created successfully: ${proxyUsername}`);
      setCustomerName("");
      setProxyUsername("");
      setProxyPassword("");
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Failed to create user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateRandom = () => {
    const length = Math.floor(Math.random() * (15 - 6 + 1)) + 6; // Random length between 6 and 15
  
    const getRandomChar = (characters: string) =>
      characters.charAt(Math.floor(Math.random() * characters.length));
  
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const digits = "0123456789";
    const allowedSymbols = "!@#$%^&*?_";
  
    // Ensure the password includes at least one character of each required type
    let password = "";
    password += getRandomChar(uppercase); // At least one uppercase letter
    password += getRandomChar(lowercase); // At least one lowercase letter
    password += getRandomChar(digits); // At least one digit
    password += getRandomChar(allowedSymbols); // At least one special character
  
    // Fill the remaining characters with a mix of all allowed characters
    const allCharacters = uppercase + lowercase + digits + allowedSymbols;
    while (password.length < length) {
      password += getRandomChar(allCharacters);
    }
  
    // Shuffle the password to randomize character positions
    password = password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  
    // Debugging logs to verify password meets criteria
    console.log("Generated Password:", password);
  
    // Set the username and password in the state
    setProxyUsername(`proxy${Math.floor(1000 + Math.random() * 9000)}`); // Random username
    setProxyPassword(password); // Valid password
  };
  
  
  

  const handleDeleteUser = (id: string) => {
    setUsernames((prev) => prev.filter((user) => user.id !== id));
    toast.error("User deleted successfully.");
  };

  const handleAddGigabytes = async () => {
    if (!selectedUsername || gbToAdd <= 0) {
      toast.error("Please select a username and provide a valid GB value to add.");
      return;
    }

    setLoading(true);
    toast.error(null);

    try {
      const flow = 1;
      const duration = 3;

      const response = await addGigabytes(selectedUsername, flow, duration);
      console.log("Add Gigabytes Response:", response);

      toast.error(`Successfully added ${gbToAdd} GB to ${selectedUsername}`);
    } catch (error: any) {
      console.error("Error in Add Gigabytes:", error);
      toast.error(`Failed to add gigabytes: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveGigabytes = async () => {
    if (!selectedUsername || gbToRemove <= 0) {
      toast.error("Please select a username and provide a valid GB value to remove.");
      return;
    }

    setLoading(true);
    toast.error(null);

    try {
      const duration = 3;

      const response = await removeGigabytes(selectedUsername, gbToRemove);
      console.log("Remove Gigabytes Response:", response);

      toast.error(`Successfully removed ${gbToRemove} GB from ${selectedUsername}`);
    } catch (error: any) {
      console.error("Error in Remove Gigabytes:", error);
      toast.error(`Failed to remove gigabytes: ${error.response?.data?.error || error.message}`);
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
              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-primary mt-2"
                  onClick={handleGenerateRandom}
                >
                  Generate
                </button>
                <button
                  className="btn btn-primary mt-2"
                  onClick={handleCreateUser}
                  disabled={loading}
                >
                  Save
                </button>
              </div>
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
                {usernames.length > 0 ? (
                  usernames.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.bandwidth}</td>
                      <td>{user.bandwidthLeft}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center">
                      No users available.
                    </td>
                  </tr>
                )}
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
                {usernames.map((user) => (
                  <option key={user.id} value={user.name}>
                    {user.name}
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
          <p>Empower your team efficiency with seamless sub-user management.</p>
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
