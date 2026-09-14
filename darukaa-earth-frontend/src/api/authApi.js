import axios from "axios";

const API_URL = "https://reqres.in/api";

export const loginUser = (data) => {
  return axios.post(`${API_URL}/login`, data);
};

export const signupUser = (data) => {
  return axios.post(`${API_URL}/register`, data);
};
export const fetchUserProfile = (userId) => { 
    return axios.get(`${API_URL}/users/${userId}`);
};