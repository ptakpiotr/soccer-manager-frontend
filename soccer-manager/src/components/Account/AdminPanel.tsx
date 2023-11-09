import axios from "axios";
import AdminPanelUser from "./AdminPanelUser";
import {
  useQuery as useReactQuery,
  useMutation as useReactMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useContext } from "react";
import { UserTokenContext } from "../../context";
import { IUserAdminInfo } from "../../Types";
import { useMessageManager } from "../../hooks/useMessageManager";

const getUsersUrl = `${import.meta.env.VITE_AUTH_BACKEND_URL}/getUsers`;
const deleteUserUrl = import.meta.env.VITE_AUTH_BACKEND_URL;
const blockUserUrl = `${import.meta.env.VITE_AUTH_BACKEND_URL}/lockUser`;
const unBlockUserUrl = `${import.meta.env.VITE_AUTH_BACKEND_URL}/unlockUser`;

function AdminPanel() {
  const { token } = useContext(UserTokenContext);
  const queryClient = useQueryClient();
  const notify = useMessageManager();

  const { data } = useReactQuery({
    queryKey: ["adminpanel-users"],
    queryFn: async () => {
      try {
        const resp = await axios.get(getUsersUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return resp.data as IUserAdminInfo[];
      } catch {
        notify("Unable to fetch user data");
      }
    },
  });

  const deleteUserMutation = useReactMutation({
    mutationKey: ["delete-user"],
    mutationFn: async (userEmail: string) => {
      try {
        await axios.delete(`${deleteUserUrl}?userEmail=${userEmail}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        await queryClient.invalidateQueries(["adminpanel-users"]);
      } catch {
        notify("Unable to delete the user");
      }
    },
  });

  const blockUserMutation = useReactMutation({
    mutationKey: ["block-user"],
    mutationFn: async (userEmail: string) => {
      try {
        await axios.get(`${blockUserUrl}?userEmail=${userEmail}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        await queryClient.invalidateQueries(["adminpanel-users"]);
      } catch {
        notify("Unable to block the user");
      }
    },
  });

  const unBlockUserMutation = useReactMutation({
    mutationKey: ["unblock-user"],
    mutationFn: async (userEmail: string) => {
      try {
        await axios.get(`${unBlockUserUrl}?userEmail=${userEmail}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        await queryClient.invalidateQueries(["adminpanel-users"]);
      } catch {
        notify("Unable to unblock the user");
      }
    },
  });

  const deleteUser = async (userEmail: string) => {
    await deleteUserMutation.mutateAsync(userEmail);
  };
  const blockUser = async (userEmail: string) => {
    await blockUserMutation.mutateAsync(userEmail);
  };
  const unBlockUser = async (userEmail: string) => {
    await unBlockUserMutation.mutateAsync(userEmail);
  };

  const funcs = {
    deleteUser,
    blockUser,
    unBlockUser,
  };

  return (
    <>
      {data?.map((e) => (
        <AdminPanelUser key={`ap-user-${e.email}`} {...e} {...funcs} />
      ))}
    </>
  );
}

export default AdminPanel;
