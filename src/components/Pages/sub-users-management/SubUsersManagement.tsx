import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { createUserResidential, addGigabytes, removeGigabytes } from '@/src/services/apiService';
import DashboardLayout from '../../DashboardLayout/DashboardLayout';

type Username = {
  id: string;
  name: string;
  bandwidth: number;
  bandwidthLeft: string;
};

const SubUsersManagementPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'Create' | 'Delete' | 'Manage' | null>(null);
  const [customerName, setCustomerName] = useState<string>('');
  const [proxyUsername, setProxyUsername] = useState<string>('');
  const [proxyPassword, setProxyPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [usernames, setUsernames] = useState<Username[]>([]);
  const [selectedUsername, setSelectedUsername] = useState<string>('');
  const [gbToAdd, setGbToAdd] = useState<number>(0);
  const [gbToRemove, setGbToRemove] = useState<number>(0);

  const plans = [
    {
      id: 'plan1',
      name: 'Trial-Residential-Plan 0.15 GB - 674cb0b5f674e52455084591',
    },
    {
      id: 'plan2',
      name: 'Premium-Residential-Plan 1 GB - 8723409f674e52455083445',
    },
  ];

  const handleCreateUser = async () => {
    if (!proxyUsername || !proxyPassword || !customerName) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setLoading(true);

    try {
      const email = `${proxyUsername}@lightningproxies.net`;
      const response = await createUserResidential(proxyUsername, email, proxyPassword);
      console.log('Create User Response:', response);

      setUsernames((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          name: proxyUsername,
          bandwidth: 0,
          bandwidthLeft: '0 GB',
        },
      ]);

      toast.success(`User created successfully: ${proxyUsername}`);
      setCustomerName('');
      setProxyUsername('');
      setProxyPassword('');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error creating user:', error.message);
        toast.error('Failed to create user. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateRandom = () => {
    const length = Math.floor(Math.random() * (15 - 6 + 1)) + 6;

    const getRandomChar = (characters: string) => characters.charAt(Math.floor(Math.random() * characters.length));

    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
    const allowedSymbols = '!@#$%^&*?_';

    let password = '';
    password += getRandomChar(uppercase);
    password += getRandomChar(lowercase);
    password += getRandomChar(digits);
    password += getRandomChar(allowedSymbols);

    const allCharacters = uppercase + lowercase + digits + allowedSymbols;
    while (password.length < length) {
      password += getRandomChar(allCharacters);
    }

    password = password
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');

    setProxyUsername(`proxy${Math.floor(1000 + Math.random() * 9000)}`);
    setProxyPassword(password);
  };

  const handleDeleteUser = (id: string) => {
    setUsernames((prev) => prev.filter((user) => user.id !== id));
    toast.success('User deleted successfully.');
  };

  const handleAddGigabytes = async () => {
    if (!selectedUsername || gbToAdd <= 0) {
      toast.error('Please select a username and provide a valid GB value to add.');
      return;
    }

    setLoading(true);

    try {
      const flow = 1;
      const response = await addGigabytes(selectedUsername, flow, gbToAdd);
      console.log('Add Gigabytes Response:', response);

      toast.success(`Successfully added ${gbToAdd} GB to ${selectedUsername}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error in Add Gigabytes:', error.message);
        toast.error('Failed to add gigabytes.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveGigabytes = async () => {
    if (!selectedUsername || gbToRemove <= 0) {
      toast.error('Please select a username and provide a valid GB value to remove.');
      return;
    }

    setLoading(true);

    try {
      const response = await removeGigabytes(selectedUsername, gbToRemove);
      console.log('Remove Gigabytes Response:', response);

      toast.success(`Successfully removed ${gbToRemove} GB from ${selectedUsername}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error in Remove Gigabytes:', error.message);
        toast.error('Failed to remove gigabytes.');
      }
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
      case 'Create':
        return (
          <div className="card p-4 shadow-sm">
            <h5>Create User</h5>
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
                <button className="btn btn-primary mt-2" onClick={handleGenerateRandom}>
                  Generate
                </button>
                <button className="btn btn-primary mt-2" onClick={handleCreateUser} disabled={loading}>
                  Save
                </button>
              </div>
            </div>
          </div>
        );
      case 'Delete':
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
                        <button className="btn btn-danger" onClick={() => handleDeleteUser(user.id)}>
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
      case 'Manage':
        return (
          <div className="card p-4 shadow-sm">
            <h5>Manage User</h5>
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
                {loading ? 'Adding...' : 'Add Gigabytes'}
              </button>
              <button className="btn btn-danger ml-3" onClick={handleRemoveGigabytes} disabled={loading}>
                {loading ? 'Removing...' : 'Remove Gigabytes'}
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
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
                className={`btn ${activeTab === 'Create' ? 'active' : ''}`}
                onClick={() => setActiveTab('Create')}
              >
                Create User
              </button>
              <button
                className={`btn ${activeTab === 'Delete' ? 'active' : ''}`}
                onClick={() => setActiveTab('Delete')}
              >
                Delete User
              </button>
              <button
                className={`btn ${activeTab === 'Manage' ? 'active' : ''}`}
                onClick={() => setActiveTab('Manage')}
              >
                Manage User
              </button>
            </div>
          </div>
        </div>
        <div className="mt-4">{renderContent()}</div>
      </div>
    </DashboardLayout>
  );
};

export default SubUsersManagementPage;
