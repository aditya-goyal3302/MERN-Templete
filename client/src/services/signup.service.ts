import axiosInstance from "../config/axios";

export const signupService = (payload:any) => axiosInstance.post(`/auth/register`,{...payload} )
