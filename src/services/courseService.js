import api from "../utils/api";

const courseService = {
  getAll: async (params = {}) => {
    const { data } = await api.get("/courses", { params });
    return data;
  },

  getById: async (id) => {
    const { data } = await api.get(`/courses/${id}`);
    return data;
  },
};

export default courseService;
