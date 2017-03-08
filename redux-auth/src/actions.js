import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';

const BASE_URL = 'http://localhost:3001'

export function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}

export function login(data) {
  return dispatch => {
    return axios.post(`${BASE_URL}/api/users/auth`, data).then(res => {
      // where is "res" coming from?
      const token = res.data.token;
      const userId = res.data.id;
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('id', userId);
      setAuthorizationToken(token);
      // debugger
      dispatch(setCurrentUser(jwtDecode(token)));
    });
  }
}

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function signup(userData) {
  return function notDispatch() { 
  // return dispatch => {
    return axios.post(`${BASE_URL}/api/users`, userData);
  }
}
// This action /\ has to be an "object" under normal circumstnaces, not some other
// commnd. Thankfully, a Function is an object (is this correct?)
// if so, then that "boject can then return the axios.post to the correct route

export function addPuppy(puppyData){
  console.log("add puppy debugger")
  debugger
  var userId = localStorage.id
  return dispatch => {
    console.log("add puppy ran!")
    // Why isnt this posting?
    return axios.post(`${BASE_URL}/api/users/${userId}/puppies`, puppyData)
  }
}


