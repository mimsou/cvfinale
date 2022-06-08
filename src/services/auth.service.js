import axios from "axios";
import jwt from "jwt-decode";
import getApiUrl from "./auth-config";
import authHeader from './auth-header';

const API_URL = getApiUrl();


class AuthService {
   
  constructor() {
    axios.interceptors.response.use(
      function (response) {  
        return response;
      },
      function (error) {
        console.log(error)
        if (401 === error?.response?.status) {
          localStorage.removeItem("user");
          window.location.replace("/auth/login");
        } else { 
          return Promise.reject(error);
        }
      }
    );
  }

  getLoginName() {
    const jwt = this.decodeJwt();
    return jwt.username;
  }

  isLoggedIn() {
    if (localStorage.getItem("user")) {
      return true;
    } else {
      return false;
    }
  }

  

  getJwt() {
    console.log("jwt",localStorage.getItem("user"))
    if (localStorage.getItem("user")) {
      return localStorage.getItem("user");
    } else {
      return false;
    }
  }

  decodeJwt() {
    if (localStorage.getItem("user")) {
      return jwt(JSON.parse(localStorage.getItem("user")).access_token);
    } else {
      return false;
    }
  }

  login(login, password, social) {
    var formData = new FormData();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    formData.append("email", login);

    formData.append("password", password);

    //axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

    return axios
      .post(API_URL + "auth/login", formData, config)
      .then((response) => {
        if (response.data.access_token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      })
      .catch((response) => {
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    window.location.replace("/auth/login");
  }

  loginWithGoogle(token) {

    const user = {
      token: token
    };

    return axios.post(API_URL + "auth/login_google", user).then((response) => {
      if (response.data.access_token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    }).catch((response) => {
          return response.data;
    });

  }

  getUserProfile(){
    return axios.get(API_URL + 'app/user-profile', { headers: authHeader() });
  }

  registration(name, login, email, password) {
    
    const user = {
      login: login,
      roles: ["ROLE_USER"],
      name: name,
      email: email,
      password: password,
      password_confirmation: password,
    };

    return axios.post(API_URL + "auth/register", user);

  }

  getCurrentUser() {}


  isAdmin () {
        let user = localStorage.getItem("user_info")
        console.log(user)
    return true
  }
}




export default new AuthService();
