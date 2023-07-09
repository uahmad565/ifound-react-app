import axios from "axios";
import { TargetType } from "../Enums/Enums";
const baseUrl = `${process.env.REACT_APP_DOT_NET_API}api/Home/`
const uploadFoundUrl = `createFoundPersonForm`;
const uploadLostUrl = `createLostPersonForm`;

export function PostPerson(formData, postType) {
    let ApiUrl = "";
    switch (postType) {
        case TargetType.LOST:
            ApiUrl += getLostUrl();
            break;
        case TargetType.FOUND:
            ApiUrl += getFoundUrl();
            break;
    }

    return axios.post(
        ApiUrl,
        formData,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("x_auth_token")}`
            },
        }
    );
}

//helping methods
function getLostUrl() {
    return baseUrl + uploadLostUrl;
}

function getFoundUrl() {
    return baseUrl + uploadFoundUrl;
}