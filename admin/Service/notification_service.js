import { toast } from "react-toastify";

export const notify = (data) => {
  console.log(data);
  if (data?.success === false) {
    toast.error(data?.message, {
      position: "top-right",
      autoClose: 2000,
    });
  } else {
    toast.success(data?.message, {
      position: "top-right",
      autoClose: 2000,
    });
  }
};

export const showPreviousNotification = () => {
  let errorMessage = localStorage.getItem("error");
  let successMessage = localStorage.getItem("success");
  let authMessage = localStorage.getItem("authToken");
  if (errorMessage) {
    notify({ success: false, message: errorMessage });
    localStorage.removeItem("error");
  }
  if (successMessage) {
    notify({ success: true, message: successMessage });
    localStorage.removeItem("success");
  }

  if (authMessage) {
    notify({ success: true, message: "Successfully Login" });
  }
};
