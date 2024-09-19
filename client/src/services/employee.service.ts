import axiosInstance from "../config/axios";

export const postEmployeeService = (data: any) => axiosInstance.post(`/users`, data);
export const getEmployeeService = () => axiosInstance.get(`/users`);
export const updateProfileService = () => axiosInstance.put(`/users`);
export const getEmployeeByIdService = (id?: any) => axiosInstance.get(`/users/${id}`);
export const updateEmployeeService = (data: any, id: any) => axiosInstance.put(`/users/${id}`, data);
export const deleteEmployeeService = (id: any) => axiosInstance.delete(`/users/${id}`)