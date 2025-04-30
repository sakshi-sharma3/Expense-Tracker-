// Configure the API base URL based on environment
const isProd = window.location.hostname !== 'localhost';
// Use the production URL when deployed, localhost for development
const host = isProd ? "https://expense-tracker-app-knl1.onrender.com" : "http://localhost:5000";

export const setAvatarAPI = `${host}/api/auth/setAvatar`;
export const registerAPI = `${host}/api/auth/register`;
export const loginAPI = `${host}/api/auth/login`;
export const addTransaction = `${host}/api/v1/addTransaction`;
export const getTransactions = `${host}/api/v1/getTransaction`;
export const editTransactions = `${host}/api/v1/updateTransaction`;
export const deleteTransactions = `${host}/api/v1/deleteTransaction`;