import axiosInstance from "../config/axios";

export const signupService = (payload:any) => axiosInstance.post(`/auth/signup`,{...payload} )
export const updateEmployeeService = (data: any, id: any) => axiosInstance.put(`/users/${id}`, data);
