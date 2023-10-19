import { PropsWithChildren, useContext, useMemo } from "react";
import jwt_decode from "jwt-decode";
import { UserTokenContext } from "./context";
interface IProps {
  notAuthorizedComponent: JSX.Element;
}

function IsAdminArea({
  children,
  notAuthorizedComponent,
}: PropsWithChildren<IProps>) {
  const { token } = useContext(UserTokenContext);
  const isAdmin = useMemo(() => {
    if (token) {
      const decodedToken = jwt_decode(token) as Record<
        string,
        string | string[]
      >;

      if (
        typeof decodedToken["Role"] === "string" ||
        (typeof decodedToken["Role"] !== "string" &&
          !decodedToken["Role"].includes("Admin"))
      ) {
        return false;
      }

      return true;
    }

    return false;
  }, []);

  if (isAdmin) {
    return children;
  }

  return notAuthorizedComponent;
}

export default IsAdminArea;
