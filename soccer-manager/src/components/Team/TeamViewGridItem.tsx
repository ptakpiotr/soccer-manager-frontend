import { Card, CardContent, Grid } from "@mui/material";
import { PropsWithChildren } from "react";

function TeamViewGridItem({ children }: PropsWithChildren) {
  return (
    <Grid item md={6} xs={12}>
      <Card
        sx={{
          margin: "2rem",
        }}
      >
        <CardContent>{children}</CardContent>
      </Card>
    </Grid>
  );
}

export default TeamViewGridItem;
