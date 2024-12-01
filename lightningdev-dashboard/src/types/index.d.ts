export type UserInfo = {
    username: string;
    bandwidthUsed: number; // in bytes
    balance: number;       // in GB
};

export type ProxyList = {
    countryCodes: string[];
    zones: {
        static: string[];
        dynamic: string[];
    };
};
