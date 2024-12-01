import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserInfo, ProxyList } from '../types';

const Dashboard: React.FC = () => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [proxyList, setProxyList] = useState<ProxyList | null>(null);

    useEffect(() => {
        // Fetch User Info
        axios.get<UserInfo>('/api/user-info')
            .then((response) => setUserInfo(response.data))
            .catch((error) => console.error(error));

        // Fetch Proxy List
        axios.get<ProxyList>('/api/proxy-list')
            .then((response) => setProxyList(response.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Proxy Dashboard</h1>

            {/* User Info */}
            {userInfo ? (
                <div className="card mb-4">
                    <div className="card-body">
                        <h5 className="card-title">User Info</h5>
                        <p>Username: {userInfo.username}</p>
                        <p>Bandwidth Used: {(userInfo.bandwidthUsed / 1e9).toFixed(2)} GB</p>
                        <p>Remaining Balance: {userInfo.balance} GB</p>
                    </div>
                </div>
            ) : (
                <p>Loading User Info...</p>
            )}

            {/* Proxy List */}
            {proxyList ? (
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Proxy List</h5>
                        <p>Country Codes: {proxyList.countryCodes.join(', ')}</p>
                        <p>Static Zones: {proxyList.zones.static.join(', ')}</p>
                        <p>Dynamic Zones: {proxyList.zones.dynamic.join(', ')}</p>
                    </div>
                </div>
            ) : (
                <p>Loading Proxy List...</p>
            )}
        </div>
    );
};

export default Dashboard;
