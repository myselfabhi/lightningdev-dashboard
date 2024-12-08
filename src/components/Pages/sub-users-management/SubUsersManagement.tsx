import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { addGigabytes, createUserResidential, removeGigabytes } from '@/src/services/apiService';
import DashboardLayout from '../../DashboardLayout/DashboardLayout';
import styles from './SubUserManagement.module.css';

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
      const flow = 1; // Ensure flow is valid (1 or 2)
      const duration = 3; // Ensure duration is 3
      const response = await addGigabytes(selectedUsername, flow, duration);
      console.log('Add Gigabytes Response:', response);
  
      // Update the bandwidth for the selected user
      setUsernames((prev) =>
        prev.map((user) =>
          user.name === selectedUsername
            ? {
                ...user,
                bandwidth: user.bandwidth + gbToAdd,
                bandwidthLeft: `${user.bandwidth + gbToAdd} GB`,
              }
            : user
        )
      );
  
      toast.success(`Successfully added ${gbToAdd} GB to ${selectedUsername}`);
    } catch (error: unknown) {
      console.error('Error in Add Gigabytes:', error);
      toast.error('Failed to add gigabytes.');
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
  
      // Update the bandwidth for the selected user
      setUsernames((prev) =>
        prev.map((user) =>
          user.name === selectedUsername
            ? {
                ...user,
                bandwidth: Math.max(0, user.bandwidth - gbToRemove),
                bandwidthLeft: `${Math.max(0, user.bandwidth - gbToRemove)} GB`,
              }
            : user
        )
      );
  
      toast.success(`Successfully removed ${gbToRemove} GB from ${selectedUsername}`);
    } catch (error: unknown) {
      console.error('Error in Remove Gigabytes:', error);
      toast.error('Failed to remove gigabytes.');
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
          <div className={`${styles.card} ${styles.createUser}`}>
            <h5 className={styles.cardTitle}>Create User</h5>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Customer Name</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Enter customer name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Proxy Username</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Enter proxy username"
                value={proxyUsername}
                onChange={(e) => setProxyUsername(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Proxy Password</label>
              <input
                type="password"
                className={styles.input}
                placeholder="Enter proxy password"
                value={proxyPassword}
                onChange={(e) => setProxyPassword(e.target.value)}
              />
            </div>
            <div className={styles.buttons}>
              <button className={styles.generateButton} onClick={handleGenerateRandom}>
                Generate
              </button>
              <button className={styles.saveButton} onClick={handleCreateUser} disabled={loading}>
                Save
              </button>
            </div>
          </div>
        );
      

      case 'Delete':
        return (
          <div className={styles.card}>
            <table className={styles.table}>
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
                {usernames.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.bandwidth}</td>
                    <td>{user.bandwidthLeft}</td>
                    <td>
                      <button
                        className={styles.sendButtonremove}
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </button>
                      </td>
                    </tr>
                  ))}
                {usernames.length === 0 && (
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
            <div className={styles.manageUserContainer}>
              <h5 className={styles.cardTitle}>Manage User</h5>
              <div className={styles.manageUserContent}>
              <div className={styles.circularProgress}>
  <div className={styles.circle}>
    {`${usernames.find((user) => user.name === selectedUsername)?.bandwidth || 0} GB / ${
      selectedPlan ? 'Total GB' : 0
    }`}
  </div>
</div>

                <div className={styles.manageUserActions}>
                  <div>
                    <label>Select Sub-User</label>
                    <select
                      className={styles.input}
                      value={selectedUsername}
                      onChange={(e) => setSelectedUsername(e.target.value)}
                    >
                      <option value="">Sub - User list</option>
                      {usernames.map((user) => (
                        <option key={user.id} value={user.name}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>GB Add</label>
                    <input
                      type="number"
                      className={styles.input}
                      placeholder="Enter GB to add"
                      value={gbToAdd}
                      onChange={(e) => setGbToAdd(Number(e.target.value))}
                    />
                    <button
                      className={styles.sendButtonadd}
                      onClick={handleAddGigabytes} disabled={loading}>
                      {loading ? 'Adding...' : 'Add Gigabytes'}
                    </button>
                  </div>
                  <div className={styles.formGroup}>
                    <label>GB Remove</label>
                    <input
                      type="number"
                      className={styles.input}
                      placeholder="Enter GB to remove"
                      value={gbToRemove}
                      onChange={(e) => setGbToRemove(Number(e.target.value))}
                    />
                    <button
  className={styles.sendButtonremove}
  onClick={handleRemoveGigabytes}
  disabled={gbToRemove <= 0 || usernames.find((user) => user.name === selectedUsername)?.bandwidth === 0}
  title={
    usernames.find((user) => user.name === selectedUsername)?.bandwidth === 0
      ? 'Cannot remove bandwidth: No bandwidth available.'
      : ''
  }
>
  {loading ? 'Removing...' : 'Remove Gigabytes'}
</button>

                  </div>
                  <div className={styles.otherSettings}>
                    <a href="#" className={styles.otherSettingsLink}>
                      <span>Other Settings</span>
                    </a>
                  </div>
                </div>
              </div>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Proxy Username</th>
                    <th>Bandwidth</th>
                    <th>Bandwidth Left</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {usernames.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.bandwidth} GB</td>
                      <td>{user.bandwidthLeft}</td>
                      <td>
                        <span className={styles.disableStatus}>Disable</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        

      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h5>Sub-users management</h5>
          <p>Empower your teams efficiency with seamless sub-user management.</p>
        </div>
        <div className={styles.card}>
          <select
            className={styles.select}
            onChange={(e) => setSelectedPlan(e.target.value)}
          >
            <option value="">Select a plan</option>
            {plans.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name}
              </option>
            ))}
          </select>
          <div className={styles.tabs}>
            <button
              className={`${styles.tabButton} ${activeTab === 'Create' ? styles.active : ''}`}
              onClick={() => setActiveTab('Create')}
            >
              Create User
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === 'Delete' ? styles.active : ''}`}
              onClick={() => setActiveTab('Delete')}
            >
              Delete User
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === 'Manage' ? styles.active : ''}`}
              onClick={() => setActiveTab('Manage')}
            >
              Manage User
            </button>
          </div>
        </div>
        <div className={styles.cardContent}>{renderContent()}</div>
      </div>
    </DashboardLayout>
  );
};

export default SubUsersManagementPage;
