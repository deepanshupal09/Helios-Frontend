"use server";
import { setAuth } from "./cookie";

export const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      email: email,
      password: password,
    },
  });
  const data = await res.json();
  console.log("API Response:", data);

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

export async function signupUser(body: {
  email: string;
  password: string;
  provider_id: string;
  name: string;
  battery: number;
  battery_capacity: number;
  phone: string;
}) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Signup failed");
  }

  return await res.json();
}
export async function fetchProviders() {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/auth/fetchProviders`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.message || "Something went wrong! Please try again.",
    );
  }

  return await res.json();
}
export async function fetchTariff(email: string, timestamp: string) {
  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/dashboard/fetch-tariff`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          email,
          timestamp,
        },
      },
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(
        data.message || "Something went wrong! Please try again.",
      );
    }
    // console.log("API Response:", data);
    return data;
  } catch (error) {
    console.error("Fetch Tariff Error:", error);
    throw error;
  }
}
export async function fetchConsumption(email: string, timestamp: string) {
  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/dashboard/fetch-consumption`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          email,
          timestamp,
        },
      },
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(
        data.message || "Something went wrong! Please try again.",
      );
    }
    // console.log("API Response:", data);
    return data;
  } catch (error) {
    console.error("Fetch Tariff Error:", error);
    throw error;
  }
}
export async function fetchSolarOverview(email: string, timestamp: string) {
  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/dashboard/fetch-solar`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          email,
          timestamp,
        },
      },
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(
        data.message || "Something went wrong! Please try again.",
      );
    }
    // console.log("API Response:", data);
    return data;
  } catch (error) {
    console.error("Fetch Tariff Error:", error);
    throw error;
  }
}
export async function fetchLinkedDeviceInfo(email: string, timestamp: string) {
  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/dashboard/fetchLinkedDeviceConsumption`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          email,
          date: timestamp,
        },
      },
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(
        data.message || "Something went wrong! Please try again.",
      );
    }
    console.log("Linked Device Data:", data);
    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
}
export async function fetchDashboardInfo(email: string, timestamp: string) {
  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/dashboard/fetch-data`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          email,
          timestamp,
        },
      },
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(
        data.message || "Something went wrong! Please try again.",
      );
    }
    return data;
  } catch (error) {
    console.error("Fetch Tariff Error:", error);
    throw error;
  }
}
export async function fetchConsumptionPrediction(
  email: string,
  timestamp: string,
) {
  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/linkedDevices/fetch-consumption`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          email,
          timestamp,
        },
      },
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(
        data.message || "Something went wrong! Please try again.",
      );
    }
    // console.log("API Response:", data);
    return data;
  } catch (error) {
    console.error("Fetch Tariff Error:", error);
    throw error;
  }
}

export async function fetchSolarProduction(
  email: string,
  date: string,
  type: string,
) {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/solar/fetchSolarProduction`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        email: email,
        date: date,
        type: type,
      },
    },
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.message || "Something went wrong! Please try again.",
    );
  }

  return await res.json();
}

export async function fetchSolarYield(email: string, date: string) {
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/solar/fetchSolarYield`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        email: email,
        date: date,
      },
    },
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.message || "Something went wrong! Please try again.",
    );
  }

  return await res.json();
}

export async function fetchWeather() {
  const res = await fetch(
    `https://pro.openweathermap.org/data/2.5/weather?q=Delhi,India&APPID=${process.env.OPEN_WEATHER_API_KEY}`,
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.message || "Something went wrong! Please try again.",
    );
  }

  return await res.json();
}

export async function updateStatus(email: string, status: string) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/solar/updateStatus`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, status: status }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.message || "Something went wrong! Please try again.",
    );
  }

  return await res.json();
}
export async function fetchStatus(email: string)  {
  const res = await fetch(`${process.env.BACKEND_URL}/api/solar/fetchStatus`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      email: email
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.message || "Something went wrong! Please try again.",
    );
  }

  return await res.json();
}
export async function updateBattery(email: string, battery: number) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/solar/updateBattery`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, battery: battery }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.message || "Something went wrong! Please try again.",
    );
  }

  return await res.json();
}
export async function fetchBattery(email: string)  {
  const res = await fetch(`${process.env.BACKEND_URL}/api/solar/fetchBattery`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      email: email
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.message || "Something went wrong! Please try again.",
    );
  }

  return await res.json();
}
