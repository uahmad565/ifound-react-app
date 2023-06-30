import axios from "axios";

export const GetCurrentPost = (postId, postType) => {
    const token = localStorage.getItem("x_auth_token");

    return axios.get(
        `${process.env.REACT_APP_DOT_NET_API}api/Home/GetCurrentPostPerson/${postId}/${postType}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

}