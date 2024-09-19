import axiosInstance from "../config/axios";

export const postEventService = (data: any) => axiosInstance.post(`/calendar-records`, data);
export const getEventService = () => axiosInstance.get(`/calendar-records`);
export const updateEventService = (data: any, id: any) => axiosInstance.put(`/calendar-records/${id}`, data);
export const deleteEventService = (id: any) => axiosInstance.delete(`/calendar-records/${id}`)