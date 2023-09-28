import axios from "axios";
import { notify } from "./notification_service";

export const request = async ({ axiosConfig }) => {
  try {
    const response = await axios(axiosConfig);
    if (response.data) {
      return response.data;
    } else {
      notify({
        success: false,
        message: response.response?.data?.message || "Unknown error occurred",
      });
    }
  } catch (error) {
    notify({
      success: false,
      message: "An error occurred while making the request",
    });
    return null;
  }
};

export const handleError = (error) => {
  if (!error.response) {
    console.error("Bad Code Error:", error);
  } else if (error.response.data.message === "Unauthenticated.") {
    handleUnAuth(error.response.data.message);
  } else if (error.response.data.errors) {
    return {
      data: {
        success: false,
        type: "validation-error",
        errors: error.response.data.errors,
      },
    };
  } else notify({ success: false, message: error.response.data.message });
};

export const handleUnAuth = (message) => {
  localStorage.removeItem("user_token");
  localStorage.setItem("error", message);
  window.location.href = window.location.origin + "/login";
};
