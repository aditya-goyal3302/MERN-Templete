import axiosInstance from "../config/axios";

export const getRolesService = () => axiosInstance.get(`/user-roles`,{ headers: { "Content-Type": "application/json" } });
export const postRolesService = (data: any) => axiosInstance.post(`/user-roles`, data, { headers: { "Content-Type": "application/json" } });
export const updateRolesService = (data: any, id: any) => axiosInstance.put(`/user-roles/${id}`, data, { headers: { "Content-Type": "application/json" } });
export const deleteRolesService = (id: any) => axiosInstance.delete(`/user-roles/${id}`, { headers: { "Content-Type": "application/json" } })