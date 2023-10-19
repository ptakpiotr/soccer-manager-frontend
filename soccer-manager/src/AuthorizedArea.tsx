import { useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { UserTokenContext } from "./context";
import { Navigate, Outlet } from "react-router-dom";

const validateTokenUrl = `${
  import.meta.env.VITE_AUTH_BACKEND_URL
}/validateToken`;

interface IProps {
  isAdmin?: boolean;
  displayComponent?: JSX.Element;
  customComponent?: JSX.Element;
}

function AuthorizedArea({
  isAdmin,
  displayComponent,
  customComponent,
}: IProps) {
  const { token, setToken } = useContext(UserTokenContext);
  const [showValid, setShowValid] = useState<boolean>(true);

  var component = displayComponent ? displayComponent : <Outlet />;
  var notAuthorizedComponent = customComponent ? (
    customComponent
  ) : (
    <Navigate to="/login" />
  );

  useEffect(() => {
    if (token) {
      axios
        .post(validateTokenUrl, {
          token,
        })
        .then((v) => {
          const validationState = v.data?.state;
          if (validationState !== 0) {
            handleInvalidToken();
          } else {
            if (isAdmin) {
              const decodedToken = jwt_decode(token) as Record<
                string,
                string | string[]
              >;

              if (
                typeof decodedToken["Role"] === "string" ||
                (typeof decodedToken["Role"] !== "string" &&
                  !decodedToken["Role"].includes("Admin"))
              ) {
                handleInvalidToken();
              }
            }
          }
        })
        .catch(() => {
          handleInvalidToken();
        });
    } else {
      handleInvalidToken();
    }
  }, []);

  const handleInvalidToken = () => {
    setShowValid(false);
    if (setToken) {
      setToken("");
    }
    localStorage.removeItem("token");
  };

  return showValid ? component : notAuthorizedComponent;
}

export default AuthorizedArea;
