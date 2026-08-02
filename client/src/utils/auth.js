// Token management utilities

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem('accessToken');
};

// Set token in localStorage
export const setToken = (token) => {
  if (token) {
    localStorage.setItem('accessToken', token);
  }
};

// Remove token from localStorage
export const removeToken = () => {
  localStorage.removeItem('accessToken');
};
