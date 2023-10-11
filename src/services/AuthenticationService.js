import axios from "axios";

const baseUrl = `${process.env.REACT_APP_DOT_NET_API}api/Authenticate/`;
const verify = "verifyToken";
const loginUrl = 'login';

const registerAdminUrl = 'register-admin';
const registerUserUrl = 'register';

export const VerifyToken = (token) => axios.post(baseUrl + verify, new Object(token));

export const Login = ({ email, password }) => {
    return axios.post(baseUrl + loginUrl, {
        "email": email,
        "password": password
    });
}

export function SetLocalStorage({email, name, x_auth_token}) {
    localStorage.setItem("email", email);
    localStorage.setItem("name", name);
    localStorage.setItem("x_auth_token", x_auth_token);
}

export const RegisterUser = ({ firstName, lastName, email, password }) => Register(baseUrl + registerUserUrl, firstName + " " + lastName, email, password);

export const RegisterAdmin = (name, email, password) => Register(baseUrl + registerAdminUrl, name, email, password);


function Register(url, name, email, password) {
    return axios.post(url, {
        "name": name,
        "email": email,
        "password": password
    });
}