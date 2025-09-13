import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


axios.defaults.withCredentials = true;

const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation ({
    mutationFn: async ({ email, password }) => {
        const res = await axios.post("/api/v1/auth/login", {
          email: email,
          password: password,
        })

        const data = res.data.data;
        if(data.error){
          return null;
        }
        if(res.status !== 200) {
          throw new Error(data.error);
        }
        return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  })
}

export default useLogin