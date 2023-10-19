import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserTokenContext } from "../../context";

const logoutUrl = `${import.meta.env.VITE_AUTH_BACKEND_URL}/logout`;

function Logout() {
  const { token, setToken } = useContext(UserTokenContext);

  useEffect(() => {
    if (token && setToken) {
      axios
        .get(`${logoutUrl}?token=${token}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setToken("");
          localStorage.removeItem("token");
        })
        .catch(() => {
          setToken("");
          localStorage.removeItem("token");
        });
    }
  }, []);

  return <Navigate to="/login" />;
}

export default Logout;
