import { Card, CardContent, Grid } from "@mui/material";
import { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  url?: string;
}

function TeamViewGridItem({ url, children }: PropsWithChildren<IProps>) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (url) {
      navigate(url);
    }
  };

  return (
    <Grid item md={6} xs={12} onClick={handleClick}>
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
