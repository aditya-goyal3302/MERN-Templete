import axiosInstance from "../config/axios";

export const getAllUsersService = (url: string) => axiosInstance.get(`/users${url}`)
export const getTimelineService = (data: string) => axiosInstance.get(`/user-balance/admin/${data}`)