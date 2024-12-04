import React, { useState } from "react";
import Layout from "../../components/Layout/Layout"; // Adjust the path if needed
import "./SubUsersManagement.css";

const SubUsersManagement: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"Create" | "Delete" | "Manage" | null>(null);

  const plans = [
    { id: "plan1", name: "Trial-Residential-Plan 0.15 GB - 674cb0b5f674e52455084591" },
    { id: "plan2", name: "Premium-Residential-Plan 1 GB - 8723409f674e52455083445" },
  ];

  const renderContent = () => {
    if (!selectedPlan) {
      return <p>Please select a plan to proceed.</p>;
    }

    switch (activeTab) {
      case "Create":
        return (
          <div className="create-user">
            <h5>Create User</h5>
            <div>
              <label>Customer - Name</label>
              <input type="text" className="form-control mb-3" placeholder="Enter customer name" />
              <label>Proxy Username</label>
              <input type="text" className="form-control mb-3" placeholder="Enter proxy username" />
              <label>Proxy Password</label>
              <input type="text" className="form-control mb-3" placeholder="Enter proxy password" />
              <button className="btn btn-primary mt-2">Generate</button>
              <button className="btn btn-success ms-3 mt-2">Save</button>
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
                  <td><button className="btn btn-danger">Delete</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case "Manage":
        return (
          <div className="manage-user">
            <h5>Manage User</h5>
            <div className="d-flex">
              <div className="progress-circle">
                <h6>0 GB / 0 GB</h6>
              </div>
              <div>
                <label>GB Add:</label>
                <input type="number" className="form-control mb-3" placeholder="Enter GB to add" />
                <button className="btn btn-primary">Send</button>
                <label>GB Remove:</label>
                <input type="number" className="form-control mb-3" placeholder="Enter GB to remove" />
                <button className="btn btn-primary">Send</button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="sub-users-management">
        <h4>Sub-users management</h4>
        <p>Empower your team’s efficiency with seamless sub-user management.</p>
        <div className="dropdown-container">
          <select
            className="form-select"
            value={selectedPlan || ""}
            onChange={(e) => setSelectedPlan(e.target.value)}
          >
            <option value="" disabled>Select a plan</option>
            {plans.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name}
              </option>
            ))}
          </select>
          <button className="btn btn-outline-primary ms-3">←</button>
        </div>
        <div className="button-group mt-4">
          <button className="btn btn-primary" onClick={() => setActiveTab("Create")}>
            Create User
          </button>
          <button className="btn btn-outline-primary" onClick={() => setActiveTab("Delete")}>
            Delete User
          </button>
          <button className="btn btn-outline-primary" onClick={() => setActiveTab("Manage")}>
            Manage User
          </button>
        </div>
        <div className="content-container mt-4">{renderContent()}</div>
      </div>
    </Layout>
  );
};

export default SubUsersManagement;
