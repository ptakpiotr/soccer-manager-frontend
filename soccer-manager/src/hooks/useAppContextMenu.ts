import { useContext, useEffect } from "react";
import { ContextMenuContext } from "../context";
import { IContextMenuSetting } from "../Types";

function useAppContextMenu(contextMenuSettings: IContextMenuSetting[]) {
  const { setSettings } = useContext(ContextMenuContext);

  useEffect(() => {
    if (setSettings) {
      setSettings(contextMenuSettings);
    }
  }, []);

  return null;
}

export default useAppContextMenu;
