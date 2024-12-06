import axios from "axios";

const API_KEY = "8U30N2d2qBzUW";
const BASE_URL = "https://developer-tester.lightningproxies.net/api";

// Create User Residential
export const createUserResidential = async (
  username: string,
  email: string,
  password: string
): Promise<any> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/create-user-residential`,
      {
        username,
        email,
        password,
        status: "1",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": API_KEY,
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    // Check if the error is an AxiosError
    if (axios.isAxiosError(error)) {
      console.error("Error creating user:", error.response ? error.response.data : error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};


// Create Proxy Residential User
export const createProxyResidential = async (
  account: string,
  password: string,
  country: string,
  state: string,
  city: string
): Promise<any> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/proxy-list-create-residential`,
      {
        account,
        password,
        type: "sticky", // Assuming "sticky" as default proxy type
        time: 60,       // Optional, set a default session time
        country_code: country || undefined,
        state: state || undefined,
        city: city || undefined,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating proxy residential:", error);
    throw error;
  }
};

// Add Gigabytes
export const addGigabytes = async (
  username: string,
  flow: number,
  duration: number
): Promise<any> => {
  if (![1, 2].includes(flow) || duration !== 3) {
    throw new Error("Invalid flow or duration value");
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/add-gigabytes-residential`,
      {
        username,
        flow,
        duration,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding gigabytes:", error);
    throw error;
  }
};


// Remove Gigabytes
export const removeGigabytes = async (
username: string, gigabytes: number, duration: number): Promise<any> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/remove-gigabytes`,
      {
        username,
        gigabytes,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error removing gigabytes:", error);
    throw error;
  }
};

// Residential Username Info (To Get Remaining Bandwidth)
export const getResidentialUsernameInfo = async (
  username: string
): Promise<any> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/residential-username-info`,
      {
        username,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error getting username info:", error);
    throw error;
  }
};

// Residential Account Info (To Get Account Info)
export const getResidentialAccountInfo = async (
  username: string
): Promise<any> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/residential-account-info`,
      {
        username,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error getting account info:", error);
    throw error;
  }
};
