import { appClient } from "./init";
import { IUser } from "../store/user/interface";

export const createUserRequest = (data: IUser) => {
  return appClient.post("/users/create-user", data);
};

export const uploadUserFileRequest = (data: FormData) => {
  return appClient.post("/users/upload", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const searchLocation = async (query: string) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("searchLocation ===========>", data);

    return data;
  } catch (error) {
    console.error("Error fetching location data:", error);
  }
};
