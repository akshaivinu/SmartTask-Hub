import axios from "axios"

const taskService = {
    getTasks: async () => {
        try {
           const res = await axios.get("/api/v1/tasks");
        return res.data.data; 
        } catch (error) {
            console.log("error", error.message);   
        }
        
    }
}

export default taskService