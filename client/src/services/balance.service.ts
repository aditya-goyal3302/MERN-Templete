import axiosInstance from "../config/axios";

export const getUsersBalanceService = () => axiosInstance.get('/user-balance');
export const postUsersBalanceService = (data: any) => axiosInstance.post('/user-balance', data);