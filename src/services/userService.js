import api from "../utils/api";

const userService = {
  getProfile: async () => {
    const { data } = await api.get("/users/me");
    return data;
  },

  updateProfile: async (payload) => {
    const { data } = await api.put("/users/me", payload);
    return data;
  },

  uploadAvatar: async (fileBase64, fileName) => {
    const { data } = await api.post("/users/me/avatar", { file: fileBase64, fileName });
    return data;
  },
};

export default userService;
