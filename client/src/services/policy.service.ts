import axiosInstance from "../config/axios";

export const postPolicyService = (data: any) => axiosInstance.post(`/policy`, data );
export const getPolicyService = () => axiosInstance.get(`/policy`) ;
export const getUserPolicyService = () => axiosInstance.get(`/policy/?user=1`);
export const getPolicyByIdService = (id: any) => axiosInstance.get(`/policy/${id}`);
export const getUserPolicyByIdService = (id: any) => axiosInstance.get(`/policy/user/${id}`);
export const updatePolicyService = (data: any, id: any) => axiosInstance.patch(`/policy/${id}`, data);
export const deletePolicyService = (id: any) => axiosInstance.delete(`/policy/${id}`)