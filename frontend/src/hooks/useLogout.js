
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => {
      await axios.post("/api/v1/auth/logout");
    },
    onSuccess: () => {
      queryClient.setQueryData(["authUser"], null);
      navigate("/login");
    },
  });
};

export default useLogout;