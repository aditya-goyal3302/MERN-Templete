import axiosInstance from "../config/axios";

export const postLeavesRequestService = (data: any) => axiosInstance.post('/leaves', data);
export const getLeavesRequestService = () => axiosInstance.get('/leaves');
export const getLeavesRequestDetailService = () => axiosInstance.get('/leaves/dashboard');
export const getLeavesRequestByIdService = (page: any, limit: any, assign: any, status: any) => axiosInstance.get(`/leaves?assign=${assign}&page=${page}&limit=${limit}&status=${status}`);
export const getLeavesRequestByAssigneeService = (assign: any, status: any) => axiosInstance.get(`/leaves?assign=1`);
export const getAllLeavesRequestService = (page: any, status: string, limit: any, end_date?: any, start_date?: any) => axiosInstance.get(`/leaves/admin?page=${page}&limit=${limit}&status=${status}&leave_end_date=${end_date}&leave_start_date=${start_date}`);
export const updateLeavesRequestService = (data: any, id: any) => axiosInstance.put(`/leaves/${id}`, data);
export const deleteLeavesRequestService = (id: any) => axiosInstance.delete(`/leaves/${id}`);
export const getLeavesRequestTimelineService = (id: any) => axiosInstance.get(`/leave-timeline/${id}`);