import axiosInstance from "../config/axios";
export const getNotificationService = (page: any,limit: any) => axiosInstance.get(`/notification?page=${page}&limit=${limit}`)
export const putNotificationService = (uuid: any) => axiosInstance.put(`/notification/${uuid}`)
