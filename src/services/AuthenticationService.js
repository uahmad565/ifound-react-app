import axios from "axios";

const baseUrl = `${process.env.REACT_APP_DOT_NET_API}api/Authenticate/`;
const verify = "verifyToken";
const loginUrl = 'login';
const registerAdminUrl = 'register-admin';
const registerUserUrl = 'register';

export const VerifyToken=(token) => {
    return axios.post(baseUrl + verify, new Object(token));

}

export const Login = ({ email, password }) => {
    return axios.post(baseUrl + loginUrl, {
        "email": email,
        "password": password
    });
}

export const RegisterUser = ({ name, email, password }) => {
    return Register(baseUrl + registerUserUrl, name, email, password);
}

export const RegisterAdmin = (name, email, password) => {
    return Register(baseUrl + registerAdminUrl, name, email, password);
}

function Register(url, name, email, password) {
    return axios.post(url, {
        "name": name,
        "email": email,
        "password": password
    });
}