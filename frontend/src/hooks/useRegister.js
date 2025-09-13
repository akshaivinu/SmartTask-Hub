import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom';


axios.defaults.withCredentials = true
const useRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async ({ name, email, password }) => {
        const res = await axios.post("/api/v1/auth/register", {
          name,
          email,
          password,
        })

        const data = res.data.data;
        if(data.error){
          return null;
        }
        if(res.status !== 200) {
          throw new Error(data.error);
        }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/login");
    },
  })
}

export default useRegister