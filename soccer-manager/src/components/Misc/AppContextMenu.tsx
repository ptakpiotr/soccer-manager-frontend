import React, { PropsWithChildren, useContext } from "react";
import { Item, Menu, useContextMenu } from "react-contexify";
import "react-contexify/ReactContexify.css";
import { ContextMenuContext } from "../../context";
import { IContextMenuSetting } from "../../Types";
import Enumerable from "linq";

const APP_CONTEXT_MENU_ID = "main-menu-id";

interface IProps {
  contextMenuId?: string;
  customSettings?: IContextMenuSetting[];
}

//based on example from here: https://www.npmjs.com/package/react-contexify
function AppContextMenu({ children, contextMenuId, customSettings }: PropsWithChildren<IProps>) {
  const { show } = useContextMenu({
    id: contextMenuId ?? APP_CONTEXT_MENU_ID,
  });

  const { settings } = useContext(ContextMenuContext);

  const handleWrapperContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    show({
      event: e,
    });
  };

  return (
    <>
      <Menu id={contextMenuId ?? APP_CONTEXT_MENU_ID}>
        {Enumerable.from(settings ?? []).concat(customSettings ?? []).toArray().map((v) => (
          <Item id={v.settingId} onClick={v.settingItemHandler}>
            {v.settingDesc}
            {v.icon({})}
          </Item>
        ))}
      </Menu>
      <div onContextMenu={handleWrapperContextMenu}>{children}</div>
    </>
  );
}

export default AppContextMenu;
