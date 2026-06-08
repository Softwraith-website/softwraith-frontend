import api from "../../utils/api";

const adminService = {
  // Dashboard Metrics
  getStats: async () => {
    const { data } = await api.get("/admin/stats");
    return data;
  },

  getActivity: async () => {
    const { data } = await api.get("/admin/activity");
    return data;
  },

  // Courses
  getCourses: async () => {
    const { data } = await api.get("/admin/courses");
    return data;
  },

  getCourseById: async (id) => {
    const { data } = await api.get(`/courses/${id}`);
    return data;
  },

  createCourse: async (courseData) => {
    const { data } = await api.post("/courses", courseData);
    return data;
  },

  updateCourse: async (id, courseData) => {
    const { data } = await api.put(`/courses/${id}`, courseData);
    return data;
  },

  deleteCourse: async (id) => {
    const { data } = await api.delete(`/courses/${id}`);
    return data;
  },

  // Lectures
  getLectures: async (courseId) => {
    const { data } = await api.get(`/lectures/${courseId}`);
    return data;
  },

  createLecture: async (lectureData) => {
    const { data } = await api.post("/lectures", lectureData);
    return data;
  },

  updateLecture: async (id, lectureData) => {
    const { data } = await api.put(`/lectures/${id}`, lectureData);
    return data;
  },

  deleteLecture: async (id) => {
    const { data } = await api.delete(`/lectures/${id}`);
    return data;
  },

  // Users
  getUsers: async () => {
    const { data } = await api.get("/admin/users");
    return data;
  },

  changeUserRole: async (id) => {
    const { data } = await api.put(`/admin/users/${id}/role`);
    return data;
  },

  deleteUser: async (id) => {
    const { data } = await api.delete(`/admin/users/${id}`);
    return data;
  },

  // Enrollments
  getEnrollments: async () => {
    const { data } = await api.get("/admin/enrollments");
    return data;
  },

  // Analytics
  getAnalytics: async () => {
    const { data } = await api.get("/admin/analytics");
    return data;
  },

  // Upload Utility
  uploadFile: async (fileBase64, fileName) => {
    const { data } = await api.post("/admin/upload", { file: fileBase64, fileName });
    return data;
  },
};

export default adminService;
