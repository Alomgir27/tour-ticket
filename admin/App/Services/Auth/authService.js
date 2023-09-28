import { notify } from "../../../Service/notification_service";
import { authRepository } from "../../Repositories/Auth/authRepository";

const authService = {
  login: async (data) => {
    const res = await authRepository.login(data);

    if (res) {
      localStorage.setItem("authToken", res.authorization.token);
      notify(res);
      window.location.href = "/dashboard";
    }
  },
  logout: async () => {
    const res = await authRepository.logout();
    if (res) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
      notify(res);
    }
  },
};

export default authService;
