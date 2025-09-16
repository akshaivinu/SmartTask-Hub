import axios from "axios";

axios.defaults.withCredentials = true;

const taskService = {
  getTasks: async () => {
    try {
      const res = await axios.get("/api/v1/tasks");
      return res.data.data;
    } catch (error) {
      console.log("error", error.message);
    }
  },
  getTask: async (id) => {
      try {
        const res = await axios.get(`/api/v1/tasks/${id}`);
        return res.data.data;
      } catch (error) {
        console.log("error", error.message);  
      }
  },
  createTask: async ({ title, description, status }) => {
    try {
      const res = await axios.post("/api/v1/tasks", {
        title,
        description,
        status,
      }, { withCredentials: true });
      const data = res.data?.data;
      if (data.error) {
        return null;
      }
      if (res.status !== 200) {
        throw new Error(res.data.error);
      }
      return data;
    } catch (error) {
      console.log("error", error.message);
    }
  },
  editTask: async ({ _id, title, description, status }) => {
    try {
      const res = await axios.put(`/api/v1/tasks/${_id}`, {
        title,
        description,
        status,
      });
      return res.data;
    } catch (error) {
      console.log("error", error.message);
    }
  },
  deleteTask: async (id) => {
    try {
        const res = await axios.delete(`/api/v1/tasks/${id}`);
        return res.data;
    } catch (error) {
        console.log("error", error.message);  
    }
  }
};

export default taskService;
