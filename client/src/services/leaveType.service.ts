import axiosInstance from "../config/axios";
export const postLeavesTypeService = (data: any) => axiosInstance.post('/leave-details', data);
export const getLeavesTypeService = () => axiosInstance.get('/leave-details');
export const getLeavesTypeByIdService = (id: any) => axiosInstance.get(`/leave-details/${id}`);
export const updateLeavesTypeService = (data: any, id: any) => axiosInstance.patch(`/leave-details/${id}`, data);
export const deleteLeavesTypeService = (id: any) => axiosInstance.delete(`/leave-details/${id}`);