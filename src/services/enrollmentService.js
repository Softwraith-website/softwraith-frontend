import api from "../utils/api";

const enrollmentService = {
  enroll: async (courseId) => {
    const { data } = await api.post("/enroll", { courseId });
    return data;
  },

  getMyCourses: async () => {
    const { data } = await api.get("/enroll/mycourses");
    return data;
  },

  markComplete: async (enrollmentId, lectureId) => {
    const { data } = await api.post(`/enroll/progress/${enrollmentId}/complete/${lectureId}`);
    return data;
  },

  markIncomplete: async (enrollmentId, lectureId) => {
    const { data } = await api.delete(`/enroll/progress/${enrollmentId}/complete/${lectureId}`);
    return data;
  },

  getProgress: async (enrollmentId) => {
    const { data } = await api.get(`/enroll/progress/${enrollmentId}`);
    return data;
  },
};

export default enrollmentService;
