import Config from "../config/Config";

export async function post(endpoint, data, isProtected) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (isProtected) {
    headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }

  try {
    const apiResponse = await fetch(`${Config.SERVER_URL}${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    const apiData = await apiResponse.json();
    return apiData;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function get(endpoint, data, isProtected) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (isProtected) {
    headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }

  try {
    const apiResponse = await fetch(`${Config.SERVER_URL}${endpoint}`, {
      method: "GET",
      headers,
    });
    const apiData = await apiResponse.json();
    return apiData;
  } catch (error) {
    throw new Error(error.message);
  }
}
