import axiosInstance from "../config/axios";
export const getWarningService = (page: any,limit: any) => axiosInstance.get(`/warning?page=${page}&limit=${limit}`)
