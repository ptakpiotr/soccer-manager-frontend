import { Grid } from "@mui/material";
import React from "react";
import MiniPanelElem from "./MiniPanelElem";

function MiniPanel() {
  return (
    <Grid container>
      <Grid item xs={6}>
        <MiniPanelElem
          desc="Tactics"
          imageSrc="https://images.unsplash.com/photo-1598907518593-3c70d5f36130?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
        />
      </Grid>
      <Grid item xs={6}>
        <MiniPanelElem
          desc="Calendar"
          imageSrc="https://images.unsplash.com/photo-1584120075590-9876c53cb48c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
        />
      </Grid>
      <Grid item xs={6}>
        <MiniPanelElem
          desc="Table"
          imageSrc="https://images.unsplash.com/photo-1487466365202-1afdb86c764e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=873&q=80"
        />
      </Grid>
      <Grid item xs={6}>
        <MiniPanelElem
          desc="Transfer market"
          imageSrc="https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        />
      </Grid>
    </Grid>
  );
}

export default MiniPanel;
