import { toast } from "react-toastify";
import { IToastInfo } from "../Types";

export function useMessageManager() {
  return (message: string, type: IToastInfo["type"] = "error") => {
    toast(message, {
      type,
      theme: "colored",
    });
  };
}
