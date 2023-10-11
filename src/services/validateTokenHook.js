import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { VerifyToken } from "./AuthenticationService";

function useTokenValidate(token) {
    const navigate = useNavigate();

    const [isValidToken, setIsValid] = useState(false);

    useEffect(() => {
        VerifyToken(token).then(({ data }) => {
            setIsValid(data.isValid);
        }).catch(err => {
            setIsValid(false);
            navigate("/error", {
                state: {
                    description: "Unhandled Error"+err.toString(),
                    heading: "Error Occured"
                }
            });
        });
    }, [token]);

    return isValidToken;
};

export default useTokenValidate;