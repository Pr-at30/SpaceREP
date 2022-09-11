import axios from 'axios'
import Cookie from 'js-cookie';

const API_URL ="https://stickmen.herokuapp.com/api/auth"

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + '/register', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
    Cookie.set('token', response.data.token);
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + '/login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
    Cookie.set('token', response.data.token);
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const profile = async()=>{
  const response = await axios.get(API_URL + '/myProfile')

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
    // Cookie.set('token', response.data.token);
  }

  return response.data
}


const authService = {
  register,
  logout,
  login,
  profile,
}

export default authService