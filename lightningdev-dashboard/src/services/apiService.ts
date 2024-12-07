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

// Proxy List Create Residential
export const proxyListCreateResidential = async (
  account: string,
  password: string,
  type: "rotating" | "sticky",
  time?: number,
  countryCode?: string,
  state?: string,
  city?: string
): Promise<any> => {
  if (type === "sticky" && (!time || time < 1 || time > 120)) {
    throw new Error("Invalid session time for 'sticky' type. Must be between 1 and 120.");
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/proxy-list-create-residential`,
      {
        account,
        password,
        type,
        ...(type === "sticky" && { time }),
        ...(countryCode && { country_code: countryCode }),
        ...(state && { state }),
        ...(city && { city }),
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
    console.error("Error creating proxy list:", error);
    throw error;
  }
};

// Create Proxy User Residential
export const createProxyUserResidential = async (
  account: string,
  password: string,
  limitFlow: "1" | "2",
  username: string
): Promise<any> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/create-proxy-user-residential`,
      {
        account,
        password,
        limit_flow: limitFlow,
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
    console.error("Error creating proxy user:", error);
    throw error;
  }
};


