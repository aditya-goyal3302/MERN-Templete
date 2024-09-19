import axiosInstance from "../config/axios";

export const getAttendenceService = (page: any,limit: any,action: any, created_at?: any) => axiosInstance.get(`/attendance?action=${action}&created_at=${created_at}&page=${page}&limit=${limit}`,);
export const getAllUserAttendenceService = (page: any,limit: any,date: string,) => axiosInstance.get(`/attendance/admin?date=${date}&page=${page}&limit=${limit}`,);
export const getUserAttendenceService = (year?: any,month?: any, status?: any) => axiosInstance.get(`/attendance/user?&type=${status}&month=${month}&year=${year}`,);
export const postAttendenceService = () => axiosInstance.post(`/attendance`);
export const updateAttendenceService = (data: any, id: any) => axiosInstance.put(`/attendance/${id}`,data);
