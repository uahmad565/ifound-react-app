import axios from "axios";

export const DeleteActivePost = (postId) => {
    // Handle option change event
    const token = localStorage.getItem("x_auth_token");

    return axios.delete(`${process.env.REACT_APP_DOT_NET_API}api/home/DeleteCurrentPost/${postId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

}

export const GetActiveCases = (postStatus,postType) => {
    const token = localStorage.getItem("x_auth_token");
    return axios.get(`${process.env.REACT_APP_DOT_NET_API}api/home/activeCases/${postStatus}/${postType}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
}

export const MatchCase=()=>{

}


export const GetDashboardStats = () => {
    const token = localStorage.getItem("x_auth_token");
    return axios.get(`${process.env.REACT_APP_DOT_NET_API}api/home/DashboardStats`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}


export const UpdatePostStatus = (postId, postStatus) => {
    const token = localStorage.getItem("x_auth_token");
    return axios.put(`${process.env.REACT_APP_DOT_NET_API}api/home/UpdatePostStatus/${postId}`, new Object(postStatus), {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}



