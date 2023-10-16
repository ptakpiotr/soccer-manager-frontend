import { useContext, useMemo } from "react";

import axios from "axios";
import { UserTokenContext } from "./context";
import { Navigate, Outlet } from "react-router-dom";

const validateTokenUrl = `${
  import.meta.env.VITE_AUTH_BACKEND_URL
}/validateToken`;

function AuthorizedRoute() {
  const { token } = useContext(UserTokenContext);
  var component = <Outlet />;

  useMemo(() => {
    if (token) {
      axios
        .post(validateTokenUrl, {
          token,
        })
        .then((v) => {
          const validationState = v.data?.state;
          if (validationState !== 0) {
            component = <Navigate to="/login" />;
          }
        })
        .catch(() => {
          component = <Navigate to="/login" />;
        });
    }
  }, []);

  return component;
}

export default AuthorizedRoute;
